use cosmwasm_std::{
    entry_point, to_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult,
};
use secret_toolkit::crypto::sha_256;
use secret_toolkit::crypto::Prng;

use crate::msg::{CardResponse, HandleMsg, InitMsg, QueryMsg};

use crate::state::{Card, CARD_VIEWING_KEY, ENTROPY, USER_CARDS};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InitMsg,
) -> StdResult<Response> {
    ENTROPY.save(deps.storage, &msg.entropy)?;

    Ok(Response::default())
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: HandleMsg) -> StdResult<Response> {
    match msg {
        HandleMsg::Create { card, index } => try_create_card(deps, info, card, index),
        HandleMsg::Burn { index } => try_burn_card(deps, env, info, index),
        HandleMsg::GenerateViewingKey { index } => try_generate_viewing_key(deps, env, info, index),
    }
}

pub fn try_generate_viewing_key(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    index: u8,
) -> StdResult<Response> {
    //map for viewing keys
    let viewing_keys_for_card = CARD_VIEWING_KEY
        .add_suffix(info.sender.as_bytes())
        .add_suffix(&[index]);

    //viewing key as bytes
    let viewing_key = new_viewing_key(&env, info, ENTROPY.load(deps.storage)?.as_bytes());

    //add viewing key to viewing key map
    viewing_keys_for_card.insert(deps.storage, &viewing_key, &true)?;

    let res = Response::default().add_attribute("viewing_key", viewing_key);

    Ok(res)
}

/* new_viewing_key is used to generate a unique, random key for each business card we create.The combination of the current time and the sender of the message is used as entropy to initialize the random number generator, so that each message has a unique viewing key that is derived from information specific to that message.
 */
pub fn new_viewing_key(env: &Env, info: MessageInfo, entropy_bytes: &[u8]) -> String {
    //1. The variable entropy_len is defined as the length of 16 + the length of the sender field in the "info" struct + the length of `entropy_bytes`.
    let entropy_len = 16 + info.sender.as_bytes().len() + entropy_bytes.len();
    //2. A Vec named rng_entropy is created with a capacity equal to entropy_len. The vector is then filled with entropy_bytes and the time (in nanoseconds) of the block stored in env.
    let mut rng_entropy = Vec::with_capacity(entropy_len);

    rng_entropy.extend_from_slice(&env.block.time.nanos().to_be_bytes());
    rng_entropy.extend_from_slice(info.sender.as_bytes());
    rng_entropy.extend_from_slice(entropy_bytes);
    // 3. A random number is created using Prng::new with the entropy "entropy_bytes" and the "rng_entropy" vector.
    let mut rng = Prng::new(entropy_bytes, &rng_entropy);
    //4. The method rng.rand_bytes generates a random slice of bytes.
    let rand_slice = rng.rand_bytes();
    //5. Then, we calculate the SHA-256 hash of the random slice, and store it in the "key" variable.
    let key = sha_256(&rand_slice);
    //6. Finally, we return the base64 encoding of the key as a String.
    base64::encode(&key)
}

pub fn try_create_card(
    deps: DepsMut,
    info: MessageInfo,
    card: Card,
    index: u8,
) -> StdResult<Response> {
    //add_suffix needs byte array, this is called pre-fixing
    USER_CARDS
        .add_suffix(info.sender.as_bytes())
        .insert(deps.storage, &index, &card)?;

    Ok(Response::default())
}

pub fn try_burn_card(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    index: u8,
) -> StdResult<Response> {
   //your code to go here 

    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetCard {
            wallet,
            viewing_key,
            index,
        } => to_binary(&query_card(deps, wallet, viewing_key, index)?),
    }
}

fn query_card(deps: Deps, wallet: Addr, viewing_key: String, index: u8) -> StdResult<CardResponse> {
    //update query function to only work if you pass in a valid viewing key
    let viewing_keys_exists = CARD_VIEWING_KEY
        .add_suffix(wallet.as_bytes())
        .add_suffix(&[index]);

    if viewing_keys_exists.contains(deps.storage, &viewing_key) {
        let card_exists = USER_CARDS
            .add_suffix(wallet.as_bytes())
            .get(deps.storage, &index);

        match card_exists {
            Some(card) => Ok(CardResponse { card: card }),
            None => Err(StdError::generic_err("Card doesn't exist")),
        }
    } else {
        Err(StdError::generic_err(
            "You don't have the correct viewing key!",
        ))
    }
}

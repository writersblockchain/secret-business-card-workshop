use cosmwasm_std::Addr;
use schemars::JsonSchema;

use serde::{Deserialize, Serialize};

use crate::state::Card;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct InitMsg {
    pub entropy: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    // your code to go here
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetCard {
        wallet: Addr,
        viewing_key: String,
        index: u8,
    },
}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct CardResponse {
    pub card: Card,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct ViewingKeyResponse {
    pub viewing_key: String,
}

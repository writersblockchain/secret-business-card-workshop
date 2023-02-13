## Secretcli commands

### Setting up Environment

###### Start LocalSecret in docker

run:

```rust

```

run:

```rust
 docker exec -it localsecret /bin/bash
```

###### To configure & test your local secretcli binary

run:

```rust
secretcli config node http://localhost:26657
secretcli config chain-id secretdev-1
secretcli config keyring-backend test
secretcli config output json
```

###### Inside the docker container there are accounts a, b, c & d that are pre-seeded with SCRT and can be used to send some to your address:

```rust
ADDRESS="secret1c9p3ytw33lk5vf2ay3u24qjfsc89v44yyq8p2q"

docker exec -it localsecret secretd tx bank send b secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne 1000000000uscrt -y
```

###### Secret keys are for receiving and sending funds. They are made using:

```rust
secretcli keys add SEANKEY
```

###### You can see all your available keys by typing:

```rust
secretcli keys list
```

### Uploading and Deploying Contract

###### Build the Contract

run:

```rust
make build
```

###### Optimize Compiled Wasm

run:

```rust
docker run --rm -v "$(pwd)":/contract \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  enigmampc/secret-contract-optimizer
```

###### Mount project's code inside the container

run:

```rust

```

###### Upload the optimized contract.wasm.gz:

run:

```rust
docker cp ./contract.wasm.gz localsecret:/root/contract.wasm.gz
docker exec localsecret secretcli tx compute store -y --from a --gas 1000000 /root/contract.wasm.gz
```

###### Querying The Smart Contract And Code

To verify whether storing the code has been successful, use SecretCLI to query the chain

run:

```rust
secretcli query compute list-code
```

###### Instantiate Smart Contract

run:

```rust
secretcli tx compute instantiate 2 '{"entropy": "AFSDFFGDDFRSGBGGGGSREARSZRFGEAW#AERWS"}' --from a --label cardDapp2 -y

```

###### Build the Contract

run:

```rust

```

###### Querying a Transaction Hash:

run:

```rust
secretcli q tx ${hash}
```

###### Querying a Bank Balance:

run:

```rust
secretcli query bank balances <secret-address>


secretcli query bank balances "secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne"
```

###### Querying an Event:

run:

```rust
secretcli q txs --events=${event}
```

###### All Available commands:

run:

```rust
The Secret Network App Daemon (server)

Usage:
  secretd [command]

Available Commands:
  add-genesis-account Add a genesis account to genesis.json
  auto-register       Perform remote attestation of the enclave
  check-enclave       Test enclave status
  collect-gentxs      Collect genesis txs and output a genesis.json file
  config              Create or query an application CLI configuration file
  configure-secret    After registration is successful, configure the secret node with the credentials file and the encrypted seed that was written on-chain
  debug               Tool for helping with debugging your application
  export              Export state to JSON
  gentx               Generate a genesis tx carrying a self delegation
  help                Help about any command
  init                Initialize private validator, p2p, genesis, and application configuration files
  init-bootstrap      Perform bootstrap initialization
  init-enclave        Perform remote attestation of the enclave
  keys                Manage your application's keys
  migrate             Migrate genesis to a specified target version
  parse               Verify and parse a certificate file
  query               Querying subcommands
  reset-enclave       Reset registration & enclave parameters
  rollback            rollback cosmos-sdk and tendermint state by one height
  rosetta             spin up a rosetta server
  start               Run the full node
  status              Query remote node for status
  tendermint          Tendermint subcommands
  tx                  Transactions subcommands
  validate-genesis    validates the genesis file at the default location or at the location passed as an arg
  version             Print the application binary version information

Flags:
      --bootstrap           Start the node as the bootstrap node for the network (only used when starting a new network)
  -h, --help                help for secretd
      --home string         directory for config and data (default "/Users/dawsonsewell/.secretd")
      --log_format string   The logging format (json|plain) (default "plain")
      --log_level string    The logging level (trace|debug|info|warn|error|fatal|panic) (default "info")
      --trace               print out full stack trace on errors

Use "secretd [command] --help" for more information about a command.
```

secretcli tx compute instantiate 1 '{"entropy": "AFSDFFGDDFRSGBSREARSZRFGEAW#AERWS"}' --from a --label cardDapp -y

secretd tx compute execute $CONTRACT '{ "create": { "Card": { "name": "BBBB", "address": "test", "phone": "1234567" } } }' --from a --keyring-backend test

CONTRACT=secret10pyejy66429refv3g35g2t7am0was7ya6hvrzf

secretd tx compute execute $CONTRACT '{ "generate_viewing_key": {} }' --from a --keyring-backend test

"etZmLgiR3nWKmXZkLJO8aAnMe+m4DiRx09HIgDenIY0="

secretcli query compute query $CONTRACT '{ "get_card": {"Wallet":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03", "viewing_key": "etZmLgiR3nWKmXZkLJO8aAnMe+m4DiRx09HIgDenIY0="} }'

secretcli tx compute instantiate 12576 '{"entropy": "AFSDFFGDDFRSGBSREARSZRFGEAW#AERWS"}' --from scrt-testnet --label scrtcard -y

secretcli tx compute store ./contract.wasm --gas 5000000 --from scrt-testnet

secretcli query compute query $CONTRACT '{ "get_card": {"Wallet":"secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03", "viewing_key": "etZmLgiR3nWKmXZkLJO8aAnMe+m4DiRx09HIgDenIY0="} }'

ADDRESS="secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne"

curl "http://localhost:5000/faucet?address=${ADDRESS}"

ADDRESS="secret1fc3fzy78ttp0lwuujw7e52rhspxn8uj52zfyne"

docker exec -it localsecret secretd tx bank send b ${ADDRESS} 1000000000uscrt -y

secretcli tx compute instantiate 1 '{"count": 0}' --from myWallet --label counter -y

secretcli tx compute instantiate 2 '{"count": "0"}' --from a --label counter -y

secretcli tx compute instantiate 2 '{"count": 0}' --from myWallet --label counter -y

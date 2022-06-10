**Note**

The Yoroi API `getCollateralUtxo` is named differently to the specification in CIP-30, where it is named `getCollateral`. This will be changed to match CIP-30 in the current deployment of Yoroi.

# dapp-connector-web

Deployed at https://dapp-connector-web.emurgo-rnd.com/

This dapp is a testnet dapp that demonstrates CIP30 APIs

### What is CIP30?

In an effort to make dapp development simpler, CIP30 is a standard for wallet-web bridges to follow such that wallets are mostly consistent. This means that dapps can write code that interacts with Cardano wallets, and as long as those wallets follow the CIP30 standard, they can allow their users to choose which wallet they would like to connect with the dapp. The code written by the dapp can mostly be reused, since the wallet APIs will have standardized returned messages.

Along with the APIs defined by the standard, wallets themselves can choose to implement their own functionality. However, these functionalities are recommended to be put under an `experimental` tag, so that dapps who wish to, can use them, but understand that it may only be available on that specific wallet.

The details of these APIs are given in https://cips.cardano.org/cips/cip30/#transactionunspentoutput

### How does it work?

Cardano wallets will inject JavaScript code into the webpage that can be called by dapps without them worrying about internal implementations. Since the returned values of each function is specified in detail within the CIP30 document, wallets following the standard should return similar values. Dapps inherently need to interact with user wallets, as they need to display information about user's balances, or some functions may require users to sign transactions.

For the most part, CIP30 includes the minimum APIs necessary to perform expected functions, these can then go on to be used in any way the dapp likes, from NFT and token management, to the interactions with the plethora of smart contracts that exist on Cardano.

#### Initial APIs

These APIs are there so that users can select which wallet they wish to use. For example, they may have wallets on Yoroi and Nami, and the dapp can enable the one the user selects.

```
cardano.{walletName}.enable()
cardano.{walletName}.isEnabled()
cardano.{walletName}.apiVersion
cardano.{walletName}.name
cardano.{walletName}.icon
```

`{walletName}` might be `yoroi` or `nami` for example.

#### Full APIs

Once the wallet is enabled, the dApp should have access to a full set of APIs from the user’s wallet.


**Get Network ID**
```
api.getNetworkId()
```
This will return 0 for testnet and 1 for mainnet.

**Get UTXOs**
```
api.getUtxos(amount: cbor\ = undefined, paginate: Paginate = undefined)
```

Gets UTXOs of the user. UTXO selection should be implemented so that the dApp can call this API with amount and get the required UTXOs. The amount can allow for multiassets so tokens/NFTs can be included.

**Get Collateral**

```
api.getCollateral(params: { amount: cbor\ })
```
dApps can call this API to get good UTXOs to use as collateral for a specific plutus transaction.

**Get Balance**
```
api.getBalance()
```
This gets the balance of the wallet, including all assets

**Address APIs**

The following APIs are fairly self explanatory.

```
api.getUsedAddresses(paginate: Paginate = undefined)
api.getUnusedAddresses()
```
Wallets are implemented so that addresses aren’t repeatedly used for every transaction, so it is useful to keep track of addresses that have been used, and addresses that are still available.

```
api.getChangeAddress()
```
Change addresses are generally generated once per transaction also, the dApp needs to know this address to send change.

```
api.getRewardAddresses()
```

The address used to send staking rewards to.

**Wallet APIs**

```
api.signTx(tx: cbor\, partialSign: bool = false)
api.signData(addr: Address, payload: Bytes)
api.submitTx(tx: cbor\)
```

These APIs allow wallets to sign and submit transactions and also to sign arbitrary data.

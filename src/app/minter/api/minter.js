const config = require('../../config')
const xrpl = require('xrpl')

export async function mint() {
    const wallet = xrpl.Wallet.fromSeed(config.rihlaWallet.secret)
    console.log('WALLET CLASSIC ADDR:', wallet.classicAddress);

    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
    await client.connect();

    const nftTransaction = {
        TransactionType: "NFTokenMint",
        Account:  wallet.classicAddress,
        URI: xrpl.convertStringToHex(`Rihla-Test-URI-1`),
        Flags: 8,
        NFTokenTaxon: 0 //Required, but if you have no use for it, set to zero.
    }

    const preparedTx = await client.autofill(nftTransaction);
    const signedTx = wallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);
    console.log('NFT Mint Result:', result);

    await client.disconnect();
}

export async function get_nfts() {
    const wallet = xrpl.Wallet.fromSeed(config.rihlaWallet.secret)

    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
    await client.connect();

    const nfts = await client.request({
         method: "account_nfts",
         account: wallet.classicAddress
    })
    console.log('NFTs:', JSON.stringify(nfts,null,2));

    await client.disconnect();
}


// token-1: '00080000BCE0D6D1A517A8209ABD7602AC331866E647132D1BBA65400014A6A5'
// token-2: '00080000BCE0D6D1A517A8209ABD7602AC331866E647132D32A036410014A6A6'
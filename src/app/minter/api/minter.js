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
        URI: xrpl.convertStringToHex(`Rihla-Test-URI`),
        Flags: 8,
        NFTokenTaxon: 0 //Required, but if you have no use for it, set to zero.
    }

    const preparedTx = await client.autofill(nftTransaction);
    const signedTx = wallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);
    console.log('NFT Mint Result:', result);

    // const tx = await client.submitAndWait(nftTransaction, { wallet: wallet} )
    // // const nfts = await client.request({
    // //     method: "account_nfts",
    // //     account: wallet.classicAddress
    // // })
    // // console.log('NFTs:', nfts);

    await client.disconnect();
}
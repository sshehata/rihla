const config = require('../../config')
const xrpl = require('xrpl')
const crypto = require('crypto')

// artUniqueData -- JSON object with unique data (will be further hashed)
export async function mint(artUniqueReference) {
    const wallet = xrpl.Wallet.fromSeed(config.rihlaWallet.secret)

    console.log(`MINTER: Connecting to network ${config.xrplConfig.network} using wallet: ${wallet.classicAddress}...`);
    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
    await client.connect();
    console.log('MINTER: Connected!')

    const nftURI = xrpl.convertStringToHex(artUniqueReference)
    console.log('MINTER: URI -- ', nftURI)

    const nftTransaction = {
        TransactionType: "NFTokenMint",
        Account:  wallet.classicAddress,
        URI: nftURI,
        Flags: 8,
        NFTokenTaxon: 0 //Required, but if you have no use for it, set to zero.
    }

    const preparedTx = await client.autofill(nftTransaction);
    const signedTx = wallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);
    console.log('NFT Mint Result:', result);

    let nftId = null;
    const meta = result.result.meta;
    if (meta) {
        const metadata = typeof meta === 'string' ? JSON.parse(meta) : meta;
        nftId = metadata.nftoken_id; // not exported, but good enough for prototype
    }

    await client.disconnect();
    console.log('MINTER: Disconnected!')

    return nftId
}

export async function get_nfts_for_rihlia() {
    await get_nfts_for_seed(config.rihlaWallet.secret)
}

export async function get_nfts_for_seed(walletSeed) {
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
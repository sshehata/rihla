const config = require('../../config')
const xrpl = require('xrpl')
const crypto = require('crypto');

export async function mint(artUniqueReference) {
    const wallet = xrpl.Wallet.fromSeed(config.rihlaWallet.secret)

    console.log(`MINTER: Connecting to network ${config.xrplConfig.network} using wallet: ${wallet.classicAddress}...`);
    const client = new xrpl.Client(config.xrplConfig.network);
    await client.connect();
    console.log('MINTER: Connected!')

    const nftURI = xrpl.convertStringToHex(artUniqueReference)
    console.log('MINTER: URI -- ', nftURI)

    const nftTransaction = {
        TransactionType: "NFTokenMint",
        Account:  wallet.classicAddress,
        URI: nftURI,
        Flags: 8,
        NFTokenTaxon: 0
    }

    const preparedTx = await client.autofill(nftTransaction);
    const signedTx = wallet.sign(preparedTx);
    const result = await client.submitAndWait(signedTx.tx_blob);
    console.log('NFT Mint Result:', result);

    let nftId = null;
    const meta = result.result.meta;
    if (meta) {
        const metadata = typeof meta === 'string' ? JSON.parse(meta) : meta;
        nftId = metadata.nftoken_id;
    }

    await client.disconnect();
    console.log('MINTER: Disconnected!')

    return nftId
}

export async function get_nfts_for_rihla() {
    return await get_nfts_for_seed(config.rihlaWallet.secret)
}

export async function get_nfts_for_seed(walletSeed) {
    const wallet = xrpl.Wallet.fromSeed(walletSeed)

    const client = new xrpl.Client(config.xrplConfig.network);
    await client.connect();

    const xrplResponse = await client.request({
         method: "account_nfts",
         account: wallet.classicAddress
    })
    console.log('NFTs:', JSON.stringify(xrplResponse,null,2));

    const nfts = xrplResponse.result.account_nfts.map(nft => ({
        id: nft.NFTokenID,
        uri: nft.URI ? Buffer.from(nft.URI, 'hex').toString('utf8') : null
    }));

    await client.disconnect();

    return nfts
}

export async function get_balance_for_rihla() {
   await get_balance_for_seed(config.rihlaWallet.secret)
}

export async function get_balance_for_seed(walletSeed) {
    const wallet = xrpl.Wallet.fromSeed(walletSeed)

    console.log(`MINTER: Connecting to network ${config.xrplConfig.network} using wallet: ${wallet.classicAddress}...`);
    const client = new xrpl.Client(config.xrplConfig.network);
    await client.connect();
    console.log('MINTER: Connected!')

    const balance = await client.getBalances(wallet.address)
    console.log("BALANCE: ", balance)

    await client.disconnect();
    console.log('MINTER: Disconnected!')
}

export async function transfer_nft_from_rihla_to(nftId, toWalletSeed) {
    await transfer_nft_from_to(nftId, config.rihlaWallet.secret, toWalletSeed)
}

export async function transfer_nft_from_to(nftId, fromWalletSeed, toWalletSeed) {
    const fromWallet = xrpl.Wallet.fromSeed(fromWalletSeed)
    const toWallet = xrpl.Wallet.fromSeed(toWalletSeed)

    console.log(`MINTER: Connecting to network ${config.xrplConfig.network}`);
    const client = new xrpl.Client(config.xrplConfig.network);
    await client.connect();
    console.log('MINTER: Connected!')

    const createOfferTx = {
        TransactionType: 'NFTokenCreateOffer',
        Account: fromWallet.classicAddress,
        Destination: toWallet.classicAddress,
        NFTokenID: nftId,
        Amount: '0',
        Flags: xrpl.NFTokenCreateOfferFlags.tfSellNFToken
    };

    const preparedCreateOfferTx = await client.autofill(createOfferTx);
    const signedCreateOfferTx = fromWallet.sign(preparedCreateOfferTx);
    const createOfferResult = await client.submitAndWait(signedCreateOfferTx.tx_blob);
    console.log('NFTokenCreateOffer Result:', createOfferResult);


    const offerIndex = createOfferResult.result.meta.AffectedNodes.find(
        node => node.CreatedNode && node.CreatedNode.LedgerEntryType === 'NFTokenOffer'
    ).CreatedNode.LedgerIndex;

    const acceptOfferTx = {
        TransactionType: 'NFTokenAcceptOffer',
        Account: toWallet.classicAddress,
        NFTokenSellOffer: offerIndex
    };

    const preparedAcceptOfferTx = await client.autofill(acceptOfferTx);
    const signedAcceptOfferTx = toWallet.sign(preparedAcceptOfferTx);
    const acceptOfferResult = await client.submitAndWait(signedAcceptOfferTx.tx_blob);
    console.log('NFTokenAcceptOffer Result:', acceptOfferResult);

    await client.disconnect();
    console.log('MINTER: Disconnected!')
}
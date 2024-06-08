const config = require('../../config')
const xrpl = require('xrpl')

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

export async function get_nfts_for_rihla() {
    await get_nfts_for_seed(config.rihlaWallet.secret)
}

export async function get_nfts_for_seed(walletSeed) {
    const wallet = xrpl.Wallet.fromSeed(walletSeed)

    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
    await client.connect();

    const nfts = await client.request({
         method: "account_nfts",
         account: wallet.classicAddress
    })
    console.log('NFTs:', JSON.stringify(nfts,null,2));

    await client.disconnect();
}

export async function get_balance_for_rihla() {
   await get_balance_for_seed(config.rihlaWallet.secret)
}

export async function get_balance_for_seed(walletSeed) {
    const wallet = xrpl.Wallet.fromSeed(walletSeed)

    console.log(`MINTER: Connecting to network ${config.xrplConfig.network} using wallet: ${wallet.classicAddress}...`);
    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
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
    const client = new xrpl.Client(config.xrplConfig.network); // Use testnet for development
    await client.connect();
    console.log('MINTER: Connected!')

    const createOfferTx = {
        TransactionType: 'NFTokenCreateOffer',
        Account: fromWallet.classicAddress,
        NFTokenID: nftId,
        Amount: '0', // 0 XRP to transfer the NFT without payment
        Flags: xrpl.NFTokenCreateOfferFlags.tfSellNFToken
    };

    const preparedCreateOfferTx = await client.autofill(createOfferTx);
    const signedCreateOfferTx = fromWallet.sign(preparedCreateOfferTx);
    const createOfferResult = await client.submitAndWait(signedCreateOfferTx.tx_blob);
    console.log('NFTokenCreateOffer Result:', createOfferResult);

    // Extract the offer index from the NFTokenCreateOffer result
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
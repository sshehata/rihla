import * as minter from "@/app/nftmanager/api/nftmanager";

// test operational wallet addr -- r4EadzUh7EDbBdHssAKjPk3cmyJ4YyMzZ3
// test operational wallet seed -- sEd7r8x2pJFPpQY7YNermVqu4nqePYv

const testOperationalWalletSeed = 'sEd7r8x2pJFPpQY7YNermVqu4nqePYv'
const testNftId = '00080000BCE0D6D1A517A8209ABD7602AC331866E647132D1BBA65400014A6A6'

export async function GET(request) {
  // const artUniqueReference = "art-unique-reference-" + Math.floor(Math.random() * 1000);
  // const nftId = await minter.mint(artUniqueReference);
  // console.log('NFT CREATED WITH ID: ', nftId)

  //await minter.get_balance_for_rihla()

  //await minter.transfer_nft_from_rihla_to(testNftId, testOperationalWalletSeed)

  const nfts = await minter.get_nfts_for_rihla()
  //const nfts = await minter.get_nfts_for_seed(testOperationalWalletSeed)
  console.log("API NFTS: ", nfts)

  return Response.json({"message": "hello"})
}



import * as minter from "@/app/minter/api/minter";

// test operational wallet addr -- r4EadzUh7EDbBdHssAKjPk3cmyJ4YyMzZ3
// test operational wallet seed -- sEd7r8x2pJFPpQY7YNermVqu4nqePYv

export async function GET(request) {
  // const artUniqueReference = "art-unique-reference-" + Math.floor(Math.random() * 1000);
  // const nftId = await minter.mint(artUniqueReference);
  // console.log('NFT CREATED WITH ID: ', nftId)

  //await minter.get_nfts_for_rihla()

  await minter.get_balance_for_rihla()

  //await minter.transfer_nft_to()

  return Response.json({"message": "hello"})
}



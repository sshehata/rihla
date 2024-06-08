import * as minter from "@/app/minter/api/minter";

export async function GET(request) {
  // const artUniqueReference = "art-unique-reference-" + Math.floor(Math.random() * 1000);
  // const nftId = await minter.mint(artUniqueReference);
  // console.log('NFT CREATED WITH ID: ', nftId)

  //await minter.get_nfts_for_rihlia()

  await minter.get_rihlia_balance()

  return Response.json({"message": "hello"})
}



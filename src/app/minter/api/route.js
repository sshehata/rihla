import * as minter from "@/app/minter/api/minter";
import crypto from "crypto";
import {get_nfts_for_rihlia} from "@/app/minter/api/minter";

export async function GET(request) {
  // const artUniqueData = { "author": "you" };
  // const artUniqueDataStr = JSON.stringify(artUniqueData);
  // const artUniqueReference = crypto.createHash('sha256').update(artUniqueDataStr)
  //     .digest('hex').toUpperCase()
  //
  // const nftId = await minter.mint(artUniqueReference);
  // console.log('NFT CREATED WITH ID: ', nftId)

  //await minter.get_nfts()

  await get_nfts_for_rihlia()

  return Response.json({"message": "hello"})
}



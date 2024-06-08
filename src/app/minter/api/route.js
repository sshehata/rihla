import * as minter from "@/app/minter/api/minter";

export async function GET(request) {
  //await minter.mint();
  await minter.get_nfts()
  return Response.json({"message": "hello"})
}



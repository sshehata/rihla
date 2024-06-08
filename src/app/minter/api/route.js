import * as minter from "@/app/minter/api/minter";

export async function GET(request) {
  await minter.mint();
  return Response.json({"message": "hello"})
}



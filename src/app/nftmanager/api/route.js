import * as minter from "@/app/nftmanager/api/nftmanager";


const testOperationalWalletSeed = 'sEd7r8x2pJFPpQY7YNermVqu4nqePYv'
const testNftId = '00080000BCE0D6D1A517A8209ABD7602AC331866E647132D1BBA65400014A6A6'

export async function GET(request) {

  const nfts = await minter.get_nfts_for_rihla()

  console.log("API NFTS: ", nfts)

  return Response.json({"message": "hello"})
}



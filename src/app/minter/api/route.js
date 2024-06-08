const config = require('../../config')
const xrpl = require('xrpl')

export async function GET(request) {
  console.log("SEED IN CFG: " + config.rihlaWallet.secret)
  console.log("ADDR IN CFG: " + config.rihlaWallet.address)

  const wallet = xrpl.Wallet.fromSeed(config.rihlaWallet.secret)
  console.log('WALLET ADDR:', wallet.address);
  console.log('WALLET CLASSIC ADDR:', wallet.classicAddress);
  
  return Response.json({"message": "hello"})

}



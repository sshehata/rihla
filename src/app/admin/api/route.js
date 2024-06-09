import {addCollectible, getCollectibles} from "@/app/api/state";
import fs from "fs/promises";
import {mint} from "@/app/nftmanager/api/nftmanager";

export async function POST(request) {
    const data = await request.formData()
    let fileArrayBuffer = await data.get('artwork').arrayBuffer();
    await fs.writeFile(
        './public/images/' + data.get('artwork').name,
        Buffer.from(fileArrayBuffer),
    )

    fileArrayBuffer = await data.get('biometrics').arrayBuffer();
    await fs.writeFile(
        './public/biometrics/' + data.get('biometrics').name,
        Buffer.from(fileArrayBuffer),
    )

    const item = {
        biometricsPath: '/biometrics/' + data.get('biometrics').name,
        artworkPath: '/images/' + data.get('artwork').name,
        artist: data.get('artist'),
        priceXRP: data.get('euroPrice'),
        priceEUR: data.get('xrpPrice'),
        name: data.get('name'),
        artistProfitMargin: data.get('artistProfitMargin'),
        id: getCollectibles().length + 1,
        entryTokens: parseInt(data.get('entryTokens'))
    }

    item.nftId = await mint(JSON.stringify(item))

    return Response.json(item)
}

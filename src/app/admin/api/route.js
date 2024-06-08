import {addListing, getListings} from "@/app/api/state";
import fs from "fs/promises";

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

    addListing({
        biometricsPath: './public/biometrics/' + data.get('biometrics').name,
        artworkPath: './public/images/' + data.get('artwork').name,
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        price: data.get('price'),
        artistProfitMargin: data.get('artistProfitMargin'),
        id: getListings().length + 1
    })

    console.log(getListings())

    return Response.json({})
}

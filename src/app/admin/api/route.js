import {addListing, getListings} from "@/app/api/state";

export async function POST(request) {
    const data = await request.json()
    addListing({...data, id: getListings().length + 1})

    return Response.json({})
}

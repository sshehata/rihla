import {addListing, getListings} from "@/app/api/state";
import multer from "multer";

// Configure multer storage
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit (5MB here)
});


export async function POST(request) {
    const data = await request.formData()
    console.log(data);
    addListing({...data, id: getListings().length + 1})

    return Response.json({})
}

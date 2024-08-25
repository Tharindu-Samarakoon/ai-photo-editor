'use server'

import { checkImageProcessing } from "@/lib/check-processing";
import { actionClinet } from "@/lib/safe-action";
import { v2 as cloudinary } from "cloudinary"
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { format } from "path";
import z, { string } from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function GET(request: NextRequest) {
    const searchParam = request.nextUrl.searchParams;
    const quality = searchParam.get('quality');
    const public_id = searchParam.get('public_id');
    const format = searchParam.get('format');
    const activeUrl = searchParam.get('url');

    console.log(searchParam);
    

    if (!public_id) {
        console.log("no public_id");    
        return new NextResponse("Missing publicId Parameter", { status: 404 });
    }

    console.log("After publicId check ======");
    

    let selected = ""

    if(format === "png" ) {
        selected = ""
    }

    if(format !== "json") {
        switch(quality){
            case "original" :
                break
            case "large" :
                selected = "q_80"
                break
            case "medium" :
                selected = "q_50"
                break
            case "small" :
                selected = "q_30"
                break
            default:
                return new NextResponse("Invalid quality parameter", {status: 400})
        }
    }

    console.log("After switch" + selected);
    

    try {
        const parts = activeUrl!.split("/upload/")
        const url = selected ? `${parts[0]}/upload/${parts[1]}` : activeUrl!

        console.log(url);
        

        let isProcossed = false;
        const maxAttempts = 20;
        const delay = 1000;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            isProcossed = await checkImageProcessing(url);
            console.log("Checking image processing : ", isProcossed );
            

            if(isProcossed) {
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, delay))
        }

        if(!isProcossed) throw new Error("Image processing timed out");

        return NextResponse.json(
            {
                url,
                filename: `${public_id}.${quality}.${format}`,
            }
        )

    } catch (error) {
        console.log(error);
        
        return NextResponse.json(
            {error: "Error generating image URL"},
            {status: 500}
        )
    }
}
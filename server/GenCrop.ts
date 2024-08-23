'use server';

import { checkImageProcessing } from "@/lib/check-processing";
import { actionClinet } from "@/lib/safe-action";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z, { date } from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const genFillSchema = z.object({
    activeVideo : z.string(),
    aspect: z.string(),
    height: z.string(),
})

export const genCrop = actionClinet
.schema(genFillSchema)
.action( async ({ parsedInput: {activeVideo, aspect, height}}) => {
    const parts = activeVideo.split("/upload/")
    const fillUrl = `${parts[0]}/upload/ar_${aspect},c_fill,g_auto,h_${height}/${parts[1]}`
    console.log(fillUrl);
    

    let isProcessed = false;
            const maxAttempts = 20;
            const delay = 1000
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                isProcessed = await checkImageProcessing(fillUrl);
                console.log(isProcessed);
                
                if(isProcessed){
                    console.log("Breaking for loop");
                    
                    break;
                }
                await new Promise((resolve) => {
                    setTimeout(resolve, delay);
                })
            }

            if(!isProcessed){
                return {error: "Video processing failed"};
            }

            console.log(fillUrl);
            
            return {success: fillUrl}
})
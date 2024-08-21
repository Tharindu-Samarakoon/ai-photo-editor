'use server'

import { checkImageProcessing } from "@/lib/check-processing";
import { actionClinet } from "@/lib/safe-action";
import { v2 as cloudinary } from "cloudinary"
import { format } from "path";
import z from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const bgRemoveSchema = z.object({
    format: z.string(),
    activeImage: z.string(),
})

export const bgRemove = actionClinet
    .schema(bgRemoveSchema)
    .action(
        async ({parsedInput: {format, activeImage}}) => {
            const form = activeImage.split(format)
            const pngConvert = form[0] + "png"
            const parts = pngConvert.split("/upload/")
            const removeUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`
            

            let isProcessed = false;
            const maxAttempts = 20;
            const delay = 500
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                isProcessed = await checkImageProcessing(removeUrl);
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
                throw new Error("Image processing failed.")
            }

            console.log(removeUrl);
            
            return {success: removeUrl}

        }
    )
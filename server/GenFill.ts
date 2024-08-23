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

const genFillSchema = z.object({
    aspect: z.string(),
    activeImage: z.string(),
    width: z.number(),
    height: z.number(),
})

export const genFill = actionClinet
    .schema(genFillSchema)
    .action(
        async ({parsedInput: {aspect, activeImage, width, height}}) => {
            console.log(activeImage);
            
            const parts = activeImage.split("/upload/")
            const fillURL = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w_${width},h_${height}/${parts[1]}`
            console.log(fillURL);
            
            
            let isProcessed = false;
            const maxAttempts = 20;
            const delay = 500
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                isProcessed = await checkImageProcessing(fillURL);
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

            console.log(fillURL);
            
            return {success: fillURL}

        }
    )
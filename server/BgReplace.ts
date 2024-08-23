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

const bgReplaceSchema = z.object({
    prompt: z.string(),
    activeImage: z.string(),
})

export const bgReplace = actionClinet
    .schema(bgReplaceSchema)
    .action(
        async ({parsedInput: {prompt, activeImage}}) => {
            console.log(activeImage);
            
            const parts = activeImage.split('/upload/');
            const bgReplaceURL = prompt ? `${parts[0]}/upload/e_gen_background_replace:prompt_${prompt}/${parts[1]}` : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`;
            
            console.log(bgReplaceURL);
            

            let isProcessed = false;
            const maxAttempts = 20;
            const delay = 500
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                isProcessed = await checkImageProcessing(bgReplaceURL);
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

            console.log(bgReplaceURL);
            
            return {success: bgReplaceURL}

        }
    )
'use server'

import { checkImageProcessing } from "@/lib/check-processing";
import { actionClinet } from "@/lib/safe-action";
import { v2 as cloudinary } from "cloudinary"
import { format } from "path";
import z, { string } from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const extractSchema = z.object({
    activeImage: z.string(),
    prompts: z.array(z.string()),
    multiple: z.boolean().optional(),
    invert: z.boolean().optional(),
    mode: z.enum(['default', 'mask']).optional(),
    format: z.string(),
})

export const extractParts = actionClinet
    .schema(extractSchema)
    .action(
        async ({parsedInput: {activeImage, format, prompts, invert, mode, multiple}}) => {
            const form = activeImage.split(format)
            const pngConvert = form[0] + "png"
            const parts = pngConvert.split("/upload/")

            let extractParams = `prompt_(${prompts.map((p) => encodeURIComponent(p)).join(';')})`;
            if(multiple) {
                extractParams += ";multiple_true" ;
            }
            if(mode === "mask") {
                extractParams += ";mode_mask";
            }
            if(invert) {
                extractParams += ";invert_true";
            }

            const extractURL = `${parts[0]}/upload/e_extract:${extractParams}/${parts[1]}`
            

            let isProcessed = false;
            const maxAttempts = 20;
            const delay = 500
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                isProcessed = await checkImageProcessing(extractURL);
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

            console.log(extractURL);
            
            return {success: extractURL}

        }
    )
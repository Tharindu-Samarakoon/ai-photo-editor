'use server';

import { actionClinet } from "@/lib/safe-action";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
    image: z.instanceof(FormData),
});

type UploadResult =
{
    success: UploadApiResponse
    error?: never
} | 
{
    error: string
    success?: never
}


export const uploadImage = actionClinet
.schema(formData)
.action(async ({ parsedInput: { image } }): Promise<UploadResult> => {
    const formImage = image.get('image');
    if(!formImage || !image) return {error: "No image was provided."};

    const file = formImage as File;


    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<UploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
            upload_preset: 'ai_image_editor',
            }, (err, response) => {
                if(err || !response) {
                    reject({error: "Something went wrong uploading."});
                } else {
                    resolve({success: response})
                }
            })
            uploadStream.end(buffer);
        })
    } catch (error) {
        return {error : "Error processing file"};
    }
});
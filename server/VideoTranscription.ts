'use server';

import { actionClinet } from "@/lib/safe-action";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z, { date } from 'zod';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const transcriptionSchema = z.object({
    publicId: z.string(),
})

const checkTranscription = async (publicId: string) : Promise<string>  => {
    try {
        const result = await cloudinary.api.resource(publicId , {
            resource_type: 'video'
        })
        if(result.info && result.info.raw_convert && result.info.raw_convert.google_speech) {
            return result.info.raw_convert.google_speech.status;
        }
        return 'pending';
    } catch (error) {
        throw new Error("Failed to check transcription status");
    }
}

const generateSubVideoURL = (publicId: string): string => {
    return cloudinary.url(publicId, {
        resource_type: 'video',
        transformation: [
            {
                overlay: {
                    resource_type: 'subtitles',
                    public_id: `${publicId}.transcript`,
                },
            },
            {flags: 'layer_apply'}
        ],
    })
} 

export const initializeTranscription = actionClinet.schema(transcriptionSchema)
.action(async ({parsedInput: {publicId}}) => {
    try {
        await cloudinary.api.update(publicId, {
            resource_type: "video",
            raw_convert: "google_speech",
        })
        const maxAttempts = 20;
        const delay = 1000;
        let status = 'pending';

        for(let i = 0; i < maxAttempts; i++) {
            status = await checkTranscription(publicId);
            console.log(status);

            if(status === 'complete') {
                const subtitleVideoURL = generateSubVideoURL(publicId);
                return { success: "Transcription Complete", subtitleVideoURL};
            } else if ( status === 'failed') {
                return {error : "Transcription Failed"}
            }
            
            await new Promise((resolve, reject) => setTimeout(resolve, delay));
        }

        return {error : "Transcription timed out"};


    } catch (error) {
        return {error : "Error in Transcription Processing"};
    }
})
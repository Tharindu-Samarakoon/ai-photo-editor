import { uploadImage } from '@/server/UploadImage';
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { useImageStore } from '@/lib/image-store';
import { useLayerStore } from '@/lib/layerStore';
import Lottie from 'lottie-react';
import VideoAnimation from '@/public/videoAnimation.json'
import { uploadVideo } from '@/server/UploadVideo';

const UploadVideo = () => {

    const setGenerating = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const updateLayer = useLayerStore((state) => state.updateLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1,
        accept: {
            'video/mp4': ['.mp4'],
        },
        onDrop: async (acceptedFiles, fileRejections) => {
            if(acceptedFiles.length) {
                const formData = new FormData();
                formData.append("video", acceptedFiles[0]);
                
                //TODO: state management layer, active layers etc.
                setGenerating(true);



                setActiveLayer(activeLayer.id);

                const res = await uploadVideo({video: formData});
                console.log(res);
                

                if(res?.data?.success){
                    const videoUrl = res.data.success.url;
                    const thunbnail = videoUrl.replace(/\.[^/.]+$/, ".jpg")
                    updateLayer({
                        id: activeLayer.id,
                        url: res.data.success.url,
                        width: res.data.success.width,
                        height: res.data.success.height,
                        name: res.data.success.name,
                        publicId: res.data.success.public_id,
                        format: res.data.success.format,
                        poster: thunbnail,
                        resourceType: res.data.success.resource_type
                    })
                    setActiveLayer(activeLayer.id);
                    setGenerating(false);
                }
                if(res?.data?.error) {
                    setGenerating(false);
                }

                console.log(res);
                
            }
        }
    })

if(!activeLayer.url)
  return (
    <Card {...getRootProps()} 
        className={cn("hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out", `${isDragActive? "animate-pulse border-primary bg-secondary" : ""}`)}>
        <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24 text-xs">
            <input {...getRootProps()} type='text'/>
            <div className="flex items-center flex-col justify-center gap-2">
                <Lottie className='h-32' animationData={VideoAnimation} />
                <h1>Cool Animation</h1>
                <p className='text-muted-foreground text-2xl'>{isDragActive? "Drop Your Video Here" : "Start by Uploading an Video"}</p>
                <p className='text-muted-foreground'>Supported formats .mp4</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default UploadVideo
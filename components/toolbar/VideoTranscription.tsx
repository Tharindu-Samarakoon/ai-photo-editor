import { useImageStore } from '@/lib/image-store';
import { useLayerStore } from '@/lib/layerStore'
import { initializeTranscription } from '@/server/VideoTranscription';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Captions } from 'lucide-react';

const VideoTranscription = () => {

    const activeLayer = useLayerStore((state) => state.activeLayer);
    const updateLayer = useLayerStore((state) => state.updateLayer);
    const setGenerating = useImageStore((state) => state.setGenerating);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const [transcribing, setTransribing] = useState(false);

    const handleTranscribe = async() => {
        if(!activeLayer.publicId || activeLayer.resourceType !== 'video'){
            return;
        }
        setTransribing(true);
        setGenerating(true);

        try {
            const res = await initializeTranscription({
                publicId: activeLayer.publicId,
            })
            if(res) {
              if(res.data?.subtitleVideoURL) {
                updateLayer({...activeLayer, transcriptionURL: res.data.subtitleVideoURL});
                setActiveLayer(activeLayer.id);
              } else {
                console.log(res.data?.error);                
              }
            }
        } catch (error) {
            console.log(error);
        } finally {
          setTransribing(false);
          setGenerating(false);
        }
    }



  return (
    <div className='flex items-center'>
      {!activeLayer.transcriptionURL && (
        <Button className='py-8 w-full'
          disabled={transcribing || activeLayer.resourceType !== 'video'}
          variant={'outline'}
          onClick={handleTranscribe}
          >
            <span className='flex gap-1 items-center justify-center flex-col text-xs font-medium'>
              {transcribing ? 'Transcribing' : 'Transcribe'}
              <Captions size={18} />
            </span>
          </Button>
      )}
      {activeLayer.transcriptionURL && (
        <Button className='py-8 w-full'
          variant={'outline'}
          asChild
          >
            <a href={activeLayer.transcriptionURL} target='_blank' rel='noopener noreferrer'>
            <span className='flex gap-1 items-center justify-center flex-col text-xs font-medium'>
              View Transcription
              <Captions size={18} />
            </span>
            </a>
          </Button>
      )}
    </div>
  )
}

export default VideoTranscription
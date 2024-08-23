'use client'

import { useLayerStore } from '@/lib/layerStore'
import React, { useState } from 'react'
import UploadImage from './uploadImage';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { ImageIcon, VideoIcon } from 'lucide-react';
import UploadVideo from './UploadVideo';

const UploadForm = () => {

    const activeLayer = useLayerStore((state) => state.activeLayer);
    const [selectedType, setSelectedType] = useState('image');

    if(!activeLayer.url)
  return (
    <div className='w-full p-24 flex flex-col justify-center h-full gap-y-6'>
        {selectedType === 'image' ? <UploadImage/> : null}
        {selectedType === 'video' ? <UploadVideo/> : null}



        <RadioGroup defaultValue='image' onValueChange={(e) => setSelectedType(e)}
            className='flex items-center justify-center'
          >
          <Card onClick={(e) => setSelectedType('image')} 
              className={cn('flex flex-col items-center justify-center py-4 px-6 gap-4 cursor-pointer', selectedType === 'image' ? 'border-primary' : null )}
            >
              <CardContent className='flex items-center space-x-2 p-0'>
                <RadioGroupItem value='image' id='image-mode' hidden />
                <Label
                  className={`${selectedType === 'image' ? 'text-primary' : null}`}
                  htmlFor='image-mode'
                >Image Mode</Label>
              </CardContent>
              <ImageIcon className={`${selectedType === 'image' ? 'text-primary' :  null}`}
                size={36} />
            </Card>

            <Card onClick={(e) => setSelectedType('video')} 
              className={cn('flex flex-col items-center justify-center py-4 px-6 gap-4 cursor-pointer', selectedType === 'video' ? 'border-primary' : null )}
            >
              <CardContent className='flex items-center space-x-2 p-0'>
                <RadioGroupItem value='video' id='video-mode' hidden />
                <Label
                  className={`${selectedType === 'video' ? 'text-primary' : null}`}
                  htmlFor='video-mode'
                >video Mode</Label>
              </CardContent>
              <VideoIcon className={`${selectedType === 'video' ? 'text-primary' :  null}`}
                size={36} />
            </Card>

        </RadioGroup>
    </div>
  )
}

export default UploadForm
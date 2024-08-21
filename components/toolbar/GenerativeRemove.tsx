import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layerStore';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Eraser } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { genRemove } from '@/server/GenRemove';

const GenerativeRemove = () => {

    const setGenerative = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const [activeTag, setActiveTag] = useState('nothing')

  return (
    <Popover>
        <PopoverTrigger disabled={!activeLayer?.url} asChild>
            <Button variant={'outline'} className='p-8'>
                <span className='flex gap-1 items-center justify-center flex-col text-xs font-medium'>
                    Content Aware 
                    <Eraser size={20} />
                </span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
            <div className="">
                <h3>Smart AI Remove</h3>
                <p>Generatively remove any part of the image</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor='selection'>Selection</Label>
                <Input name='selection' className='col-span-2 h-8' value={activeTag} onChange={(e) => {
                    setActiveTag(e.target.value)
                }} />
            </div>
            <Button className='w-full mt-4'
                onClick={async () => {
                    const newLayerId = crypto.randomUUID();

                    setGenerative(true);
                    const res = await genRemove({
                        activeImage: activeLayer.url || "",
                        prompt: activeTag
                    });
                    if(res?.data?.success){
                        setGenerative(false);
                        addLayer({
                            id: newLayerId,
                            url: res.data.success,
                            format: activeLayer.format,
                            height: activeLayer.height,
                            width: activeLayer.width,
                            name: 'GenRemoved' + activeLayer.name,
                            publicId: activeLayer.publicId,
                            resourceType: "image"
                        })
                        setActiveLayer(newLayerId);
                    }

                }}
            >
                AI Remove
            </Button>
        </PopoverContent>
    </Popover>
  )
}

export default GenerativeRemove
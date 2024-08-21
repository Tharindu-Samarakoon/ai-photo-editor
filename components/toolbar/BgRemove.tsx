import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layerStore';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Eraser, ImageOffIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { genRemove } from '@/server/GenRemove';
import { bgRemove } from '@/server/BgRemove';

const BgRemove = () => {

    const setGenerative = useImageStore((state) => state.setGenerating);
    const generating = useImageStore((state) => state.generating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const [activeTag, setActiveTag] = useState('nothing')

  return (
    <Popover>
        <PopoverTrigger disabled={!activeLayer?.url} asChild>
            <Button variant={'outline'} className='p-8'>
                <span className='flex gap-1 items-center justify-center flex-col text-xs font-medium'>
                    Background Removal 
                    <ImageOffIcon size={20} />
                </span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
            <div className="">
                <h3>Smart AI BG Remove</h3>
                <p>Generatively remove the background of the image</p>
            </div>
            <Button className='w-full mt-4'
                disabled={!activeLayer?.url || generating}
                onClick={async () => {
                    const newLayerId = crypto.randomUUID();

                    setGenerative(true);
                    const res = await bgRemove({
                        activeImage: activeLayer.url || "",
                        format: activeLayer.format || ""
                    });
                    if(res?.data?.success){
                        addLayer({
                            id: newLayerId,
                            url: res.data.success,
                            format: "png",
                            height: activeLayer.height,
                            width: activeLayer.width,
                            name: 'GenRemoved' + activeLayer.name,
                            publicId: activeLayer.publicId,
                            resourceType: "image"
                        })
                        setActiveLayer(newLayerId);
                        setGenerative(false);
                    }

                    if (res?.serverError) {
                        setGenerative(false);
                    }

                }}
            >
                {generating? 'Removing...' : 'Remove Background'}
            </Button>
        </PopoverContent>
    </Popover>
  )
}

export default BgRemove
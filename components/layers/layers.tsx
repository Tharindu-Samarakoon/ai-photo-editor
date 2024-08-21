'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useLayerStore } from '@/lib/layerStore'
import { Staatliches } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useImageStore } from '@/lib/image-store'
import { Button } from '../ui/button'
import { Layers2 } from 'lucide-react'
import LayerImage from './layerImage'
import LayerInfo from './layer-info'
import { url } from 'inspector'

const Layers = () => {

    const layers = useLayerStore((state) => state.layers)
    const activeLayer = useLayerStore((state) => state.activeLayer)
    const addLayer = useLayerStore((state) => state.addLayer)
    const generating = useImageStore((state) => state.generating)
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  return (
    <Card 
        className='basis-[320px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl '>
        <CardHeader className='sticky top-0 z-50 px-4 py-6 min-h-24 bg-card shadow-sm'>
            <div className="">
                <CardTitle>
                    {activeLayer.name || "Layers"}
                </CardTitle>
                {
                    activeLayer.width && activeLayer.height ? (
                        <CardDescription>
                            {activeLayer.width}x{activeLayer.height}
                        </CardDescription>
                    ) : null
                }
            </div>
        </CardHeader>
        <CardContent className='flex-1 flex flex-col'>
            {
                layers.map((layer, index) => 
                    <div className={cn('cursor-pointer ease-in-out hover:bg-secondary border border-transparent', {'animate-pulse': generating,
                        'border-primary/50 rounded-md': activeLayer.id === layer.id
                    })} key={index}
                    onClick={() => {
                        if (generating) return;
                        setActiveLayer(layer.id);
                    }}
                    >

                        <div className="relative p-4 flex items-center">
                            <div className="flex gap-2 items-center h-8 w-full justify-between">
                            {!layer.url ? (
                                <p className='text-xs font-medium justify-self-end'>New Layer</p>
                            ) : null}
                            <LayerImage layer={layer}/>
                            <LayerInfo layer={layer} layerIdex={index}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </CardContent>
        <div className="sticky bottom-0 bg-card flex gap-2 shrink-0">
            <Button className='w-full flex gap-2' onClick={(e)=> {
                addLayer({
                    id: crypto.randomUUID(),
                    url: "",
                    height: 0,
                    width: 0,
                    publicId: "",
                    name: "",
                    format: "",
                })
            }}>
                <span>Create Layer</span>
                <Layers2 size={18} className='text-xs'/>
            </Button>
        </div>
    </Card>
  )
}

export default Layers
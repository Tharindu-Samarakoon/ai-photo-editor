'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useLayerStore } from '@/lib/layerStore'
import { Staatliches } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useImageStore } from '@/lib/image-store'
import { Button } from '../ui/button'
import { ArrowRight, Images, Layers2 } from 'lucide-react'
import LayerImage from './layerImage'
import LayerInfo from './layer-info'
import { url } from 'inspector'
import Image from 'next/image'

const Layers = () => {

    const layers = useLayerStore((state) => state.layers)
    const activeLayer = useLayerStore((state) => state.activeLayer)
    const addLayer = useLayerStore((state) => state.addLayer)
    const generating = useImageStore((state) => state.generating)
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    const comparisonMode = useLayerStore((state) => state.layerComparisonMode)
    const comparedLayers = useLayerStore((state) => state.comparedLayers);
    const setComparisonMode = useLayerStore((state) => state.setLayerComparisonMode);
    const setComparedLayers = useLayerStore((state) => state.setComparedLayers);
    const toggleComparedLayer = useLayerStore((state) => state.toggleComparedLayer);

    const getLayerName = useMemo(
        () => (id: string) => {
            const layer = layers.find((l) => l.id === id);
            return layer ? layer.url : "Nothing here"
        },
        [layers]
    )

    const visibleLayers = useMemo(
        () => comparisonMode ?
            layers.filter((layer) => layer.url && layer.resourceType === "image") : layers,
        [comparisonMode, layers]
    )


  return (
    <Card 
        className='basis-[360px] shrink-0  scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl '>
        <CardHeader className='sticky top-0 z-50 px-4 py-6 min-h-24 bg-card shadow-sm'>

            {comparisonMode ? (
                <div className="">
                <CardTitle>
                    Comparing...
                </CardTitle>
                    <CardDescription className='flex justify-start gap-3 my-2'>
                        <Image 
                            src={getLayerName(comparedLayers[0]) as string}
                            alt="compare"
                            width={32}
                            height={32}
                        />
                        {comparedLayers.length > 0 && <ArrowRight/>}
                        {comparedLayers.length > 1 ? (
                            <Image 
                            src={getLayerName(comparedLayers[1]) as string}
                            alt="compare"
                            width={32}
                            height={32}
                        />
                        ) : 'Nothing here'}
                    </CardDescription>
            </div>
            ) : null}

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
                visibleLayers.map((layer, index) => 
                    <div className={cn('cursor-pointer ease-in-out hover:bg-secondary border border-transparent', {'animate-pulse': generating,
                        'border-primary/50 rounded-md': comparisonMode ? comparedLayers.includes(layer.id) : activeLayer.id === layer.id,

                    })} key={index}
                    onClick={() => {
                        if (generating) return;
                        if (comparisonMode){
                            toggleComparedLayer(layer.id)
                        } else {
                            setActiveLayer(layer.id);
                        }
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
        <div className="sticky bottom-0 bg-card flex gap-2 shrink-0 p-2">
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
            <Button
                variant={'outline'}
                disabled={!activeLayer.url || activeLayer.resourceType === "video"}
                onClick={() => {
                    if(comparisonMode){
                        setComparisonMode(!comparisonMode);
                    } else {
                        setComparedLayers([activeLayer.id]);
                    }
                } }
                className='flex items-center gap-2'
            >
                <span>
                    {comparisonMode ? "Stop comparing" : "Compare Layers"}
                </span>
                {!comparisonMode && (
                    <Images className='text-secondary-foreground'
                    size={14} />
                )}
            </Button>
        </div>
    </Card>
  )
}

export default Layers
import { useImageStore } from '@/lib/image-store'
import { Layer, useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import ImageComparison from './layers/image-comparison';

const ActiveImage = () => {
  
    const generating = useImageStore((state) => state.generating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const layers = useLayerStore((state) => state.layers);
    const comparisonMode = useLayerStore((state) => state.layerComparisonMode)
    const comparedLayers = useLayerStore((state) => state.comparedLayers);

    if(!activeLayer.url && comparedLayers.length === 0) return null;
    console.log(activeLayer);
    

    const renderLayer = (layer: Layer) => (
        <div className='relative w-full h-full flex items-center justify-center'>
            {layer.resourceType === "image" && (
                <Image
                src={layer.url || ""}
                alt={layer.name || " "}
                fill={true}
                className={cn("rounded-lg object-contain", generating? "animate-pulse": "")}
                />
            )}
                {layer.resourceType === "video" && (
                    <video src={layer.transcriptionURL || layer.url}
                        width={layer.width}
                        height={layer.width}
                        controls
                        className='rounded-lg object-contain max-h-full'
                    />
                )}
        </div>
    )

    if(comparisonMode && comparedLayers.length > 0) {
        console.log("In comparison mode");
        
        const comparisonLayers = comparedLayers
        .map((id) => layers.find((i) => i.id === id))
        .filter(Boolean) as Layer[];

        return (
            <div className="w-full h-full relative h-svh p-24 bg-secondary flex flex-col items-center justify-center">
                <ImageComparison layers={comparisonLayers}/>
            </div>
        )
    }

    return (
        <div className="w-full relative h-svh p-24 bg-secondary flex flex-col items-center justify-center">
            {renderLayer(activeLayer)}
        </div>
    )

}

export default ActiveImage
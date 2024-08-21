'use client'

import { Layer } from "@/lib/layerStore"
import Image from "next/image"

export default function LayerImage({layer}: {layer: Layer}){
    console.log(layer);
    
    if(layer.url)
        return <div className="h-12 flex items-center justify-center gap-3">
            <Image className="w-full object-contain h-full rounded-sm"
            alt={layer.name + "placeholder"}
            src={layer.format === "mp4" ? layer.poster || layer.url : layer.url} 
            width={50}
        height={50}
            />
            <div className="relative">
                <p className="text-xs w-16 break-all flex">
                    {`${layer.name?.slice(0, 15)}.${layer.format}`}
                </p>
            </div>
        </div>
}
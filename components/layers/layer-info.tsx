import { Layer, useLayerStore } from '@/lib/layerStore'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { EllipsisIcon, Trash2 } from 'lucide-react';

const LayerInfo = ({layer, layerIdex}: {layer: Layer, layerIdex: number}) => {

    const layers = useLayerStore((state) => state.layers);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    const removeLayer = useLayerStore((state) => state.removeLayer);

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'outline'}>
                <EllipsisIcon size={12}/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <h3 className='text-lg font-medium text-center mb-2'>
                Layer {layer.id}
            </h3>
            <div className="py-4 space-y-0.5">
                <p>
                    <span className="font-bold">Filename:</span> {layer.name}
                </p>
                <p>
                    <span className="font-bold">Format:</span> {layer.format}
                </p><p>
                    <span className="font-bold">Size:</span> {layer.width}x{layer.height}
                </p>
            </div>
            <Button className='flex gap-3' onClick={(e) => {
                e.stopPropagation(); // prevent
                setActiveLayer(layerIdex === 0 ? layers[1].id : layers[0].id)
                removeLayer(layer.id)
            }}>
                <span>Delete Layer</span>
                <Trash2 size={14}/>
            </Button>
        </DialogContent>
    </Dialog>
  )
}

export default LayerInfo
'use client'

import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layerStore';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import Lottie from 'lottie-react'
import catAnimation from '@/public/waitingCat.json'

const LoadingScreen = () => {
    
    const generating = useImageStore((state) => state.generating);
    const setGenerating = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <Dialog open={generating} onOpenChange={setGenerating}>
        <DialogContent className='sm:max-w-[420px] flex flex-col items-center'>
            <DialogHeader>
                <DialogTitle>
                    {activeLayer.name}
                </DialogTitle>
                <DialogDescription>
                    Please wait. This may take a few minutes.
                </DialogDescription>
            </DialogHeader>
            <Lottie className='w-36' animationData={catAnimation} />
        </DialogContent>
    </Dialog>
  )
}

export default LoadingScreen
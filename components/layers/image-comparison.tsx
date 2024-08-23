'use client';

import { Layer } from '@/lib/layerStore';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import React from 'react'

const ImageComparison = ({layers}: {layers: Layer[]}) => {
    if(layers.length === 0) {
        return <div className="">No Layers for comparison</div>
    }

    if(layers.length === 1) {
        return (
            <div>
                <ReactCompareSliderImage src={layers[0].url || "" }
                    srcSet={layers[0].url || ""}
                    alt={layers[0].name || ""}
                    className='object-contain'
                />
            </div>
        )
    }

    return(
        <ReactCompareSlider 
            itemOne={
                <ReactCompareSliderImage
                    src={layers[0].url || "" }
                    srcSet={layers[0].url || ""}
                    alt={layers[0].name || ""}
                />
            }
            itemTwo={
                <ReactCompareSliderImage
                    src={layers[1].url || "" }
                    srcSet={layers[1].url || ""}
                    alt={layers[1].name || ""}
                />
            }
        />
    )
}

export default ImageComparison
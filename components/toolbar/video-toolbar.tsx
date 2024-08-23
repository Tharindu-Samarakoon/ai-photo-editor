import { useLayerStore } from '@/lib/layerStore'
import React from 'react'
import VideoTranscription from './VideoTranscription';
import SmartCrop from './SmartCrop';

const VideoToolBar = () => {

    const activeLayer = useLayerStore((state) => state.activeLayer);

  if(activeLayer.resourceType === 'video')
  return (
    <>
      <VideoTranscription/>
      <SmartCrop />
    </>
  )
}

export default VideoToolBar
import React from 'react'
import UploadImage from './upload/uploadImage'
import Layers from './layers/layers'
import { ModeToggle } from '@/lib/modeToggle'
import ActiveImage from './ActiveImage'
import UploadForm from './upload/uploadForm'
import { useLayerStore } from '@/lib/layerStore'
import ImageToolbar from './toolbar/ImageToolbar'
import LoadingScreen from './LoadingScreen'
import VideoToolBar from './toolbar/video-toolbar'
import Export from './toolbar/Expot'

const Editor = () => {

  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <div className='flex w-full h-full'>
        <div className="py-6 px-4  min-w-48">
            <div className="pb-12 text-center">
                <ModeToggle/>
            </div>
            <div className="flex flex-col gap-4">
              {activeLayer.resourceType === 'image'&& <ImageToolbar/>}
              {activeLayer.resourceType === 'video'&& <VideoToolBar/>}
              <Export resource={activeLayer.resourceType!} />
            </div>
        </div>
        <LoadingScreen/>
        <UploadForm/>
        <ActiveImage/>
        <Layers/>
    </div>
  )
}

export default Editor
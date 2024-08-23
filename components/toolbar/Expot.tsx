import { useLayerStore } from '@/lib/layerStore'
import React, { useState } from 'react'

const Export = ({resource} : {resource: string}) => {

    const activeLayer = useLayerStore((state) => state.activeLayer);
    const [selected, setSelected] = useState("original");

  return (
    <div>Expot</div>
  )
}

export default Export
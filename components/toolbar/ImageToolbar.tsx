import React from 'react'
import GenerativeRemove from './GenerativeRemove'
import BgRemove from './BgRemove'
import BgReplace from './BgReplace'
import GenerativeFill from './GenerativeFill'
import ExtractPart from './ExtractPart'

const ImageToolbar = () => {
  return (
    <>
        <GenerativeRemove/>
        <BgRemove/>
        <BgReplace />
        <GenerativeFill />
        <ExtractPart />
    </>
  )
}

export default ImageToolbar
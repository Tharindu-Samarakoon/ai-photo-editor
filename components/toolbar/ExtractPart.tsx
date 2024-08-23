import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layerStore';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Eraser, ImageOff, ImageOffIcon, ScissorsIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { genRemove } from '@/server/GenRemove';
import { bgRemove } from '@/server/BgRemove';
import { bgReplace } from '@/server/BgReplace';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { extractParts } from '@/server/ExtractParts';

const ExtractPart = () => {

    const setGenerative = useImageStore((state) => state.setGenerating);
    const generating = useImageStore((state) => state.generating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const [multiple, setMultiple] = useState(false)
    const [prompt, setPrompt] = useState(['']);
    const [mode, setMode] = useState('default');
    const [invert, setInvert] = useState(false);

    const addPrompts = () => {
        setPrompt([...prompt, ""])
    }

    const updatePrompt = (index: number, value: string) => {
        const newPrompts = [...prompt];
        newPrompts[index] = value;
        setPrompt(newPrompts);
    }

  return (
    <Popover>
        <PopoverTrigger disabled={!activeLayer?.url} asChild>
            <Button variant={'outline'} className='p-8'>
                <span className='flex gap-1 items-center justify-center flex-col text-xs font-medium'>
                    AI Extract
                    <ScissorsIcon size={20} />
                </span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
            <div className="">
                <h3>Smart AI Extract</h3>
                <p>Extract objects or areas from image using AI</p>
            </div>
            <div className="grid gap-2">
                {prompt.map((prompt, index) => (
                    <div className="" key={index}>
                        <Label htmlFor={`prompt-${index}`}>Prompt {index + 1}</Label>
                        <Input
                            id={`prompt-${index}`}
                            value={prompt}
                            onChange={(e) => updatePrompt(index, e.target.value)}
                            placeholder="Describe what to extract"
                            className='col-span-2 h-8'
                        />
                    </div>
                ))}
                <Button onClick={addPrompts} size={'sm'}>
                    Add Prompt
                </Button>
                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id='multiple'
                        checked={multiple}
                        onCheckedChange={(checked) => setMultiple(checked as boolean)}
                    />
                    <Label htmlFor='multiple'>Extract Multiple Objects</Label>
                </div>
                <RadioGroup value={mode} onValueChange={setMode}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value='default' id='mode-default' />
                        <Label htmlFor='mode-default'>Default (BG transparent)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value='mask' id='mode-mask' />
                        <Label htmlFor='mode-mask'>
                            Mask
                        </Label>
                    </div>
                </RadioGroup>
                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id='invert'
                        checked={invert}
                        onCheckedChange={(checked) => setInvert(checked as boolean)}
                    />
                    <Label htmlFor='invert'>Invert (Keep the background)</Label>
                </div>
            </div>

            <Button className='w-full mt-4'
                disabled={!activeLayer?.url || generating}
                onClick={async () => {
                    const newLayerId = crypto.randomUUID();

                    setGenerative(true);
                    const res = await extractParts({
                        activeImage: activeLayer.url || "",
                        prompts: prompt.filter((p) => p.trim() !== ""),
                        format: activeLayer.format!,
                        mode: mode as 'default' || 'mask',
                        invert,
                        multiple,
                    });
                    if(res?.data?.success){
                        addLayer({
                            id: newLayerId,
                            url: res.data.success,
                            format: 'png',
                            height: activeLayer.height,
                            width: activeLayer.width,
                            name: 'Extracted' + activeLayer.name,
                            publicId: activeLayer.publicId,
                            resourceType: "image"
                        })
                        setActiveLayer(newLayerId);
                        setGenerative(false);
                    }

                    if (res?.serverError) {
                        setGenerative(false);
                    }

                }}
            >
                {generating? 'Extracting...' : 'AI Extract'}
            </Button>
        </PopoverContent>
    </Popover>
  )
}

export default ExtractPart
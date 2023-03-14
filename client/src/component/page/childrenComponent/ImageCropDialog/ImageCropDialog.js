import React, { useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./cropImage"
import './ImageCropDialog.css'
const aspectRatio = [
 {value: 4/3, text: "4/3"},
 {value: 16/9, text: "16/9"},
 {value: 1/2, text: "1/2"},       
]

export default (
    image,
    zoom = 1,
    crop = {x: 0, y:0},
    aspect = 2.63/1,
    onCropped=null
) => {
    const [_crop, setCrop] = useState({ x: 0, y: 0 })
  const [_zoom, setZoom] = useState(1)
    // const [_zoom, setZoom] = useState(zoom);
    // const [_crop, setCrop] = useState(crop);
    const [_aspect, setAspect] = useState(aspect);
    const [_croppedAreaPixels, setCroppedAreaPixels] = useState();
    
    const onCropChange = (crop) => {
        // console.log(crop)
        setCrop(crop);
    }
    
    const onZoomChange = (zoom) => {
        setZoom(zoom);
    }

    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatio.find(ratio => ratio.value == value);
        setAspect(ratio);
    }

    const onCropComplete = (_, croppedAreaPixels) => {
        
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const onCrop = async () => {
        const blob = sessionStorage.getItem("img")
        const new_blob = await getCroppedImg(blob, _croppedAreaPixels)

        
        console.log(blob)
        
        const new_file = new File([new_blob], "image", {type: "png/base64"})
        onCropped(new_file)
    }

    return (
 
        <div className="App">
            <div className="crop-container" >
                {
                    
                    <Cropper
                        image={sessionStorage.getItem("img")}
                        crop={_crop}
                        zoom={_zoom}
                        aspect={_aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropComplete}
                        onZoomChange={onZoomChange}
                        className=""
                    />
                }
            </div>
            <div className="row controls" >
                <input 
                    type="range" 
                    min={1} 
                    max={3} 
                    step={0.1} 
                    value={_zoom} 
                    onInput={(e) => onZoomChange(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                    <button > Cancle</button>
                    <button onClick={onCrop} type="button"> Crop </button>
                    <button > Reset </button>
                </div>
            </div>
        </div>
  
    )
}


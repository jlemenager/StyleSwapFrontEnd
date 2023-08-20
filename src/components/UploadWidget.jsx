import { useEffect, useRef } from 'react'

const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dikdtblpr',
            uploadPreset: 'image-upload'
        }, function(error,result){
            console.log(result)
        })
    }, [])
    return (
        <button onClick={(e)=>{
        e.preventDefault()
        widgetRef.current.open()}
        }>
        Upload
        </button>
    )
}

export default UploadWidget

import {v2 as cloudnary} from 'cloudinary'
const uploadimage = async (image) => {
    try {

        const result = await cloudnary.uploader.upload(image,{
            folder:"Blog App"
        })

        return result
        
    } catch (error) {

        console.log(error)
        
    }
}

export const deleteimage = async (imageId) =>{
    try {

        await cloudnary.uploader.destroy(imageId)
        
    } catch (error) {

        console.log(error)
        
    }
}

export default uploadimage
import {v2 as cloudnary} from 'cloudinary'

async function cloudnaryconfig() {

    try {
         await cloudnary.config({

        cloud_name:"dxqwwjoye",
        api_key:"192613165276675",
        api_secret:"dJ2pdwA-bBTR9lgcIYuc_8ngtJo"
    })

    console.log("cloudnary connected successfully")
    } catch (error) {

        console.log(error)

        console.log("cloudnary ma error xa ")
        
    }

   
    
}

export default cloudnaryconfig
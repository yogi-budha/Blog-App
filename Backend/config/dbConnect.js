import mongoose from "mongoose"


const dbConnect = async () => {

    try {

       await  mongoose.connect("mongodb://127.0.0.1:27017/Blog")

       console.log("db connected successfully")

        
    } catch (error) {

        console.log("error occurs while dbConnection")
        
    }

}

export default dbConnect
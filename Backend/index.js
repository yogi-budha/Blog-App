import express from 'express'
import userRoute from './routes/userRoute.js'
import dbConnect from './config/dbConnect.js'
import blogRoute from './routes/blogRoute.js'
import cors from 'cors'
import cloudnaryconfig from './config/cloudnaryconfig.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1",userRoute)
app.use("/api/v1",blogRoute)



app.listen(3000, () => {
    
    dbConnect()
    cloudnaryconfig()
    console.log('listening on port 3000')

})
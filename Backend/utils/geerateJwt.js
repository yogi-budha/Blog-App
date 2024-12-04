import jwt from 'jsonwebtoken'

 const generateJwtToken = async (payload) => {
    try {

        const token = await jwt.sign(payload,"secreatKey")

        return token
        
    } catch (error) {

        return "invalid token"
        
    }
}

const verifyJWT = async (token) => {
    try {

    const user =  await jwt.verify(token,"secreatKey")
  
        return user
    } catch (error) {

        return false
        
    }
}

const decodeJwt = async (token) => {
    try {
        
        const decode = await jwt.decode(token)
    
        return decode
    } catch (error) {

        return false
        
    }


}


export {generateJwtToken,verifyJWT,decodeJwt}
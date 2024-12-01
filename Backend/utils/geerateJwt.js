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
    await jwt.verify(token,"secreatKey")
        return true
    } catch (error) {

        return false
        
    }
}

const decodeJwt = async (token) => {
    try {

      const decode = await jwt.decode(token)
        
    } catch (error) {
        
    }
}


export {generateJwtToken,verifyJWT}
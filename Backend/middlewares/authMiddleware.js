import { decodeJwt, verifyJWT } from "../utils/geerateJwt.js";

const verify = async (req, res, next) => {

  try {
      const token = req.headers.authorization;

  const acttoken = token.split(" ")[1];
  if (!acttoken) {
    return res.status(400).json({ success: false, message: "please signin" });
  } try {
    const user = await verifyJWT(acttoken);


    if (!user) {
      return res.status(400).json({ success: false, message: "please signin" });
    }

    req.user = user;

    next();
  } catch (error) {
    
    return res.status(500).json({ success: false, message: "please signinasdf" });
  }
  } catch (error) {
    
    return res.status(500).json({ success: false, message: "please signinasdfggg" });
  }

 



 
};

export { verify };

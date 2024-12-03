import { decodeJwt, verifyJWT } from "../utils/geerateJwt.js";

const verify = async (req, res, next) => {
  const token = req.headers.authorization;

  const acttoken = token.split(" ")[1];

  console.log(acttoken);

  if (!acttoken) {
    return res.status(400).JSON({ success: false, message: "please signin" });
  }

  try {
    const user = await decodeJwt(JSON.parse(acttoken));

    if (!user) {
      return res.status(400).JSON({ success: false, message: "please signin" });
    }

    req.user = user;

    next();
  } catch (error) {}
};

export { verify };

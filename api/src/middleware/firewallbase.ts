import moment = require("moment");

const admin = require.main.require("firebase-admin");

export default function firewallbase(req, res, next) {
  const authorization = req.header("Authorization");
  // //  console.log(authorization);
  if (authorization) {
    let token = authorization.split(" ");
    admin
      .auth()
      .verifyIdToken(token[1])
      .then(decodedToken => {
        res.locals.uid = decodedToken.uid;
        console.log('Autorizado para', decodedToken.email)
        next();
      })
      .catch(err => {
        console.log("error", err.code);
        res.sendStatus(401);
      });
  } else {
    console.log("Authorization header is not found");
    res.sendStatus(405);
  }
}

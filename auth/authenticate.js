const jwt = require("jsonwebtoken"); // <<<<< bring in the library
const secrets = require("../secrets");

module.exports = (req, res, next) => {
  // get the token from Authorization header
  const token = req.headers.authorization; //////<<<<<<<<<

  // verify the token
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // invalid token
        res.status(401).json({ message: "you shall not pass!" });
      } else {
        //valid oken
        req.jwtToken = decodedToken; // makes the token available to the rest of the api. anything that runs after this middleware can use that value. we showed this example with the roles
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token provided" });
  }
};

// const jwt = require("jsonwebtoken");

// const jwtKey =
//   process.env.JWT_SECRET ||
//   "add a .env file to root of project with the JWT_SECRET variable";

// // quickly see what this file exports
// module.exports = {
//   authenticate
// };

// // implementation details
// function authenticate(req, res, next) {
//   const token = req.headers.authorization;
//   // const token = req.get("Authorization");

//   if (token) {
//     jwt.verify(token, jwtKey, (err, decoded) => {
//       if (err) return res.status(401).json(err);

//       req.decoded = decoded;

//       next();
//     });
//   } else {
//     return res.status(401).json({
//       error: "No token provided, must be set on the Authorization Header"
//     });
//   }
// }

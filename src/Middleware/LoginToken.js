const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // separar el encabezado para obtener el token

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    console.log("token valido"); // almacenar el usuario en la solicitud para su posterior uso en el controlador
    next(); // continuar con el siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verificarToken };

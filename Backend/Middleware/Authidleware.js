const JWT = require("jsonwebtoken");
const User = require("../Models/User");

const RequireSignIn = (req, res, next) => {
  try {
    // 1. Obtener el header de autorización
    const authHeader = req.headers.authorization;

    // 2. Verificar si el header existe y tiene el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Token no proporcionado o formato incorrecto",
      });
    }

    // 3. Extraer solo el token (remueve "Bearer ")
    const token = authHeader.split(" ")[1];

    // 4. Verificar el token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    // Maneja diferentes tipos de errores de JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Token inválido",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
      });
    }
    res.status(500).json({
      success: false,
      error: "Error de autenticación",
    });
  }
};

// Tu middleware IsAdmin está correcto
const IsAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado: se requieren privilegios de administrador",
      });
    }
  } catch (error) {
    console.error("Error en middleware isAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Error al verificar los privilegios de administrador",
    });
  }
};

module.exports = {
  RequireSignIn,
  IsAdmin,
};

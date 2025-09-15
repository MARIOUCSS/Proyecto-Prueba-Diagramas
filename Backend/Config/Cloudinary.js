const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dodftsbbg", // Reemplaza con tu cloud_name
  api_key: "614954984693416", // Reemplaza con tu api_key
  api_secret: "TF5qDjLBOJ_pLZG6pzX9IZJiBnw", // Reemplaza con tu api_secret
});

module.exports = cloudinary;

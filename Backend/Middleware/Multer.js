// // // middlewares/multer.js
// // const multer = require("multer");
// // const storage = multer.memoryStorage(); // importante para Cloudinary
// // const upload = multer({ storage });

// // module.exports = upload;
// // const multer = require("multer");
// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: 10 * 1024 * 1024 }, // Límite de 10MB (opcional)
// // });
// // module.exports = upload;
// const multer = require("multer");
// //const sharp = require("sharp");
// const path = require("path");
// //const { match } = require("assert");

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(__dirname);
//     cb(null, path.join(__dirname, "../public/images/products")); // Guardar localmente
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     ); // Mantener la extensión original
//   },
// });

// // {
// //   fieldname: 'images', // Nombre del campo del formulario
// //   originalname: 'image.jpg', // El nombre original del archivo en el sistema del cliente
// //   encoding: '7bit', // Codificación del archivo
// //   mimetype: 'image/jpeg', // Tipo MIME del archivo
// //   destination: '/uploads', // Carpeta de destino donde se guarda el archivo
// //   filename: '1633023938455-image.jpg', // Nombre del archivo en el servidor (con un nombre único)
// //   path: '/uploads/1633023938455-image.jpg', // Ruta completa del archivo guardado
// //   size: 1024, // Tamaño del archivo en bytes
// // }
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true); // Solo aceptar imágenes
//   } else {
//     cb(new Error("Archivo no es una imagen"), false);
//   }
// };

// const uploadPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 2000000 }, // Límite de 2MB
// });
// module.exports = { uploadPhoto };
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
module.exports = upload;

const DatauriParser = require("datauri/parser");
// {
//   originalname: "foto.png",  // Nombre original del archivo
//   buffer: <Buffer 89 50 4e ...>, // Datos binarios del archivo
//   mimetype: "image/png",     // Tipo de archivo
//   size: 1024                // Tamaño en bytes
// }
const path = require("path");
const bufferGenerator = (file) => {
  const parser = new DatauriParser();
  //Si file.originalname es "foto.png", extName será ".png".
  const extName = path.extname(file.originalname).toString(); // Extrae la extensión (.png, .jpg, etc.)
  return parser.format(extName, file.buffer); // Convierte el Buffer a Data URI
};
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
module.exports = { bufferGenerator };

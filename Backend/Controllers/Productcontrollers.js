const { bufferGenerator } = require("../Routes/BufferGenerator");
const Product = require("../Models/Product");
const cloudinary = require("../Config/Cloudinary");
//const cloudinary = require("cloudinary").v2;
//const { products } = require("../../../Proyectos de Empresas/ShopCommerce/Frontend/Commerce/src/assets/data");

// const CreateProduct = async (req, res) => {
//   console.log("Cuerpo de la petición:", req.body);
//   console.log("Archivos recibidos:", req.files);
//   const { title, description, category, price, stock } = req.body;
//   const files = req.files;
//   if (!files || files.length === 0) {
//     return res.status(400).send({
//       message: "no files to upload",
//     });
//   }
//   //ese async genera las promesas para que pueda ingresar al promise all atento
//   const imageuploadPromises = files.map(async (file) => {
//     const fileBuffer = bufferGenerator(file);
//     //aca se usa el await porque el cloudinary enviara al servidor y este espera la respuesta
//     const result = await cloudinary.uploader.upload(fileBuffer.content);
//     return {
//       id: result.public_id,
//       url: result.secure_url,
//     };
//   });
//   const uploadedImage = await Promise.all(imageuploadPromises);
//   console.log(uploadedImage);
//   const product = await Product.create({
//     title,
//     description,
//     category,
//     price,
//     stock,
//     Images: uploadedImage,
//   });
//   return res.status(200).send({
//     message: "Product registered successfully",
//     product,
//   });
// };
// const CreateProduct = async (req, res) => {
//   try {
//     console.log("Cuerpo de la petición:", req.body);
//     console.log("Archivos recibidos:", req.files);

//     const { title, description, category, price, stock } = req.body;
//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).send({ message: "no files to upload" });
//     }

//     const imageuploadPromises = files.map(async (file) => {
//       const fileBuffer = bufferGenerator(file);
//       const result = await cloudinary.uploader.upload(fileBuffer.content);
//       return {
//         id: result.public_id,
//         url: result.secure_url,
//       };
//     });

//     const uploadedImage = await Promise.all(imageuploadPromises);

//     const product = await Product.create({
//       title,
//       description,
//       category,
//       price,
//       stock,
//       Images: uploadedImage,
//     });

//     return res.status(200).send({
//       message: "Product registered successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("🔥 Error en CreateProduct:", error);
//     return res
//       .status(500)
//       .send({ message: "Error en el servidor", error: error.message });
//   }
// };
const CreateProduct = async (req, res) => {
  try {
    console.log("Cuerpo de la petición:", req.body);
    console.log("Archivos recibidos:", req.files);

    const { title, description, category, price, stock } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send({ message: "No se enviaron imágenes" });
    }

    const imageuploadPromises = files.map(async (file) => {
      const fileBuffer = bufferGenerator(file);
      const result = await cloudinary.uploader.upload(fileBuffer.content);
      console.log(result);
      return {
        id: result.public_id,
        url: result.secure_url,
      };
    });

    const uploadedImages = await Promise.all(imageuploadPromises);
    console.log(uploadedImages);
    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      Images: uploadedImages,
    });

    return res.status(200).send({
      message: "Producto creado correctamente",
      product,
    });
  } catch (error) {
    console.error("🔥 Error en CreateProduct:", error);
    return res
      .status(500)
      .send({ message: "Error del servidor", error: error.message });
  }
};
const GetAllProducts = async (req, res) => {
  try {
    const { search, category, page, sortByPrice } = req.query;
    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (category) {
      filter.category = category;
    }

    const limit = 8;
    const skip = (page - 1) * limit;
    let sortOption = { createdAt: -1 };

    if (sortByPrice) {
      if (sortByPrice === "lowToHigh") {
        sortOption = { price: 1 };
      } else if (sortByPrice === "highToLow") {
        sortOption = { price: -1 };
      }
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(limit)
      .skip(skip);

    const categories = await Product.distinct("category");
    const newProduct = await Product.find().sort("-createdAt").limit(4);
    const countProduct = await Product.countDocuments();
    const totalPages = Math.ceil(countProduct / limit);

    // res.json({ totalPages, products, categories, countProduct, newProduct });
    return res.status(200).send({
      message: "Producto obtenido correctamente",
      totalPages,
      products,
      categories,
      countProduct,
      newProduct,
    });
  } catch (error) {
    console.error("Error in GetAllProducts:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};
const GetSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); //{}
    const relatedPro = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);
    return res.status(200).send({
      product,
      relatedPro,
    });
  } catch (error) {
    console.error("Error in GetSingleProduct:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const { title, about, category, price, stock } = req.body;
    const UpdateFields = {};
    if (title) UpdateFields.title = title;
    if (about) UpdateFields.about = about;
    if (category) UpdateFields.category = category;
    if (price) UpdateFields.price = price;
    if (stock) UpdateFields.stock = stock;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      UpdateFields,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    return res.status(200).send({
      updatedProduct,
      message: "Product Updated",
    });
  } catch (error) {
    console.error("Error in UpdateProduct:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};
const UpdateProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send({
        message: "No files to upload",
      });
    }
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    //Si hay imagenes devuelve en todo caso devuelve un array vacio
    const Imagesold = product.Images || [];
    for (const img of Imagesold) {
      if (img.id) {
        // await cloudinary.uploader.upload(fileBuffer.content);
        // await cloudinary.v2.uploader.destroy(img.id);
        await cloudinary.uploader.destroy(img.id);
      }
    }
    const imageuploadPromises = files.map(async (file) => {
      const fileBuffer = bufferGenerator(file);
      const result = await cloudinary.uploader.upload(fileBuffer.content);
      console.log(result);
      return {
        id: result.public_id,
        url: result.secure_url,
      };
    });

    const uploadedImages = await Promise.all(imageuploadPromises);
    product.Images = uploadedImages;
    await product.save();
    return res.status(200).send({
      message: "Image update",
      product,
    });
  } catch (error) {
    console.error("Error in UpdateProductImage:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// const Updatestock = async (req, res) => {
//   try {
//     // const stockRules = {
//     //   APPLE: 45,
//     //   LENOVO: 30,
//     //   ASUS: 20,
//     //   HP: 22,
//     //   ACER: 34,
//     //   DEFAULT: 10,
//     // };

//     // const Productstotal = await Product.find({ stock: { $exists: false } });

//     const Productstotal = await Product.find({});
//     for (const So of Productstotal) {
//       if (So.title === "SAMSUNG") {
//         So.stock = 80;
//         await So.save();
//       }
//       // So.stock = stockRules[So.title] || stockRules.DEFAULT;
//     }
//     console.log(Productstotal);
//   } catch (error) {}
// };
//Updatestock();
module.exports = {
  CreateProduct,
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  UpdateProductImage,
};

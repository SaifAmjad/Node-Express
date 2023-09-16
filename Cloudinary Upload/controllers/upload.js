const { BadRequest } = require("../errors/customError");
const cloudinary = require("cloudinary").v2;
const fs=require('fs')

const uploadLocal = (req, res, next) => {
  const image = req.files.image;
  if (!req.files) {
    next(new BadRequest("Please insert file"));
  }

  if (!image.mimetype.startsWith("image")) {
    next(new BadRequest("Image required only"));
  }
  console.log(image);
  // const dir=__dirname;
  // const split=dir.split("\\");
  // const joinDir=split[0]+"\\"+split[1]+"\\"+split[2]+"\\"+split[3]+"\\"+split[4]+"\\"+split[5]+"\\"+split[6];

  // image.mv(joinDir+'/uploads/'+image.name);

  res.redirect("/");
};

const uploadCloud = async (req, res) => {

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "img-Cloud" }
  );
  
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(200).json({img:result.secure_url});

};

module.exports = {uploadLocal,uploadCloud};

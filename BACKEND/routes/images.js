const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

//Configuración lugar de carga y nombre.
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename:  (req, file, cb) => {
        cb(null, uuid()+file.originalname);
    }
})

//Configuración limites, y filtros. 
const uploadImg = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter:function (req,file,cb){
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('img');

module.exports = { 
    sendImg: (req, res) => {
        uploadImg(req, res, (err) => {
            if (err) {      
                return  res.json({status:0, message: err});
            }
            res.status(201).json({status:1,message: req.file});
        });
    }
    
}
const {errorHandler} = require("../helpers/dbErrorHandler");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require('fs')
const Product = require("../models/product")

const create = (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                status: 'error',
                message: 'Image could not be uploaded'
            })
        }

        let product = new Product(fields);

        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    status: 'error',
                    message: errorHandler(err)
                })
            }

            res.json(result)
        })

    })
}

module.exports = {
    create
}

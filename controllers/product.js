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
        const {name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                status: 'error',
                message: 'All Fields are required'
            })
        }
        let product = new Product(fields);

        if(files.photo) {
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    status: 'error',
                    message: 'Image should be less than 1 MB'
                })
            }
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

const read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

const remove = (req, res) => {
     let product = req.product
     product.deleteOne((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                status: 'error',
                message: errorHandler(err)
            })
        }
        res.json({
            status: "success",
            message: "Product Deleted Successfully",
            product: deletedProduct
        })
    })
}

const update = (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                status: 'error',
                message: 'Image could not be uploaded'
            })
        }

        let product = req.product
        product = _.extend(product, fields)

        if(files.photo) {
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    status: 'error',
                    message: 'Image should be less than 1 MB'
                })
            }
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
    create,
    read,
    remove,
    update
}

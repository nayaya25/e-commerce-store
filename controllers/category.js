const Category = require("../models/category")
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash")

const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ status: 'error', message:  errorHandler(err) })
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    })
}

const read = (req, res) => {
    return res.json(req.category)
}

const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({ status: 'error', message:  errorHandler(err) })
        }

        res.status(200).json({
            status: 'success',
            data: data
        })
    })
}

const remove = (req, res) => {
    const category = req.category;
    category.deleteOne((err, data) => {
        if (err) {
            return res.status(400).json({ status: 'error', message:  errorHandler(err) })
        }

        res.status(200).json({
            status: 'success',
            message: 'Category Deleted Successfully',
            category: data
        })
    })
}
const list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                status: 'error',
                message: errorHandler(err)
            })
        }
        res.json(data)
    })
}



module.exports = {
    create,
    read,
    update,
    remove,
    list
}

const Category = require("../models/category")
const { errorHandler } = require("../helpers/dbErrorHandler");

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

module.exports = {
    create
}

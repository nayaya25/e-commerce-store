const userSignupValidator = (req, res, next) => {
    console.log("Hey")
    req.check("name", "Name is required").notEmpty()
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\../)
        .withMessage("Email must contain '@'")
        .isLength({
            min: 4,
            max: 32
        })
    req.check('password', 'Password is required').notEmpty()
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();

    if (errors) {
        console.log(errors)
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({
            status: 'error',
            message: firstError
        })
    }

    next(); 
}

const userSigninValidator = (req, res, next) => {
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\../)
        .withMessage("Email must contain '@'")
        .isLength({
            min: 7,
            max: 32
        })
    
    req.check('password', 'Password is required').notEmpty()
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        // .matches(/\d/)
        // .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({
            status: "error",
            message: firstError,
        })
    }

    next(); 
}

const categoryCreateValidation = (req, res, next) => {
    req.check("name", "Category name is required").notEmpty()
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({
            status: "error",
            message: firstError,
        })
    }

    next();
}


module.exports = {
    userSigninValidator,
    userSignupValidator,
    categoryCreateValidation,
}

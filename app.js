const express = require("express")
const app = express()

const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan") 
const expressValidator = require("express-validator");
require("dotenv").config()

// Mongo Config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Database Connected"))
// Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

// MiddleWares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(expressValidator())

// Route Handlers
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

app.get('/', (req, res) => {
    res.send("Hello Duniya") 
}) 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Started at Port: ${port}`)
})


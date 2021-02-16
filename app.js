const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const helmet = require('helmet')
const hpp = require('hpp')
require('dotenv').config()
const userRouter = require('./routes/userRouter')
const sellerRouter = require("./routes/sellerRouter")
const categoryRouter = require("./routes/categoryRouter")
const medicineRouter = require("./routes/medicineRouter")
const stripe = require("stripe")("sk_test_51H8fgDEorapUb2K4BbzMF1YVtGOPRQ1QTB7HPZxvlpAA8UCv8ahsf1D0X7oQFKb00c59HoVHt0BRz5uCLNRhzQ6U00Qlna7ON8")
const { v4: uuidv4 } = require('uuid');


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


app.use(hpp())
app.use(helmet())

app.get('/', (req, res) => {
    res.status(200).send("Health check")
})


app.use('/buyer', userRouter)
app.use("/seller", sellerRouter)
app.use("/category", categoryRouter)
app.use("/medicine", medicineRouter)
app.post("/payment", (req, res) => {
    const { product, token } = req.body
    console.log(product)
    console.log(product.price)
    const idempotencyKey = uuidv4()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: `${product.name}`
        }, { idempotencyKey })
    }).then(result => res.status(200).json(result)).catch(err => console.log(err))
})


app.use(function (req, res) {
    res.status(404).json({ success: false, message: "This API endpoint does not exist!" });
});


module.exports = app
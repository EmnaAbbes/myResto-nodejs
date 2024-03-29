const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("aaslema")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});
const categoryRouter = require("./routes/category.route")
app.use('/api/categories', categoryRouter)
const productRouter = require("./routes/product.route")
app.use('/api/products', productRouter)
const userRouter =require("./routes/user.route")
app.use('/api/users', userRouter); 
const paymentRouter = require("./routes/payment.route.js");
app.use('/api/payment', paymentRouter);

module.exports = app



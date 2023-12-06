const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require('./routes/Contacts'));
app.use('/api/users',require('./routes/Users'));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server runningg on port ${port}`);
})  
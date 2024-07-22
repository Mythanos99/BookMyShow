const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
require("./db/mongoose");
const userRouter = require("./routers/user");

app.use(express.json());
app.use(userRouter);


const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));



cloudinary.url("sample.jpg", {width: 100, height: 150, crop: "fill"})





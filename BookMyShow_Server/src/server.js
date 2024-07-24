const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
require("./db/mongoose");
const cors = require('cors');

const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
app.use(cors({
    // origin: 'http://localhost:4200',   #FIXME: Change this to the frontend URL when deploying
    origin: '*',
    optionsSuccessStatus: 200 
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user',userRouter);
app.use('/login',authRouter);


const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));







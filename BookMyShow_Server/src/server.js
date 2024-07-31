const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
require("./db/mongoose");
const cors = require('cors');

const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const movieRouter = require("./routers/movies");
const cinemaRouter = require("./routers/cinema");
const showRouter = require("./routers/show");
const search_controller = require("./controllers/search");

app.use(cors({
    // origin: 'http://localhost:4200',   #FIXME: Change this to the frontend URL when deploying
    origin: '*',
    optionsSuccessStatus: 200, 
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouter);
app.use('/login', authRouter);
app.use('/movies', movieRouter);
app.use('/cinemas', cinemaRouter);
app.use("/shows", showRouter); 
app.get("/search", search_controller.getSearchResult); // Use app.get instead of router.

const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));
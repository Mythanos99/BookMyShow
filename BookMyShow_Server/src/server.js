const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require("./db/mongoose");
require('./cronjob');

const cors = require('cors');

const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const movieRouter = require("./routers/movies");
const cinemaRouter = require("./routers/cinema");
const showRouter = require("./routers/show");
const bookingRouter = require("./routers/booking");
const eventRouter = require("./routers/event");
const businessRouter = require("./routers/business.js");
const unifiedShowsRouter = require("./routers/unifiedShows")
const search_controller = require("./controllers/search");
const ratingRouter = require("./routers/rating");
app.use(cors({
    origin: 'http://localhost:4200',   //#FIXME: Change this to the frontend URL when deploying
    optionsSuccessStatus: 200, 
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouter);
app.use('/business', businessRouter);
app.use('/login', authRouter);
app.use('/movies', movieRouter);
app.use('/cinemas', cinemaRouter);
app.use("/shows", showRouter); 
app.use("/booking",bookingRouter);
app.get("/search", search_controller.getSearchResult); 
app.use("/events", eventRouter);
app.use("/unifiedShows", unifiedShowsRouter)
app.use("/rating",ratingRouter);


const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));



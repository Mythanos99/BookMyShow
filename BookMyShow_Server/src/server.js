const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

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
const sportRouter = require("./routers/sport");
const playRouter = require("./routers/play");
const activityRouter = require("./routers/activity");
const unifiedShowsRouter = require("./routers/unifiedShows")
const search_controller = require("./controllers/search");
const rating_controller = require("./controllers/rating");
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
app.use("/booking",bookingRouter);
app.get("/search", search_controller.getSearchResult); 
app.use("/events", eventRouter);
app.use("/sports", sportRouter);
app.use("/plays", playRouter);
app.use("/activities", activityRouter);
app.use("/unifiedShows", unifiedShowsRouter)
app.post("/add-rating",rating_controller.addRating);



const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));

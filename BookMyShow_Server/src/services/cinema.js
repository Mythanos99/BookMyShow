const Cinema = require("../models/cinema");

async function getAllByCity(city) {
    try {
        const cinema = await Cinema.find({ city: { $regex: new RegExp(city, "i") } });
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

async function getAll() {
    try {
        const cinema = await Cinema.find({});
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

module.exports = { getAllByCity,getAll };
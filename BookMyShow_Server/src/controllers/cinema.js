const cinema_service = require('../services/cinema');

async function getAllcinemasByCity(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const city = req.params.city;
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    try {
        const cinemas = await cinema_service.getAllByCity(city, page, limit);
        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch cinemas" });
    }
}
async function getAllcinemas(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const cinemas = await cinema_service.getAll();
        res.status(200).json(cinemas);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch cinemas" });
    }
}

async function getShowsByCinema(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const cinemaId = req.params.cinemaId;
    try {
        const shows = await cinema_service.getShowsByCinemaGrouped(cinemaId);
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch shows" });
    }
}

async function getCinemaDetails(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const cinemaId = req.params.cinemaId;
    try {
        const cinema = await cinema_service.getCinemaDetails(cinemaId);
        res.status(200).json(cinema);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch cinema details" });
    }
}

module.exports = { getAllcinemasByCity , getAllcinemas,getShowsByCinema,getCinemaDetails};
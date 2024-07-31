const cinema_service = require('../services/cinema');

async function getAllcinemasByCity(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const city = req.params.city;
    try {
        const cinemas = await cinema_service.getAllByCity(city);
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



module.exports = { getAllcinemasByCity , getAllcinemas};
const show_service = require('../services/show');

async function getShowByMovieId(req,res){
    try {
        const id = req.params.id;
        const format=req.query.format;
        const location=req.query.location
        const shows = await show_service.getAvailableShowsByFormat(id,format,location);
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={getShowByMovieId};
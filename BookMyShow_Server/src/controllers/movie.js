const movie_service = require('../services/movie');

async function getAllMovies(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const movies = await movie_service.getAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch Movies" });
    }
}
async function getMoviesBySearch(req,res){
    res.setHeader('Content-Type', 'application/json');
    const search=req.params.search;
    try{
        const movies=await movie_service.getBySearch(search);
        res.status(200).json(movies);
    }catch(error){
        res.status(500).json({message:"Internal Server Error. Could not fetch Movies"});
    }
}

module.exports = { getAllMovies,getMoviesBySearch };
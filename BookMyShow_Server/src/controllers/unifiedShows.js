const unifiedShows_Service = require("../services/unifiedShows");
async function getUnifiedShowsById(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const unifiedShows = await unifiedShows_Service.getById(req.params.id);
        res.status(200).send(unifiedShows);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getUnifiedShowsByEventId(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const unifiedShows = await unifiedShows_Service.getByEventId(req.params.id);
        res.status(200).send(unifiedShows);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports={getUnifiedShowsById,getUnifiedShowsByEventId};
const search_service = require('../services/search');

async function getSearchResult(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const search=req.query.search;
        const city=req.query.city;
        const result=await search_service.getResults(search,city);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Internal Server Error. Could not fetch Search Results"});
    }
}

module.exports={getSearchResult};
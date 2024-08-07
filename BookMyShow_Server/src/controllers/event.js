const event_service = require('../services/event');

async function getFilteredEvents(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const filters=req.query;
        // console.log(filters);
        const events = await event_service.getfiltered(filters);
        res.status(200).send(events);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getEventById(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const event = await event_service.getById(req.params.id);
        res.status(200).send(event);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports={getFilteredEvents,getEventById};
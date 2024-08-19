const business_service=require('../services/business');
const utils = require('../utils/utils'); 
async function addBusiness(req,res){
    const {username,name,password}=req.body;

    try{
        const hash = await utils.hashPassword(password);
        const newBusiness = {
            username: username,
            name: name,
            password: hash};
        const business=await business_service.add(newBusiness);
        res.status(200).json(business);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getAccess(req,res){
    try{
        const id=req.params.id;
        const access=await business_service.getAccess(id);
        res.status(200).json(access);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function reapplyForAccess(req,res){
    try{
        const id=req.params.id;
        const access=await business_service.reapplyAccess(id);
        res.status(200).json(access);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function updateAccess(req,res){
    try{
        const id=req.params.id;
        const access=req.body;
        const status=await business_service.updateAccess(id,access);
        res.status(200).json(status);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getAllBusinesses(req,res){
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const businesses=await business_service.getAll(page,limit);
        res.status(200).json(businesses);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getBusinessByid(req,res){
    try{
        const id=req.params.id;
        const business=await business_service.getById(id);
        res.status(200).json(business);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function updateBusiness(req,res){
    try{
        const id=req.params.id;
        const business=req.body;
        const status=await business_service.update(id,business);
        res.status(200).json(status);
    }   catch(error){
        res.status(500).json({ message: error.message });
    }
}
module.exports = { addBusiness,getAccess,reapplyForAccess,updateAccess,getAllBusinesses,getBusinessByid,updateBusiness};
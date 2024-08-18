const Business = require('../models/business');
async function add(businessData){
    try{
        const business = await Business.create(businessData);
        return business;
    } catch(error){
        throw new Error("Error creating business");
    }
}

async function getAccess(id){
    try{
        const access = await Business.findById(id,{access:1});
        return access;
    } catch(error){
        throw new Error("Error fetching access");
    }
}

async function reapplyAccess(id){
    try{
        const access = await Business.findByIdAndUpdate({_id:id},{accessRequired:true},{new:true});
        return access;
    }
    catch(error){
        throw new Error("Error reapplying for access");
    }   
}
async function updateAccess(id,access){
    try{
        const status = await Business.findByIdAndUpdate({_id:id},{access:access,accessRequired:false},{new:true});
        return status;
    }
    catch(error){
        throw new Error("Error updating access");
    }
}

async function getAll(page,limit){
    try{
        const businesses = await Business.find({accessRequired:true},{_id:1,name:1,username:1,access:1}).skip((page-1)*limit).limit(limit);
        return businesses;
    } catch(error){
        throw new Error("Error fetching businesses");
    }
}
module.exports={add,getAccess,reapplyAccess,updateAccess,getAll};
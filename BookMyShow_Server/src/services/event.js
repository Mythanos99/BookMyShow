const Event=require('../models/event');
const { getDayGroupInfo } = require('../utils/utils');
async function getfiltered(filters) {
    const query = {};
    const today = new Date();
    if (filters.languages) {
        query.languages = { $in: filters.languages.split("|") }; // Ensure valid date format
    }
    
    if (filters.location) {
        query.city = filters.location; // Filter by city
    }
    
    if (filters.category) {
        query.category = { $in: filters.category.split("|") }; // Filter by category
    }
    if(filters.DateGroup){
        const dayGroupFilter = getDayGroupInfo(filters.DateGroup);
        if (dayGroupFilter) {
            query.time = dayGroupFilter;
        }

    }
    console.log(query);
    // #TODO- check where should the position of the try catch block be placed
    try {
        const events = await Event.find(query,{name:1,interested:1,ticketInfo:1,city:1,location:1,languages:1,date:1,time:1,duration:1}).sort({date:1});
        // console.log(events);
        return events;
    } catch (error) {
        console.error("Error fetching filtered events:", error);
        throw error;
    }
}

async function getById(id) {
    try {
        console.log(id);
        const event = await Event.findById(id);
        return event;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}

async function getTicketInfo(id) {
    try {
        const event = await Event.findById(id, { ticketInfo: 1 ,_id:0});
        return event;
    } catch (error) {
        console.error("Error fetching ticket info for event:", error);
        throw error;
    }
}

async function add(new_event){
    try{
        if (typeof new_event.ticketInfo === 'string') {
            new_event.ticketInfo = JSON.parse(new_event.ticketInfo);
        }
        const newEvent = new Event(new_event);
        await newEvent.save();
        return newEvent;
      } catch (error) {
        console.log(error)
        throw new Error("Error adding Event");
      }
}

module.exports = { getfiltered ,getById,getTicketInfo,add};

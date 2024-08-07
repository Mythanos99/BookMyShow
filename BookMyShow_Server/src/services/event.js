const UnifiedShow = require('../models/unifiedShows');
const Event=require('../models/event');
const { getDayGroupInfo } = require('../utils/utils');
async function getfiltered(filters) {
    const query = {};
    const today = new Date();
    query.identity = "EVE";
    // console.log(filters);
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
    // console.log(query);
    // #TODO- check where should the position of the try catch block be placed
    try {
        const events = await UnifiedShow.find(query);
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

module.exports = { getfiltered ,getById};

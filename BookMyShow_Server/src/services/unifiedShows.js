const UnifiedShow = require("../models/unifiedShows");

async function getById(id) {
    try {
        const event = await UnifiedShow.findById(id);
        return event;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}

async function getByEventId(eventId) {
    try {
        const event = await UnifiedShow.findOne({ eventId:eventId });
        return event;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}
module.exports = { getById,getByEventId };
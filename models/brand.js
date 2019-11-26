var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema ({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Brand", ProductSchema);
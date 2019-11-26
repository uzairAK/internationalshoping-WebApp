var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema ({
    name: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'Other'
    },
    category: {
        type: String,
        default: 'Other'
    },
    status: {
        type: String,
        default: 'In-Stock'
    },
    price: {
        type: Number,
        default: '0'
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProductSchema);
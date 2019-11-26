var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema ({
    name: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    info: {
        type: String,
        default: 'Pending'
    },
    quantity: {
        type: Number,
        default: '1'
    },
    status: {
        type: String,
        default: 'Approval Pending'
    },
    price: {
        type: Number,
        default: '0'
    },
    payer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Order", ProductSchema);
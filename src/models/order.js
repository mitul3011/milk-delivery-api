const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    milkType: {
        type: String,
        required: true,
        trim: true,
        default: "Buffalo Milk"
    },
    milkQuantity: {
        type: String,
        required: true,
        trim: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
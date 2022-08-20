const express = require('express');
require('./db/mongoose');
const Order = require('./models/order');
const validateOrderData = require('./validateOrderData');
const generateError = require('./generateError');
const validator = require('validator');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/api/fetchorders', async (req, res) => {
    try {
        if(req.body.date !== '' && req.body.date !== undefined){
            if(!validator.isDate(req.body.date, { delimiters: ['/', '-'] }))
                throw generateError('Input date is invalid or enter date in format YYYY-MM-DD or YYYY/MM/DD.', 400);
        }else if(req.body.date === '')
            throw generateError('Enter Date in request body.', 400);

        const orders = await Order.find({ deliveryDate: req.body.date });
        res.send(orders);
    } catch (error) {
        res.status(error.status || 500).send({ 'error': error.message });
    }
});

app.post('/api/createorder', async (req, res) => {
    try {
        const orderBody = validateOrderData(req.body);
        const order = new Order(orderBody);

        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(error.status || 500).send({ 'error': error.message });
    }
});

app.put('/api/editorder/:id', async (req, res) => {
    const id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'phone_number', 'milkType', 'milkQuantity', 'deliveryDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const order = await Order.findById(id);

        if(!order){
            throw generateError('Enter valid order id.', 404);
        }

        const orderBody = validateOrderData(req.body);

        updates.forEach((update) => order[update] = orderBody[update]);
        await order.save();
        res.send(order);
    } catch (error) {
        res.status(error.status || 500).send({ 'error': error.message });
    }
});

app.delete('/api/deleteorder/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);

        if(!order){
            throw generateError('Enter valid order id.', 404);
        }

        await order.remove();
        res.send({ 'Message': 'Order successfully deleted.' });
    } catch (error) {
        res.status(error.status || 500).send({ 'error': error.message });
    }
});

app.listen(port, () => {
    console.log('Server is up on port', port);
});
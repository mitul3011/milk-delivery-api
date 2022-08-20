const validator = require('validator');
const generateError = require('./generateError');

const validateOrderData = (data) => {
    const order = {};

    if(data.name !== '' && data.name !== undefined){
        if(!data.name.match(/^[a-zA-Z ]+$/))
            throw generateError('Name entered is not valid.', 400);

        order.name = data.name;
    }

    if(data.address !== '' && data.address !== undefined){
        if(!data.address.match(/^[a-zA-Z0-9\/\s.,'-]*$/))
            throw generateError('Address entered is not valid.', 400);

        order.address = data.address;
    }

    if(data.phone_number !== '' && data.phone_number !== undefined){
        if(!validator.isMobilePhone(data.phone_number) || data.phone_number.length > 10)
            throw generateError('Enter valid phone number.', 400);

        order.phone_number = data.phone_number;
    }

    if(data.milkType !== '' && data.milkType !== undefined){
        if(data.milkType === 'Cow Milk' || data.milkType === 'Buffalo Milk')
            order.milkType = data.milkType;
        else
            throw generateError('Milk type cannot be other than Cow Milk or Buffalo Milk.', 400);
    }

    if(data.deliveryDate !== '' && data.deliveryDate !== undefined){
        if(!validator.isDate(data.deliveryDate, { delimiters: ['/', '-'] }))
            throw generateError('Delivery date is invalid or enter date in format YYYY-MM-DD or YYYY/MM/DD.', 400);

        order.deliveryDate = data.deliveryDate;
    }

    if(data.milkQuantity !== '' && data.milkQuantity !== undefined){
        order.milkQuantity = data.milkQuantity;
    }

    return order;
};

module.exports = validateOrderData;
# milk-delivery-api
This API is created using Node.JS, Express.JS as framework and MongoDB is used as database.

This collection contains following requests,
* Create Order - POST request
* Fetch Orders By Date - GET request
* Edit Order By ID - PUT request
* Delete Order By ID - DELETE request

### 1. Create Order - POST request
* `localhost:3000/api/createorder`, API Endpoint to place milk order.
* Payload to be provoded,  ` name, address, phone_number, milkType(Cow or Buffalo Milk), milkQuantity, deliveryDate `.
* A Successful order will result in a `HTTP 201` Status code.
* If invalid data provided in the payload then it will result in `HTTP 400` Status code and error message.

### 2. Fetch Orders By Date - GET request
* `localhost:3000/api/createorder`, API Endpoint to fetch milk orders to be delivered on provided date.
* Payload to be provoded,  ` date `.
* A Successful request will result in a `HTTP 200` Status code with milk orders on given date.
* If invalid data provided in the payload then it will result in `HTTP 400` Status code and error message.

### 3. Edit Order By ID - PUT request
* `localhost:3000/api/editorder/orderID`, API Endpoint to edit milk order.
* Payload to be provoded,  ` name, address, phone_number, milkType(Cow or Buffalo Milk), milkQuantity, deliveryDate `.
* A Successful edit will result in a `HTTP 200` Status code.
* If invalid data provided in the payload then it will result in `HTTP 400` Status code and error message.
* If invalid orderID provided in the URL then it will result in `HTTP 404` Status code and error message.

### 4. Delete Order By ID - DELETE request
* `localhost:3000/api/deleteorder/orderID`, API Endpoint to delete milk order.
* A Successful request will result in a `HTTP 200` Status code.
* If invalid orderID provided in the URL then it will result in `HTTP 404` Status code and error message.


**Setup project by following given steps,**
1. Open Git Bash and set working directory path and run `git clone https://github.com/mitul3011/milk-delivery-api.git` command.
2. Start MongoDB server.
3. Change MONGODB_URL in `dev.env` file inside `config` folder.
4. Open terminal and set current working directory path and run `npm i` command.
5. Start server by running `npm run start` command.

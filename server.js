const express = require('express');
const app = express();

// middlewares
app.use(express.json({ extended: false }));

// connection
const mongoose = require('mongoose');
const dbConfig = 'mongodb://localhost:27017';
const dbName   = 'dbcom';
mongoose.connect(`${dbConfig}/${dbName}`, 
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err) => { 
        if(err) throw err;
        console.log('connected');
    }
)

// router
const usersRoutes = require('./routes/Users')
app.use("/users", usersRoutes);
const productsRoutes = require('./routes/items')
app.use("/items", productsRoutes);
const get_order_by_cus = require('./routes/get-order-by-cus')
app.use("/get-order-by-cus", get_order_by_cus);
const get_user_orders = require('./routes/get-user-orders')
app.use("/get-user-orders", get_user_orders);
const get_order_by_date = require('./routes/get-order-by-date')
app.use("/get-order-by-date", get_order_by_date);


const port = 5000;
app.listen(port, function(){
    console.log("API start in port :", port);
});
var Order = mongoose.model('order');

router.get('/get-user-orders/', function (req, res, next) {

    Order.find({'order._id': orderID}, function(err, orders){
        if (err){ return err }

        res.json(orders);
    });

});
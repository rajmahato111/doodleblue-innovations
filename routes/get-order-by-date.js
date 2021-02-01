var Order = mongoose.model('Order');

router.get('/get-orders-by-date/', function (req, res, next) {

    Order.find({'Order.date': req.params.date}, function(err, orders){
        if (err){ return err }
else{
    res.json(orders);
}
    });

});
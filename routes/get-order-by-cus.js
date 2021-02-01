var Order = mongoose.model('Order');
var Users = mongoose.model('Users')
router.get('/get-number-of-product-orders/', function (req, res, next) {



    Users.find({'orderStatus':'confirm'}, function(err, Users){
        if (err){ return err }

        res.json(Users);
    });

});
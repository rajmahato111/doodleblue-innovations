var Order = mongoose.model('Orders');
var OrderItem = mongoose.model('OrderItem');

router.put('/update-Order/', function (req, res, next) {

    var OrderID = req.cookies['user.id'] || req.cookies['connect.sid'];
    console.log("Body: ", req.body, '\n');

    function findById(source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i].id === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    }

    Order.findById(OrderID)
        .populate('items')
        .exec(function (err, Order) {
            if (err) { return next(err) }

            req.body.items.forEach(function (item){
                var OrderItem = findById(Order.items, item._id);
                OrderItem.qty = item.qty;
            });


            Order.total = 0;
            Order.itemsCount = 0;
            
            Order.items.forEach(function(item){
                item.total = item.price * item.qty;
                Order.total += item.total;
                Order.itemsCount += item.qty;
            });


            Order.update({_id: OrderID}, Order, {upsert: true}, function(err, response){
                if(err){ return next(err); }

                    console.log("Updated Order: ", Order);
                    res.status(200).json(Order);
            });

        });

});
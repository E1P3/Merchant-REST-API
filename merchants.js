var express = require('express');
var haversine = require('./haversine.js')
var router = express.Router();

//TODO  -add match to check for number
//      -redo dist func

var merchants = [
    {latitude: 53.392284, longitude: -6.192228, merchantId: 1, merchantName: "Leisureplex"},
    {latitude: 53.402021, longitude: -6.179897, merchantId: 2, merchantName: "Clarehall"},
    {latitude: 53.345634, longitude: -6.260222, merchantId: 3, merchantName: "Tesco"},
    {latitude: 53.371563, longitude: -6.206934, merchantId: 4, merchantName: "Supervalu Killester"}
];

module.exports = router;

router.get('/', function(req, res){
    res.json(merchants);
});

router.get('/:id([0-9]{1,})', function(req, res){
    var currMerchant = merchants.filter(function(merchants){
        if(merchants.merchantId == req.params.id){
            return true;
        }
    });
    if(currMerchant.length == 1){
        res.json(currMerchant[0])
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
});

router.get('/:latitude/:longitude/', function(req, res){

    input = {latitude: req.params.latitude, longitude: req.params.longitude};

    sortedMerchants = merchants.map((x) => x);

    sortedMerchants.sort((a,b) => {
        dista = haversine(input, {latitude: a.latitude, longitude: a.longitude});
        distb = haversine(input, {latitude: b.latitude, longitude: b.longitude});

        return (dista - distb);
    });

    res.json(sortedMerchants);
});

router.get('/:latitude/:longitude/:id', function(req, res){
    var currMerchant = merchants.filter(function(merchants){
        if(merchants.merchantId == req.params.id){
            return true;
        }
    });

    start = {latitude: req.params.latitude, longitude: req.params.longitude};
    finish = {latitude: currMerchant[0].latitude, longitude: currMerchant[0].longitude}

    var distance = haversine(start , finish);

    res.json({message: "Distance from (" +  req.params.latitude + ", " + req.params.longitude + ") to merchant " + currMerchant[0].merchantName + "(" + currMerchant[0].latitude + ", " + currMerchant[0].longitude + ")" + " is " + distance});
});

router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.merchantName ||
        !req.body.latitude.toString() ||
        !req.body.longitude.toString()){
        
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        var newId = merchants[merchants.length-1].merchantId+1;
        merchants.push({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            merchantId: newId,
            merchantName: req.body.merchantName
        });
        res.json({message: "New merchant created.", location: "/merchants/" + newId});
    }
 });

 function updateMerchant(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.merchantName ||
        !req.body.latitude.toString() ||
        !req.body.longitude.toString() ||
        !req.params.id.toString().match(/^[0-9]{1,}$/g)){
        
        res.status(400);
        res.json({message: "Bad Request"});
        } else {
            var updateIndex = merchants.map(function(merchants){
                return merchants.merchantId;
            }).indexOf(parseInt(req.params.id));
            
            if(updateIndex === -1){
                //Merchant not found, create new
                merchants.push({
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    merchantId: req.params.id,
                    merchantName: req.body.merchantName
                });
                res.json({message: "New merchant created.", location: "/merchants/" + req.params.id});
            } else {
                //Update existing merchant
                merchants[updateIndex] = {
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    merchantId: req.params.id,
                    merchantName: req.body.merchantName
                };
                res.json({message: "Merchant id " + req.params.id + " updated.", 
                    location: "/merchants/" + req.params.id});
            }
        }
    }

router.put('/:id', updateMerchant);
router.patch('/:id', updateMerchant);

router.delete('/:id', function(req, res){
    var removeIndex = merchants.map(function(merchants){
        return merchants.merchantId;
    }).indexOf(parseInt(req.params.id)); 
    
    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        merchants.splice(removeIndex, 1);
        res.send({message: "Merchant id " + req.params.id + " removed."});
    }
 });
var express = require('express');
var axios = require('axios');
var mongoose = require('mongoose');
var moment = require('moment');
var app = express();
var auditData = require('./auditData');

app.use(express.json());


var URI = "mongodb://localhost:27017/testDB"; // localdb
mongoose.connect(URI, function(err,db){
    if(err){
        throw err;
        console.log(err);
    } else {
        console.log('Successfully connected to database!');
    }
});


app.get("/insertData", (req, res) => { // API to get data from website and insert response into auditData collection.
    axios.post('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=95b3daef54f2ee96b70d96a077289540').then(Response => {
    
        var date = moment().format("D"); // get day from date
        var isPrime = findPrime(date); // pass day to function to check number prime or not
    
        if (isPrime == 'prime') {
    
                auditData.create(Response.data, function (err, report) {
                    if (err) throw err;
                    console.log('1 document inserted!');
                    res.json({
                        message:'success, inserted into auditData',
                        data:report
                    });
                });
        }
        else{
            res.json({
                message:'failed, date is not prime so no date',
            });
        }
    
    });
})


function findPrime(d) { // function returns prime or not prime

    var i, flag = true;

    for (i = 2; i <= d - 1; i++)
        if (d % i == 0) {
            flag = false;
            break;
        }

    if (flag == true)
        return 'prime';
    else
        return 'not prime';
}

var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
    console.log("app running on port 8000");
});
server.setTimeout(500000)
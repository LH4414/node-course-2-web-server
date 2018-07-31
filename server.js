const express = require('express');
const hbs = require('hbs');
const fs =require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',function(){
    return new Date().getFullYear;
});

hbs.registerHelper('screamIt',function(text){
    return text.toUpperCase();
});
 // aadd middleware function via app.use
// app.use regosters middleware

//app.use(express.static(__dirname + '/public'));  // --dirname provides path to application (node-web-server)
// place after middleware

//app.use takes one parameter which is a function
// takes same req and res objects but also next which moces on to next middleware 
// middleware can do logging, validate users, etc
// next tells express when middleware is complete

app.use(function(req, res, next){
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', function(err){
        if (err){
            console.log('unable to append to server.log');
        }
    });

    next();  // we/o next non of the routing below will take place
})
app.use(function(req, res, next){
    res.render('maintenance.hbs');
    // everything sstops because no next function
});

app.use(express.static(__dirname + '/public'));  // --dirname provides path to application (node-web-server)

app.get('/', function(req,res){     // thi registers a route  in this case '/'  the function is the handler when that url is used.
//    res.send('Hello express');
/* res.send({
    name: 'TED',
    age: 'old'
}); */
    res.render('home',{
        pageTitle : 'Home Page',
   //     currentYear : new Date().getFullYear(),
        welcomeMsg: 'Welcome!'
    });
});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        pageTitle: 'About Page',
        welcomeMsg: 'Welcome!'
     //   currentYear : new Date().getFullYear()
    });
})
app.get('/bad', function(req,res){    

        res.send({
           errMsg: 'Bad Request'
        });
});



app.listen(3000);  // port to listen on

// control_C to stop server  - otherwise sits and listens for requests

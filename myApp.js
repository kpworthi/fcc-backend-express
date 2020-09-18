

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server */
/*app.get("/", function(req, res) {
    res.send('Hello Express');
  }
)*/

/** 3) Serve an HTML file */
/*app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  }
)*/

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
/*app.get("/json", function(req, res){
    res.json({"message": "Hello json"})
  }
)*/

/** 6) Use the .env file to configure the app */
/*process.env.MESSAGE_STYLE="uppercase"
app.get("/json", function(req, res){
    let newObj = {"message": "Hello json"};

    if(process.env.MESSAGE_STYLE === "uppercase"){
      newObj["message"] = newObj["message"].toUpperCase();
    }
    res.json(newObj);
  }
)*/
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function(req,res,next){
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
  }
)

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  }
)

process.env.MESSAGE_STYLE="uppercase"
app.get("/json", function(req, res){
    let newObj = {"message": "Hello json"};

    if(process.env.MESSAGE_STYLE === "uppercase"){
      newObj["message"] = newObj["message"].toUpperCase();
    }
    res.json(newObj);
  }
)

/** 8) Chaining middleware. A Time server */
app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
  }, function(req, res){
    res.json({"time": req.time})
  }
)

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, res){
    res.json({"echo": req.params.word});
  }
)

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.use(bodyParser.urlencoded({extended: false}));

app.route("/name")
   .get(function(req, res, next){
        req.testObj = {first, last} = req.query;
        next();
      },
      function(req,res){
        res.json({"name": req.testObj.first + " " + req.testObj.last});
      }
   )
  .post(function(req, res, next){
      if(req.body) next();
      else throw new Error("Help");
    },
    function(req, res){
      console.log("Sending " + req.body.first + " " + req.body.last)
      res.json({"name": req.body.first + " " + req.body.last})
    }
)
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
// SEE PREVIOUS CHALLENGE


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

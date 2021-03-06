// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//set the port value
const port = 8000;
// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log(`server is listening on port: ${port}`);
};

//add entry function using POST method
app.post('/addentry', function(req, res){
    projectData = req.body;
    res.send(projectData);
    //console.log(projectData);
});

//get all function using GET method
app.get('/all', function(req,res){
    res.send(projectData);
});

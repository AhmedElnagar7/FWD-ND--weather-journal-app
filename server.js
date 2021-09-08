// Require Express to run server and routes
const express= require ('express');
// Start up an instance of app
const app = express();
// Cors for cross origin allowance
const cors = require('cors') ;
// Enable all cors requestes
app.use(cors());
// body-parser allow the backend to access json
const bodyParser= require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// Callback function to complete GET '/all'
const getAll= (req, res) => res.send(projectData);
// Get route
app.get("/allData", getAll);

// Callback function to complete POST  '/add'
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
}

// Get route
app.post("/addData", postData);

const port = 8000;

// test server
const listener = () => console.log(`running on localhost:${port}`);

// sign up server
const server = app.listen(port, listener);
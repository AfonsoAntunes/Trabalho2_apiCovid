let express = require('express')

// Import body parser
let bodyParser = require('body-parser');

// Import mongoose
let mongoose = require('mongoose');
let app = express();

// Import routes
let apiRoutes = require("./covidRoutes")

// Configure bodyparser to process orders
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to DB
const dbPath = 'mongodb://localhost/apiCovid';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('Connect to DB');
}, error => {
    console.log(error, 'Error!');
});
var db=mongoose.connection;

// Check Connection
if (!db)
    console.log("Error connecting db");
else
    console.log("DB Connected Successfully");

// Port Server
var port = process.env.PORT || 8888;


// Use API routes in the app
app.use('/api', apiRoutes)

// Start Server
app.listen(port, function() {
    console.log("UP server in port: "+ port);
});
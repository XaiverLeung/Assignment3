//import required third party modules and node.js
let express = require('express');
let mongoose = require('mongoose');
let path = require('path');

//load variables from the .env
require('dotenv').config();

//create express app
let app = express();

//tell express to use ejs for the web page
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//allow the app read data from html 
app.use(express.urlencoded({ extended: true }));

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('MongoDB Connection Error:', err));

//bring in the movies.js
let moviesRouter = require('./routes/movies');

//use the movies.js when user goes to /movies
app.use('/movies', moviesRouter);

//create home page route
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' }); 
});

//port num and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
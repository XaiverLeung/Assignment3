//import express too create route
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//import the movie.js
let Movie = require('../models/movie');

//read Operation (list all movies)
router.get('/', async (req, res, next) => {
    try {
        //find all documents in the movies collection in monogoDB
        const MovieList = await Movie.find();

        //Render the 'list' view, passing the title and the array of movies
        res.render('Movies/list', {
            title: 'Movies',
            MovieList: MovieList
        });
    } catch (err) { //errors
        console.log(err);
        //log it and render the list page with a error message
        res.render('Movies/list', { title: 'Movies', error: 'Error on Server' });
    }
});

//show add form
router.get('/add', async (req, res, next) => {
    try {
        //render the add view to display the form to the user
        res.render('Movies/add', { title: 'Add Movie' });
    } catch (err) { //catch error and display message
        console.error(err);
        res.render('Movies/list', { title: 'Movies', error: 'Error on Server' });
    }
});

//save new movies
router.post('/add', async (req, res, next) => {
    try {
        //create a new movie object using the data sent from the form
        let newMovie = Movie({
            "title": req.body.title,
            "director": req.body.director,
            "year": req.body.year,
            "genre": req.body.genre,
            "rating": req.body.rating
        });

        //save to the database then brings the user back to the movie list
        Movie.create(newMovie).then(() => {
            res.redirect('/movies');
        });
    } catch (err) { //catch error
        console.error(err);
        res.render('Movies/list', { title: 'Movies', error: 'Error on Server' });
    }
});

//edit the form
router.get('/edit/:id', async (req, res, next) => {
    try {
        //find the movie in the database i=using the ID from the URL
        const movie = await Movie.findById(req.params.id);
        
        //render the edit view, pass the found movie to fill the form
        res.render('Movies/edit', {
            title: 'Edit Movie',
            Movie: movie
        });
    } catch (err) {     //catch error
        console.error(err);
        res.redirect('/movies');
    }
});

//save update
router.post('/edit/:id', async (req, res, next) => {
    try {
        //find the movie and update it to the form
        await Movie.findByIdAndUpdate(req.params.id, {
            "title": req.body.title,
            "director": req.body.director,
            "year": req.body.year,
            "genre": req.body.genre,
            "rating": req.body.rating
        });

        //redirect back to the movie list after updating
        res.redirect('/movies');
    } catch (err) { //catch error
        console.error(err);
        res.redirect('/movies');
    }
});

//delete operation
router.get('/delete/:id', async (req, res, next) => {
    try {
        //find the movie and delete from the database
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect('/movies');
    } catch (err) { //catch error
        console.error(err);
        res.redirect('/movies');
    }
});

//export the router, it can be use in app.js
module.exports = router;
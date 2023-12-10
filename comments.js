// Create web server
// Load modules
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load comments
const comments = require('./comments.json');

// Set static folder
app.use(express.static(__dirname + '/public'));

// Set view engine
app.set('view engine', 'ejs');

// GET /comments
app.get('/comments', (req, res) => {
    res.render('comments', { comments: comments });
});

// POST /comments
app.post('/comments', (req, res) => {
    // Get data from comment form
    const name = req.body.name;
    const comment = req.body.comment;
    const date = new Date();

    // Add new comment to comments array
    comments.unshift({ name: name, comment: comment, date: date });

    // Write comments array to comments.json
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        }
    });

    // Redirect to /comments
    res.redirect('/comments');
});

// DELETE /comments
app.delete('/comments/:index', (req, res) => {
    // Get index of comment to delete
    const index = req.params.index;

    // Delete comment from comments array
    comments.splice(index, 1);

    // Write comments array to comments.json
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        }
    });

    // Redirect to /comments
    res.redirect('/comments');
});

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Initialize the app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SignUp_login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
});

// Define a schema
const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    GovtId: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// Middleware to parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the signup form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Route to handle form submission
// Route to handle form submission
app.post('/signup', (req, res) => {
    console.log("Form data received: ", req.body);
    const newUser = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        GovtId: req.body.GovtId
    });

    newUser.save()
        .then(() => {
            console.log("User saved successfully");
            res.redirect('/next');
        })
        .catch((err) => {
            console.error("Error saving user: ", err);
            res.send('Error saving user');
        });
});


// Route to serve the next part
app.get('/next', (req, res) => {
    res.sendFile(path.join(__dirname, 'hackathon.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Deal with url encoded data
app.use(express.urlencoded({extended: false}));

// Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

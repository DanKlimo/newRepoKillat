const express = require('express');
const path = require('path');
const app = express();

const pageRoutes = require('./src/routes/pageRoutes');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '/public')));


app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs')

app.use('/', pageRoutes);


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

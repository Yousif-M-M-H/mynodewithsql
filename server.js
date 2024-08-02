const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const todoRoutes = require('./routes/todoRoutes'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/todos', todoRoutes); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

const PORT = process.env.PORT || 8080; 
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

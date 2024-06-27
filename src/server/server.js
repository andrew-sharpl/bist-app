const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json({extended: false}));

// connect Database
connectDB();

// routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/appointment', require('./routes/api/appointment'));
app.use('/api/admin', require('./routes/api/admin'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
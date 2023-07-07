const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = 3000;

// Connection to Mongodb

mongoose.connect("mongodb+srv://raniatazidev:C9p?dT.@7X*5*wG@cluster0.m2nxiji.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
})
.catch((error) => {
    console.error('Error connecting to the database', error);
});

// User model

const User = require('./models/User');

// GET

app.get('/users', async (req, res) => {
try {
    const users = await User.find();
    res.json(users);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// POST

app.post('/users', async (req, res) => {
try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// PUT

app.put('/users/:id', async (req, res) => {
try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    });
    if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// DELETE

app.delete('/users/:id', async (req, res) => {
try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});


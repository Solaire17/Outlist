const ClothingModel = require('./models/Clothings');
const UserModel = require('./models/Users');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { db } = require('./models/Clothings');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

mongoose.connect(
    process.env.CONNECTION
)

//register user
app.post('/api/register', async (req, res) => {

    //creates new user profile and checks if its a duplicate username or email
    try {
        const newPassword = await bcrypt.hash(req.body.registerPassword, 10)
        await UserModel.create({
            userId: uuidv4(),
            username: req.body.registerUsername,
            email: req.body.registerEmail,
            password: newPassword
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate username or email' })
    }
})

//login user
app.post('/api/login', async (req, res) => {

    const user = await UserModel.findOne({
        email: req.body.loginEmail,
    })

    //check if password is correct
    try {
        await bcrypt.compare(req.body.loginPassword, user.password)
    }
    catch (error) {
        return res.json({ status: 'error', user: false })
    }

    const isPasswordValid = await bcrypt.compare(req.body.loginPassword, user.password)

    //if password is correct, then log the user in
    if (isPasswordValid) {

        const token = jwt.sign({
            email: user.email,
            username: user.username,
            userId: user.userId
        }, 'secret1secret')
        return res.json({ status: 'ok', user: token })
    }
    else {
        return res.json({ status: 'error', user: false })
    }
})


//gets user's information
app.get('/api/profile', async (req, res) => {
    const token = req.headers['x-access-token']

    //checks if user is correct
    try {
        const decoded = jwt.verify(token, 'secret1secret')
        const userId = decoded.userId
        const user = await UserModel.findOne({ userId: userId })

        return res.json({ status: 'ok', username: user.username, userId: user.userId })
    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

//gets all of user's clothing items
app.get('/api/myclothes', async (req, res) => {

    //checks if user is correct
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret1secret')
        const userId = decoded.userId
        const clothing = await ClothingModel.find({ userId: userId })

        return res.json({ status: 'ok', clothes: clothing })

    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

//gets one of user's clothing item
app.get('/getClothing/:id', async (req, res) => {

    try {
        const clothing = await ClothingModel.findOne({ eventId: req.params.id })
        return res.json(clothing)
    }
    catch (error) {
        res.json(error)
    }
})

//checks if clothing id matches user id  
app.get('/getClothingId/:id', async (req, res) => {
    const token = req.headers['x-access-token']

    //checks if both user ids match
    try {
        const decoded = jwt.verify(token, 'secret1secret')
        const userId = decoded.userId
        const eventUserId = await ClothingModel.findOne({ eventId: req.params.id })

        if (userId === eventUserId.userId) {
            return res.json({ status: 'ok' })
        }

    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

//gets all clothing
app.get('/getClothings', (req, res) => {
    ClothingModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})

//create clothing
app.post('/createClothing', async (req, res) => {
    const clothing = {
        eventId: uuidv4(),
        userId: req.body.userId,
        username: req.body.username,
        title: req.body.title,
        link: req.body.link,
        cost: req.body.cost,
        rating: req.body.rating,
        category: req.body.category,
        color: req.body.color,
        size: req.body.size,
        image: req.body.image
    };

    try {
        const newClothing = new ClothingModel(clothing)
        await newClothing.save()
        res.json(clothing)
    }
    catch (err) {
        res.json({ status: 'error', error: 'image size too big' })
    }



})

//update clothing 
app.put("/update/:eventId", async (req, res) => {
    const newClothing = {
        title: req.body.title,
        link: req.body.link,
        cost: req.body.cost,
        rating: req.body.rating,
        category: req.body.category,
        color: req.body.color,
        size: req.body.size,
        image: req.body.image
    }

    try {
        await ClothingModel.findOne({ eventId: req.params.eventId }, (err, updateClothing) => {
            updateClothing.title = newClothing.title
            updateClothing.link = newClothing.link
            updateClothing.cost = newClothing.cost
            updateClothing.rating = newClothing.rating
            updateClothing.category = newClothing.category
            updateClothing.color = newClothing.color
            updateClothing.size = newClothing.size
            updateClothing.image = newClothing.image

            updateClothing.save()
            res.send("update")
        }).clone()
    } catch (err) {
        return res.json({ status: 500, error: 'image size too large' })

    }
})

//delete clothing 
app.delete("/delete/:eventId", async (req, res) => {
    await ClothingModel.findOneAndRemove({ eventId: req.params.eventId }).exec()
    res.send('deleted')
})

app.listen(process.env.PORT || 3001, () => {
    console.log("SERVER RUNS")
})
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials and database name.
mongoose.connect('mongodb+srv://pkumarpatna4:IVFEqN9EjDuQXLC9@cluster0.bnlas.mongodb.net/Blog', )
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log(err));

// Create a Mongoose schema and model
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts: posts });
    } catch (err) {
        console.log(err);
        res.send("An error occurred while fetching posts.");
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('post', { post: post });
    } catch (err) {
        console.log(err);
        res.send("An error occurred while fetching the post.");
    }
});

app.post('/new-post', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try {
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send("An error occurred while saving the post.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

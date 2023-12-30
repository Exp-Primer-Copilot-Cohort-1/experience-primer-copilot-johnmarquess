// Create web server
// 1. Import express
const express = require('express');
// 2. Create router
const router = express.Router();
// 3. Import comment model
const Comment = require('../models/comment');
// 4. Import validation function
const { validateComment } = require('../validation');
// 5. Import auth function
const { auth } = require('../middleware/auth');
// 6. Create route for get comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.json({ message: error });
    }
});
// 7. Create route for get comment by id
router.get('/comments/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (error) {
        res.json({ message: error });
    }
});
// 8. Create route for post comment
router.post('/comments', auth, async (req, res) => {
    // 1. Validate data
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // 2. Create new comment
    const comment = new Comment({
        content: req.body.content,
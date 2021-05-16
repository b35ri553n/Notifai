const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Note = require('../models/Note');

// @desc   Show add page
// @route GET /notes/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('notes/add')
})

// @desc   Process add form
// @route  POST /notes
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Note.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc   Show all notes
// @route GET /notes
router.get('/', ensureAuth, async (req, res) => {
    try {
        const notes = await Note.find({ status: 'public'})
        .populate('user')
        .sort({ createdAt: 'desc'})
        .lean()

    res.render('notes/index',{
        notes,
    })
    } catch (err) {
        console.error(object)
        res.render('error/500')
    }
})
module.exports = router
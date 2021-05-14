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

module.exports = router
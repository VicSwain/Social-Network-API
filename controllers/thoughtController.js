const Thought = require('../models/Thought');

module.exports = {
    // get all thoughts 
    // working
    async getThoughts(req, res) {
        console.log('Get All Thoughts Route');
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single thought by ID
    // working
    async getSingleThought(req, res) {
        console.log('Get Single Thought Route');
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a thought
    // working
    async createThought(req, res) {
        console.log('Create Thought Route');
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
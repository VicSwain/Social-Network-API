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
    // update a thought by id
    // working
    async updateThought(req, res) {
        console.log('Update Thought Route');
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
            if (!updatedThought){
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a thought by id
    // working
    async deleteThought(req, res) {
        console.log('Delete Thought Route');
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
     // Create a reaction for a single thought
     async createReaction(req, res) {
        console.log('Create Reaction Route');
        try {
            const { reactionBody, username } = req.body;
            const newReaction = { reactionBody, username };
            
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            thought.reactions.push(newReaction);
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a reaction from a single thought
    async deleteReaction(req, res) {
        console.log('Delete Reaction Route');
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            const reactionId = req.params.reactionId;
            thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== reactionId);
            await thought.save();

            res.json({ message: 'Reaction removed successfully', thought });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
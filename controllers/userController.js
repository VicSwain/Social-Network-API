const User = require('../models/User');

module.exports = {
    // get all users
    // working
    async getUsers(req, res) {
        console.log("Get All User Route");
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user
    // working
    async getSingleUser(req, res) {
        console.log('Get Single User Route');
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID'})
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // create a user
    // works
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a user by id
    // working
    async updateUser(req, res) {
        console.log('Update User Route');
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove user by its _id
    // working
    async deleteUser(req, res) {
        console.log('Delete User Route');
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
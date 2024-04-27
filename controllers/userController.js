const User = require('../models/User');

module.exports = {
    // get all users
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
    async getSingleUser(req, res) {
        console.log('Get Single User Route');
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
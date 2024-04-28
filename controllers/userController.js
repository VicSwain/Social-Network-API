const User = require('../models/User');

module.exports = {
    // get all users
    // working
    async getUsers(req, res) {
        console.log("Get All User Route");
        try {
            const users = await User.find()
            .select('-__v');
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
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
            .select('-__v');
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
            const deletedUser = await User.findByIdAndDelete(req.params.userId)
            .select('-__v');
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add friend to user's friend list
    // working
    async addFriend(req, res) {
        console.log('Add Friend Route');
        try {
            const user = await User.findById(req.params.userId)
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            const { friendId } = req.params;
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'User is already a friend' });
            }

            user.friends.push(friendId);
            await user.save();

            res.json({ message: 'Friend added successfully', user });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user's friend list
    // working
    async deleteFriend(req, res) {
        console.log('Remove Friend Route');
        try {
            const user = await User.findById(req.params.userId)
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            const { friendId } = req.params;
            if (!user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'User is not a friend' });
            }
            user.friends = user.friends.filter(friend => friend.toString() !== friendId);
            await user.save();

            res.json({ message: 'Friend removed successfully', user });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
const connection = require('../config/connection');
const { Reaction, Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtcheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
    if (thoughtcheck.length) {
        await connection.dropCollection('thoughts');
    }

    let reactionCheck = await connection.db.listCollections({ name: 'reactions'}).toArray();
    if (reactionCheck.length) {
        await connection.dropCollection('reactions');
    }

    const users = [];
    const thoughts = [];
    // const reactions = [];

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    // await Reaction.collection.insertMany(reactions);


    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
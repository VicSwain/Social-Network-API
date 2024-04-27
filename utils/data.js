const users = [
    {
        'model': 'user',
        'documents': [
            {
              "username": "john_doe",
              "email": "john@example.com"
            },
            {
              "username": "alice_smith",
              "email": "alice@example.com"
            },
            {
              "username": "mike_jones",
              "email": "mike@example.com"
            },
            {
              "username": "sarah_brown",
              "email": "sarah@example.com"
            },
            {
              "username": "david_wilson",
              "email": "david@example.com"
            },
            {
              "username": "emily_taylor",
              "email": "emily@example.com"
            },
            {
              "username": "chris_anderson",
              "email": "chris@example.com"
            },
            {
              "username": "lisa_jackson",
              "email": "lisa@example.com"
            },
            {
              "username": "ryan_thomas",
              "email": "ryan@example.com"
            },
            {
              "username": "jessica_roberts",
              "email": "jessica@example.com"
            }
          ]
          
    }
];

const thoughts = [
    {
        'model': 'thought',
        'documents': [
            { "thoughtText": "I wonder what the future holds." },
            { "thoughtText": "Life is full of surprises." },
            { "thoughtText": "Every problem has a solution." },
            { "thoughtText": "Kindness costs nothing." },
            { "thoughtText": "Learning never exhausts the mind." },
            { "thoughtText": "The only way to do great work is to love what you do." },
            { "thoughtText": "Change your thoughts and you change your world." },
            { "thoughtText": "The journey of a thousand miles begins with a single step." },
            { "thoughtText": "Success is not final, failure is not fatal: It is the courage to continue that counts." },
            { "thoughtText": "Happiness depends upon ourselves." }
          ]
           
    }
];

module.exports = {
    users,
    thoughts
};
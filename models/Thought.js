const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true,
            maxlength: 500,
        }, 
        createdAt: {
            type: Date,
            default: Date.now, 
        }, 
        username : [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true, 
        },
        id: false, 
    }
);

thoughtSchema
.virtual('getReactions')
// Getter
.get(function () {
   return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought; 

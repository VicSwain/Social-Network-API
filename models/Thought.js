const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true,
            minlength: 1, 
            maxlength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false 
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 280,
        }, 
        createdAt: {
            type: Date,
            default: Date.now, 
            },
        username : [
            {
                type: String,
                ref: 'user',
                required: true,
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true, 
        },
        id: false, 
    }
);

thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
   return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought; 

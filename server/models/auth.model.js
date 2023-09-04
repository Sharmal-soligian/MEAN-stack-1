const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const auth = mongoose.model('User Auth', authSchema);
module.exports = auth;
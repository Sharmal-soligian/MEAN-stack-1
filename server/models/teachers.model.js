const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teachersSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    previousEmployer: {
        type: String
    }
},
{
    versionKey: false
});

const teacher = mongoose.model('teachers', teachersSchema);
module.exports = teacher;
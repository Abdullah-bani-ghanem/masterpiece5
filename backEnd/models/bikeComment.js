const mongoose = require('mongoose');

const bikeCommentSchema = new mongoose.Schema({
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isReported: {
        type: Boolean,
        default: false
      },
}, { timestamps: true });


module.exports = mongoose.model('bikeIdComment', bikeCommentSchema);

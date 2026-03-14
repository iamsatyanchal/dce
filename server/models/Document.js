const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['holiday_calendar', 'anti_ragging', 'fee_chart', 'aicte', 'nirf', 'beu', 'discipline_manual']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);

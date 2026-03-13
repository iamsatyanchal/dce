const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String }
}, { _id: false });

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    intake: { type: Number, required: true },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true }
}, { _id: false });

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    specialization: { type: String },
    image: { type: String }
}); // keep _id for easy editing

const labSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    tools: [{ type: String }]
});

const recruiterSchema = new mongoose.Schema({
    logo: { type: String, required: true }
}, { _id: false });

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    student: { type: String, required: true },
    year: { type: String }
});

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String }
});

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String },
    intake: { type: Number },
    heroImage: { type: String },
    description: [{ type: String }],
    highlights: [highlightSchema],
    programs: [programSchema],
    hod: {
        name: { type: String },
        designation: { type: String },
        qualification: { type: String },
        image: { type: String },
        message: { type: String },
        email: { type: String }
    },
    faculty: [facultySchema],
    labs: [labSchema],
    placements: {
        highestPackage: { type: String },
        averagePackage: { type: String }
    },
    recruiters: [recruiterSchema],
    achievements: [achievementSchema],
    faqs: [faqSchema],
    activities: [activitySchema]
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);

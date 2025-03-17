import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({ 
    userEmail: { type: String, required: true  },
    courseCode: { type: String, required: true  },
    courseTitle: { type: String, required: true  },
    professorName: { type: String, required: true  },
    studentReview: { type: String, required: true  },  
    createdAt: { type: String, required: true }
} )

const Review = mongoose.models.UserReview || mongoose.model('UserReview', ReviewSchema);

export default Review;
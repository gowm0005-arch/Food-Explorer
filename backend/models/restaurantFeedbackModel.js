import mongoose from "mongoose";

const restaurantFeedbackSchema = new mongoose.Schema({
    restaurantId: { type: String, required: true },
    name: { type: String, required: true },
    feedback: { type: String, required: true },
    image: { type: String, default: "" }
}, { timestamps: true })

const restaurantFeedbackModel = mongoose.models.restaurant_feedback || mongoose.model("restaurant_feedback", restaurantFeedbackSchema);

export default restaurantFeedbackModel;

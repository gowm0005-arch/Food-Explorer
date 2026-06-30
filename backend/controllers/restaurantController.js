import restaurantModel from "../models/restaurantModel.js";
import restaurantFeedbackModel from "../models/restaurantFeedbackModel.js";
import fs from 'fs'

const addRestaurant = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "Image is required" })
        }

        const restaurant = new restaurantModel({
            name: req.body.name,
            description: req.body.description,
            cuisine: req.body.cuisine,
            address: req.body.address,
            deliveryTime: req.body.deliveryTime,
            image: req.file.filename
        })

        await restaurant.save()
        res.json({ success: true, message: "Restaurant Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: restaurants })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const removeRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.body.id);

        if (!restaurant) {
            return res.json({ success: false, message: "Restaurant not found" })
        }

        fs.unlink(`uploads/${restaurant.image}`, () => { })

        await restaurantModel.findByIdAndDelete(req.body.id);
        await restaurantFeedbackModel.deleteMany({ restaurantId: req.body.id });

        res.json({ success: true, message: "Restaurant Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const addRestaurantFeedback = async (req, res) => {
    try {
        const { restaurantId, name, feedback } = req.body;

        if (!restaurantId || !name || !feedback) {
            return res.json({ success: false, message: "Please fill all required fields" })
        }

        const feedbackEntry = new restaurantFeedbackModel({
            restaurantId,
            name,
            feedback,
            image: req.file ? req.file.filename : ""
        })

        await feedbackEntry.save();
        res.json({ success: true, message: "Feedback Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const listRestaurantFeedback = async (req, res) => {
    try {
        const feedbackList = await restaurantFeedbackModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: feedbackList })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addRestaurant, listRestaurants, removeRestaurant, addRestaurantFeedback, listRestaurantFeedback }

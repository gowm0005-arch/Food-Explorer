import express from 'express';
import multer from 'multer';
import { addRestaurant, addRestaurantFeedback, listRestaurantFeedback, listRestaurants, removeRestaurant } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage })

restaurantRouter.get('/list', listRestaurants);
restaurantRouter.get('/feedback/list', listRestaurantFeedback);
restaurantRouter.post('/add', upload.single('image'), addRestaurant);
restaurantRouter.post('/remove', removeRestaurant);
restaurantRouter.post('/feedback/add', upload.single('image'), addRestaurantFeedback);

export default restaurantRouter;

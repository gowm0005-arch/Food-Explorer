import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://Goutham:mvg1212@cluster0.taxzcae.mongodb.net/food-del').then(() => console.log("DB Connected"));

}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
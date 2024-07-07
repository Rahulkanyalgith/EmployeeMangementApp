import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb://localhost:27017',
            {
                dbName: 'crud'
            }
        )
        console.log("*** Database connected Successfully ***");
    } catch (error) {
        console.log(error);
        console.log("### Database Connection Failed ###");
    }
}
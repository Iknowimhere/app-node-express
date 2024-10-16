import mongoose from 'mongoose';
//db connection
export async function dbConnection(){
    try {
        let con=await mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
        console.log(`Mongodb connected successfully on ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
    }

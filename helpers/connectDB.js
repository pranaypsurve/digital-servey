import mongoose from "mongoose";
// console.log('db',global);
const connectDB = async () => {
    if(mongoose.connection.readyState){
        console.log('already database connected');
        return
    }
    mongoose.connect(`${process.env.MONGODB_URL}`,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on('connected',()=>{
        console.log('database connected');
    })
    mongoose.connection.on('error',(err)=>{
        console.log('database connected',err);
    })
}
export default connectDB;
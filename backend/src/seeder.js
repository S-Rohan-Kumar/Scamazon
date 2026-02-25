
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import users from "./data/users.js"
import products from "./data/products.js"
import {User} from "./models/user.model.js"
import {Product} from "./models/product.models.js"
import {Order} from "./models/order.model.js"


dotenv.config({
    path : "./.env"
});


connectDB()

const importData = async () => {
    try {
        
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product , user : adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!");

    } catch (error) {
        console.log(error)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed!");
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === "-d"){
    destroyData();
}else{
    importData();
}
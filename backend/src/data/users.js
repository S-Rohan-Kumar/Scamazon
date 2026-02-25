import bcrypt from "bcrypt";


const users = [
    {
        name: "Admin User",
        email : "admin@gmail.com",
        password : await bcrypt.hash("123456",10),
        isAdmin : true,
    },
    {
        name: "John Doe",
        email : "john@gmail.com",
        password :await bcrypt.hash("123456",10),
        isAdmin : false,
    },
    {
        name: "Jane Doe",
        email : "jane@gmail.com",
        password :await bcrypt.hash("123456",10),
        isAdmin : false,
    },
    {
        name: "Bob Doe",
        email : "bob@gmail.com",
        password :await bcrypt.hash("123456",10),
        isAdmin : false,
    }
]

export default users;
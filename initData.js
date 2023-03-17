import mongoose from "mongoose";
const bcrypt = require('bcryptjs');
const Role = require('./models/role');
const User = require('./models/user');


try {
    mongoose.connect(process.env.DB_URI,{
        user: "auth",
        pass: "3^9r4$f$o7k*TSk9rJBWbh"
    }).then((db)=>{
        console.log("-----------------------")
        createRoles()
        createUsers()
        console.log("-----------------------")
    });
} catch (error) {
    console.log(error);
}


const createRoles = async () => {
    try {
        const roles = ['user', 'admin', 'instructor'];
        for (let i = 0; i < roles.length; i++) {
            const role = new Role({ name: roles[i] });
            await role.save();
        }
        console.log('Roles created successfully');
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
};

const createUsers = async () => {
    try {
        // create admin user
        const adminRole = await Role.findOne({ name: 'admin' });
        const adminUser = new User({
            username: 'admin',
            email: 'admin@sarkis.dev',
            password: bcrypt.hashSync('admin', 8),
            roles: [adminRole._id],
        });
        await adminUser.save();
        console.log('Admin user created successfully');

        // create regular user
        const userRole = await Role.findOne({ name: 'user' });
        const regularUser = new User({
            username: 'user',
            email: 'user@example.com',
            password: bcrypt.hashSync('user', 8),
            roles: [userRole._id],
        });
        await regularUser.save();
        console.log('Regular user created successfully');

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
};

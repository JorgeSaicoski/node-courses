const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Role = require('../models/role');
const User = require('../models/user');


const initData = async () =>{
    try {
        console.log("-----------------------")
        await createRoles()
        await createUsers()
        await createAdmin()
        console.log("-----------------------")
    } catch (error) {
        console.log(error);
    }

}



const createRoles = async () => {
    try {
        const roles = ['user', 'admin', 'instructor'];
        for (let i = 0; i < roles.length; i++) {
            const roleExist = await Role.findOne({ name: roles[i] });
            if (!roleExist){
                const role = new Role({ name: roles[i] });
                await role.save();
            }
        }
        console.log('Roles created successfully');
    } catch (err) {
        console.log(err);
    }
};

const createAdmin = async () => {
    try {
        const admin = await User.findOne({ username: 'admin' });
        const adminRole = await Role.findOne({ name: 'admin' });
        if (admin) {
            console.log('Admin user already exists');
            return;
        }
        const user = new User({
            name: 'admin',
            username: 'admin',
            email: 'admin@sarkis.dev',
            password: 'password',
            roles: [adminRole]
        });
        await user.save(); // save the user to the database
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

const createUsers = async () => {
    try {
        const userRole = await Role.findOne({ name: 'user' });
        const users = [
            { name: 'John Doe', username: 'John Doe', email: 'johndoe@gmail.com', password: 'password', roles:[userRole] },
            { name: 'Jane Smith', username: 'Jane Smith', email: 'janesmith@gmail.com', password: 'password', roles:[userRole] },
            { name: 'Bob Johnson', username: 'Bob Johnson', email: 'bobjohnson@gmail.com', password: 'password', roles:[userRole] },
            { name: 'Alice Lee', username: 'Alice Lee', email: 'alicelee@gmail.com', password: 'password', roles:[userRole] },
            { name: 'Tom Wilson', username: 'Tom Wilson', email: 'tomwilson@gmail.com', password: 'password', roles:[userRole] },
        ];

        for (let user of users) {
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                console.log(`User with email ${user.email} already exists in database`);
                continue;
            }

            if (!user.email || !user.password) {
                console.log(`User with name ${user.name} has missing required fields`);
                continue;
            }
            const newUser = new User(user);
            await newUser.save();
            console.log(`Created user with name ${newUser.name} and email ${newUser.email}`);
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    initData,
    createRoles,
    createUsers,
    createAdmin
}

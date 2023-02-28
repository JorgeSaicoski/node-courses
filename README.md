# Courses Node

## This is a backend software, so you will need a frontend to use it properly

# Todo:

* Create a DB
### This app code haven't a connection to a DB. But the code was made with it.
### So you should to create a folder named db and put your mongodb/database config there.

##### db/conn.js:
```javascript
const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

module.exports = ()=>{
    async function connectToDB(){
        console.log("hi")
        try {
            mongoose.connect(process.env.DB_URI,{
                user: "admin",
                pass: "3^9r4$f$o7k*TSk9rJBWbh"
            }).then((db)=>{
                console.log("-----------------------")
                console.log("MONGO CONNECTED")
                console.log(db.connection.host)
                console.log(`${process.env.DB_URI}`)
                console.log("-----------------------")
            });
        } catch (error) {
            console.log(error);
        }
    }
    connectToDB().then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
}
```


## Goals:
- [x] Connect to the DB
- [ ] CRUD User
- [ ] Check permission to create questions
- [ ] CRUD question
- [ ] Users can do the question and receive the feedback
- [ ] Users can buy the course
require('dotenv').config();
const app = require("./src/app.js")
const DB = require("./src/db/db")


DB();

const port = 8000;
app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
})
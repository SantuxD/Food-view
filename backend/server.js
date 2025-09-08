const app = require("./src/app.js")
const DB = require("./src/db/db")
require('dotenv').config();

DB();

const port = 8000;
app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
})
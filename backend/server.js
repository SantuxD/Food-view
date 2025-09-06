const app = require("./src/app.js")
const DB = require("./db/db.js")

DB();

const port = 8000;
app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
})
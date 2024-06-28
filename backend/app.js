const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const path = require("path");
const cors= require("cors");


// const UserAPI = require("./routes/user");



const TaskAPI = require("./routes/task");
app.use(cors());


app.use("/api", TaskAPI)




app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// const PORT= 1000;
app.listen(1000, ()=> {
    console.log("Server is running  ");
});
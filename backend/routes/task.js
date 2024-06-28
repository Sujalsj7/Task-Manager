const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create Task
router.post("/create-task", async (req, res) => {
    try {
        const { title, desc } = req.body;
       

        if (!title || !desc) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const newTask = new Task({ title, desc });
        const savedTask = await newTask.save();

        res.status(201).json({ message: "Task Created", task: savedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.get("/get-tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/delete-task/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/update-task/:id", async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    
    try {

        if (!title || !desc) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, desc },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task Updated", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

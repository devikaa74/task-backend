const tasks = require("../models/taskModel");

exports.addTaskController = async (req, res) => {
    console.log('Inside Add Task Controller');
    const userId = req.userId;
    console.log('Request Body:', req.body);

    const { taskName, taskDescription, startDate, endDate, taskStatus } = req.body;
    try {
        const newTask = new tasks({
            taskName, taskDescription, startDate, endDate, taskStatus, userId
        });
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json("Error adding task");
    }
};

exports.userTaskController = async (req, res) => {
    console.log("Inside user Task controller");
    const userId = req.userId;
    console.log(userId);

    try {
        const alluserTask = await tasks.find({ userId });
        if (!alluserTask || alluserTask.length === 0) {
            return res.status(404).json("No tasks found for this user");
        }
        console.log(alluserTask);
        res.status(200).json(alluserTask);
    } catch (err) {
        res.status(500).json("Error fetching tasks");
    }
};

exports.taskEditController = async (req, res) => {
    console.log("Inside task edit controller");
    const id = req.params.id;
    const userId = req.userId;
    const { taskName, taskDescription, startDate, endDate, taskStatus } = req.body;


    try {
        const updateTask = await tasks.findByIdAndUpdate({ _id: id }, { taskName, taskDescription, startDate, endDate, taskStatus, userId }, { new: true });
        await updateTask.save();
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.taskDeleteController = async (req, res) => {
    console.log("Inside task delete controller");
    const { id } = req.params;
    try {
        const deleteTask = await tasks.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteTask);
    } catch (error) {
        res.status(400).json(error);
    }
};
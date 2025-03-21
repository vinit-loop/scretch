import Task from "../modals/Task.js";
export const createTask = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newTask = new Task({
      ...req.body,
      userId: req.body.userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ userId: userId, isDeleted: false });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getallTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: false });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = true;
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

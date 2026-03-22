import Task from "../models/Task.js";

// export const getallTasks = (req, res) => {
//   res.status(201).json({ message: "co  task thành công" });
// };

export const getallTasks = async (req, res) => {
  try {
    // const tasks = await Task.find().sort({ createdAt: -1 });
    const result = await Task.aggregate([
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.log("Lỗi khi goi getallTasks ", error);
    res.status(500).json({ message: "Lỗi Hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.log("Lỗi khi goi createTask ", error);
    res.status(500).json({ message: "Lỗi Hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, CompletedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, CompletedAt },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Lỗi khi goi updatedTask ", error);
    res.status(500).json({ message: "Lỗi Hệ thống" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.log("Lỗi khi goi deletedTask ", error);
    res.status(500).json({ message: "Lỗi Hệ thống" });
  }
};

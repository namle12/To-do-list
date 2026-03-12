import Addtask from "@/components/Addtask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import Tasklistpagination from "@/components/Tasklistpagination";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTasks();
  }, []);

  // logic fetch task
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("Lỗi xảy ra khi try xuất task ", error);
      toast.error("Lỗi xảy ra khi try xuất task");
    }
  };
  //lọc task
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleNewTaskChange = () => {
    fetchTasks(); // Tải lại danh sách nhiệm vụ sau khi thêm nhiệm vụ mới
  };

  return (
    <div className="container pt-8 mx-auto">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
        {/* </Header> */}
        <Header />

        {/* Tao nhiem vu moi */}
        <Addtask handleNewTaskAdded={handleNewTaskChange} />

        {/* Thống kê bộ lọc  */}
        <StatsAndFilter
          filter={filter}
          setFilter={setFilter}
          activeTaskCount={activeTaskCount}
          completedTaskCount={completedTaskCount}
        />

        {/* danh sách nhiện vụ  */}
        <TaskList
          filterTasks={filteredTasks}
          filter={filter}
          handleTaskChanged={handleNewTaskChange}
        />

        {/*Phân trang và lọc theo ngày */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Tasklistpagination />
          <DateTimeFilter />
        </div>

        {/* chân trang */}
        <Footer
          activeTasksCount={activeTaskCount}
          completedTaskCount={completedTaskCount}
        />
      </div>
    </div>
  );
};
export default HomePage;

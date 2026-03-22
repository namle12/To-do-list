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
import { visibileTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  // const [dataquery, setDataquery] = useState("today");
  const [page, setPage] = useState(1);
  // nhớ trang ở số mấy

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setPage(1); // Đặt lại trang về 1 khi bộ lọc thay đổi
  }, [filter]);
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

  const handleNewTaskChange = () => {
    fetchTasks(); // Tải lại danh sách nhiệm vụ sau khi thêm nhiệm vụ mới
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibileTaskLimit,
    page * visibileTaskLimit,
  ); // Hiển thị 4 nhiệm vụ mỗi trang

  if (visibleTasks.length === 0) {
    handlePrev();
  }
  const totalPages = Math.ceil(filteredTasks.length / visibileTaskLimit);
  // Tính tổng số trang
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
          filterTasks={visibleTasks}
          filter={filter}
          handleTaskChanged={handleNewTaskChange}
        />

        {/*Phân trang và lọc theo ngày */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Tasklistpagination
            Page={page}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePageChange={handlePageChange}
          />
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

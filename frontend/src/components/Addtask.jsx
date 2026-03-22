import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const Addtask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        // Gọi API để thêm task mới
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success("Nhiệm vụ đã được thêm vào danh sách." + newTaskTitle);
        handleNewTaskAdded(); // Gọi hàm callback để thông báo nhiệm vụ mới đã được thêm
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ ", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới");
      }
    } else {
      toast.error("Ban cần nhập tiêu đề nhiệm vụ");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-row gap-3 sm:flex-row">
          <Input
            type="text"
            placeholder="Ban can lam gi"
            className="h-12 text-base bg-slate-50 sm:flex-1 boder-boder/50 focus:border-primary/50 focus:ring-primary/20"
            value={newTaskTitle}
            onChange={(even) => setNewTaskTitle(even.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="size-5" /> Add Task
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Addtask;

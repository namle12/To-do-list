import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="text-foreground font-medium">
            {filter == "active "
              ? "Không có nhiệm vụ nào đang làm"
              : filter == "complete"
              ? "chưa có nhiệm vụ đã hoàn thành"
              : "chưa có nhiệm vụ "}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter == "all"
              ? "Hãy thêm nhiệm vụ mới để bắt đầu"
              : 'Chuyển sang tab "Tất cả" để thêm nhiệm vụ mới +{filter == "active" ? "đã hoàn thành" : "đang làm"}'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;

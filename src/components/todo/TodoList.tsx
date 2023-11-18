import React, { useState } from "react";
import TodoItem from "./TodoItem";

import { Task } from "../../interfaces/TaskModel";

interface TodoListProps {
  tasks: Task[];
  markAsCompleted: (id: number) => void;
  deleteTask: (id: number) => void;
  handleEdit: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  markAsCompleted,
  deleteTask,
  handleEdit,
}) => {
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const toggleDetails = (itemId: number) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId));
  };
  return (
    <div className="w-full">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          markAsCompleted={markAsCompleted}
          deleteTask={deleteTask}
          isExpanded={expandedItemId === task.id}
          toggleDetails={() => toggleDetails(task.id)}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;

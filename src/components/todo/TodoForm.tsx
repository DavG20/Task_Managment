import React, { useEffect, useState } from "react";
import { Task, TaskCategory } from "../../interfaces/TaskModel";

import validator from "validator";

interface TodoFormProps {
  handleTaskAction: (task: Task) => void;
  isEditMode?: boolean;
  taskToUpdate: Task | null;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  handleTaskAction,
  isEditMode = false,
  taskToUpdate,
  isVisible,
  setIsVisible,
}) => {
  const [newTask, setNewTask] = useState<Task>({
    id: isEditMode && taskToUpdate ? taskToUpdate.id : 0,
    title: isEditMode && taskToUpdate ? taskToUpdate.title : "",
    description: isEditMode && taskToUpdate ? taskToUpdate.description : "",
    isCompleted: isEditMode && taskToUpdate ? taskToUpdate.isCompleted : false,
    deadLine: isEditMode && taskToUpdate ? taskToUpdate.deadLine : "",
    category:
      isEditMode && taskToUpdate ? taskToUpdate.category : TaskCategory.Work,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    deadLine: "",
  });

  useEffect(() => {
    if (isEditMode && taskToUpdate) {
      setNewTask(taskToUpdate);
    }
  }, [isEditMode, taskToUpdate]);
  const handleInputChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: "", description: "", deadLine: "" };

    if (validator.isEmpty(newTask.title)) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (validator.isEmpty(newTask.description)) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (validator.isEmpty(newTask.deadLine)) {
      newErrors.deadLine = "Deadline is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setNewTask({
      id: 0,
      title: "",
      description: "",
      isCompleted: false,
      deadLine: "",
      category: TaskCategory.Work,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      handleTaskAction(newTask);
      resetForm();
    }
  };
  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <div className="  max-w-md m-2 w-full">
      <div
        className={` bg-gray-50  border rounded-lg  duration-500 ${
          isVisible
            ? " translate-x-0 opacity-100"
            : " translate-x-full opacity-0"
        }`}
      >
        <form onSubmit={handleSubmit} className=" mx-auto mt-4 p-4 ">
          <h2 className="text-2xl mb-4"> Task:</h2>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className={`border border-gray-400 p-2 w-full rounded-md ${
                errors.title ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Title"
            />
            <span className="text-red-400 m-1">{errors.title}</span>
          </div>

          <div className="mb-4">
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              rows={4}
              className={`border border-gray-400 p-2 w-full rounded-md ${
                errors.description ? "border-red-400" : "border-gray-400"
              }`}
              placeholder="Description"
            />
            <span className="text-red-400 m-1">{errors.description}</span>
          </div>

          <div className="mb-4">
            <div className="flex  mt-6">
              <label className="block  pr-4 ">Deadline:</label>
              <input
                type="date"
                name="deadLine"
                value={newTask.deadLine}
                onChange={handleInputChange}
                className={`border  p-2 rounded-md ${
                  errors.deadLine ? "border-red-400" : "border-gray-400"
                }`}
                placeholder={newTask.deadLine}
              />
            </div>
            <span className="text-red-400 m-1">{errors.deadLine}</span>
          </div>

          <div className="flex mb-4 mt-6">
            <label className="block  pr-4">Category:</label>
            <select
              name="category"
              value={newTask.category}
              onChange={handleInputChange}
              className="border border-gray-300 p-2  rounded-md"
            >
              {Object.values(TaskCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mb-4 mt-10 ">
            <button
              type="submit"
              className=" mr-2 mt-6 text-gray-600 p-2 rounded-md hover:bg-gray-300 border border-gray-400  font-bold w-full bg-gray-200"
            >
              {isEditMode ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className=" mt-6 text-gray-600 p-2 rounded-md hover:bg-red-500 border border-red-400 hover:text-white font-bold w-full bg-red-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

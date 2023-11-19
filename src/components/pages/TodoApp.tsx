import React, { useEffect, useState } from "react";
import { Task } from "../../interfaces/TaskModel";
import TodoList from "../todo/TodoList";
import Card from "../common/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FiAlignJustify, FiX } from "react-icons/fi";

import TodoForm from "../todo/TodoForm";
import TaskFilter from "../todo/TaskFilter";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [todayDate, setTodayDate] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filterTitle, setFilterTitle] = useState<string>("All");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  const handleEdit = (task: Task) => {
    setIsEditMode(true);
    setSelectedTask(task);
    setIsVisible(true);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    setTodayDate(formattedToday);

    const todayTask = tasks.filter((task) => task.deadLine === formattedToday);
    setTodayTasks(todayTask);
    setFilteredTasks(tasks);
  }, [tasks]);

  const markAsCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const handleAddOrUpdateTask = (task: Task) => {
    if (isEditMode) {
      setTasks((prevTasks) =>
        prevTasks.map((prevTask) =>
          prevTask.id === task.id ? { ...task } : prevTask
        )
      );
      setIsEditMode(false);
      setSelectedTask(null);
    } else {
      const newId =
        tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      // Assign the new ID to the task
      setTasks((prevTasks) => [...prevTasks, { ...task, id: newId }]);
      setFilterTitle("All");
    }
  };
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      setFilteredTasks(todayTasks);
      setFilterTitle("All");
      return;
    }
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filteredTasks);
    setFilterTitle(` ${searchQuery[0].toUpperCase()}${searchQuery.slice(1)}`);
  };

  const handleUpcoming = () => {
    const upcomingTasks = tasks.filter((task) => task.deadLine > todayDate);
    setFilteredTasks(upcomingTasks);
    setFilterTitle("Upcoming");
  };
  const handleToday = () => {
    setFilterTitle("Today");
    setFilteredTasks(todayTasks);
  };

  const handleCategory = (category: string) => {
    if (category === "All") {
      setFilteredTasks(tasks);
      setFilterTitle("All");
      return;
    }

    const filteredTask = tasks.filter(
      (task) => task.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredTasks(filteredTask);
    setFilterTitle(category);
  };

  return (
    <div className=" flex flex-col md:flex-row h-screen  w-full ">
      <div className="md:w-2/6 p-4 w-auto flex ">
        <TaskFilter
          onSearch={handleSearch}
          onUpcoming={handleUpcoming}
          onToday={handleToday}
          onCategory={handleCategory}
          tasks={tasks}
        />
      </div>
      <div className={` w-full p-4  mt-4 md:w-2/6`}>
        {/* <div className="md:hidden flex items-end justify-end ">
          <button
            className="text-gray-500"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiAlignJustify className="w-6 h-6" />
            )}
          </button>
        </div> */}

        <div className="flex  mb-8 mt-4 ">
          <div className="w-auto md:h-auto p-2 ml-8 ">
            <p className="md:text-4xl text-lg font-bold md:mb-2 mb-0 md:mr-4 mr-1 md:ml-6 ml-2">
              {filterTitle}
            </p>
          </div>
          <div className="w-auto h-auto shadow-sm border rounded-md ml-8 ">
            <p className="text-4xl font-bold m-2 px-2">
              {filteredTasks.length}
            </p>
          </div>
        </div>
        <div className=" h-3/4 flex-col md:h-3/4 overflow-hidden  ">
          <div className="m-2 md:m-0">
            <Card>
              <button
                className="text-gray-500 p-4   my-1 "
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedTask(null);
                  toggleVisibility();
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-8" />
                Add Task
              </button>
            </Card>
          </div>
          <div className=" md:h-full h-3/4 overflow-y-auto md:m-2 m-1">
            <TodoList
              tasks={filteredTasks}
              markAsCompleted={markAsCompleted}
              deleteTask={deleteTask}
              handleEdit={handleEdit}
              // isViewMode={isVisible}
            />
          </div>
        </div>
      </div>

      <div className={`p-4  mt-4 ${isVisible ? "md:w-2/6" : "md:w-1/6"}`}>
        <TodoForm
          handleTaskAction={handleAddOrUpdateTask}
          isEditMode={isEditMode}
          taskToUpdate={selectedTask}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
    </div>
  );
};

export default TodoApp;

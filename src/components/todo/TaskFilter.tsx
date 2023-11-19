import {
  faAngleDoubleRight,
  faBriefcase,
  faHome,
  faSearch,
  faShoppingBasket,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Task } from "../../interfaces/TaskModel";
import { on } from "events";

interface TaskFilterProps {
  onSearch: (searchQuery: string) => void;
  onUpcoming: () => void;
  onToday: () => void;
  onCategory: (category: string) => void;
  tasks: Task[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  onSearch,
  onUpcoming,
  onToday,
  onCategory,
  tasks,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [count, setCount] = useState({
    today: 0,
    upcoming: 0,
    all: 0,
    personal: 0,
    work: 0,
    shopping: 0,
    home: 0,
  });

  const updateCount = (tasks: Task[]) => {
    const today = tasks.filter(
      (task) => task.deadLine === new Date().toISOString().split("T")[0]
    ).length;
    const upcoming = tasks.filter(
      (task) => task.deadLine > new Date().toISOString().split("T")[0]
    ).length;
    const all = tasks.length;
    const personal = tasks.filter(
      (task) => task.category === "Personal"
    ).length;
    const work = tasks.filter((task) => task.category === "Work").length;
    const shopping = tasks.filter(
      (task) => task.category === "Shopping"
    ).length;
    const home = tasks.filter((task) => task.category === "Home").length;
    setCount({
      today,
      upcoming,
      all,
      personal,
      work,
      shopping,
      home,
    });
  };
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const isMobile = window.innerWidth < 768;
  useEffect(() => {
    updateCount(tasks);
  }, [tasks]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
    if (!isMobile) {
      onSearch(searchQuery);
    }
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  };
  const handleClickButton = (buttonName: string, callback: () => void) => {
    setClickedButton(buttonName);
    callback();
  };
  const handleClickedCategory = (category: string) => {
    setClickedButton(category);
    onCategory(category);
  };
  return (
    <div className=" md:flex md:flex-col items-start p-4 border rounded-xl w-full">
      <div className="mb-4 text-start">
        <h2 className="text-2xl font-semibold">Menu</h2>
      </div>
      <div className="flex  w-full">
        <form
          onSubmit={handleSubmitSearch}
          className="w-full border border-gray-300 bg-gray-100 rounded-md flex-grow"
        >
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 h-full rounded-md bg-gray-100  hover:outline-none focus:outline-none"
              placeholder="Search"
            />

            <button
              type="submit"
              className=" text-white md:p-2  p-1 rounded-r-md bg-gray-300"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-start w-full ">
        <div className="m-2 mb-4 text-center  font-bold">
          <h2 className="text-xl font-semibold">Tasks</h2>
        </div>
        <div className={`flex flex-row w-full font-bold  mb-4 `}>
          <button
            onClick={() => handleClickButton("Upcoming", onUpcoming)}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Upcoming" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </span>
            Upcoming
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.upcoming}
            </span>
          </button>
        </div>
        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickButton("Today", onToday)}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Today" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faTasks} />
            </span>
            Today
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.today}
            </span>
          </button>
        </div>
        <div className="m-2 mb-4 text-center  font-bold">
          <h2 className="text-xl font-semibold">Category</h2>
        </div>

        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickedCategory("Personal")}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Personal" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2 ">
              <FontAwesomeIcon icon={faUser} />
            </span>
            Personal
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.personal}
            </span>
          </button>
        </div>
        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickedCategory("Work")}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Work" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2 ">
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
            Work
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.work}
            </span>
          </button>
        </div>
        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickedCategory("Home")}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Home" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2 ">
              <FontAwesomeIcon icon={faHome} />
            </span>
            Home
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.home}
            </span>
          </button>
        </div>
        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickedCategory("Shopping")}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "Shopping" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2 ">
              <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            Shopping
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {count.shopping}
            </span>
          </button>
        </div>
        <div className="flex flex-row font-bold  w-full mb-4">
          <button
            onClick={() => handleClickedCategory("All")}
            className={` text-gray-400 p-2 rounded-md m-1 flex items-center w-full justify-between hover:bg-gray-200 hover:text-black ${
              clickedButton === "All" ? "bg-gray-200" : ""
            }`}
          >
            <span className="mr-2 ">
              <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            All
            <span className="text-xl font-bold mr-2  bg-gray-200 px-2 rounded-md hover:bg-gray-400">
              {tasks.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;

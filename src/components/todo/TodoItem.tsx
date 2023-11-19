import { Task, TaskCategory } from "../../interfaces/TaskModel";
import {
  faBriefcase,
  faHome,
  faUser,
  faChevronRight,
  faCalendar,
  faEdit,
  faTrashAlt,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TodoItemProps {
  task: Task;
  markAsCompleted: (id: number) => void;
  deleteTask: (id: number) => void;
  toggleDetails: () => void;
  isExpanded: boolean;
  handleEdit: (task: Task) => void;
}

function TodoItem({
  task,
  markAsCompleted,
  deleteTask,
  isExpanded,
  toggleDetails,
  handleEdit,
}: TodoItemProps) {
  const isDeadLinePassed = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    return task.deadLine < formattedToday;
  };

  return (
    <div className=" flex items-center border-b flex-col  p-4 m-2 hover:bg-gray-100 hover:border hover:rounded-md">
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center space-x-3 mb-2">
          <input
            type="checkbox"
            id={`taskcheckbox_${task.id}`}
            checked={task.isCompleted}
            onChange={() => markAsCompleted(task.id)}
            className="round rounded-none"
          />

          <span
            className={`${
              task.isCompleted
                ? "line-through text-red-500 text-lg "
                : "text-lg"
            }`}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center space-x-3 p-2">
          <button onClick={toggleDetails}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex items-center justify-between w-full mt-2">
          <div className="flex items-center space-x-3 ">
            <FontAwesomeIcon
              icon={faCalendar}
              className={`${isDeadLinePassed() ? "text-red-600" : ""}`}
            />
            <p> {task.deadLine}</p>
          </div>
          <div className="flex items-center space-x-3">
            {task.category === TaskCategory.Personal && (
              <FontAwesomeIcon icon={faUser} />
            )}
            {task.category === TaskCategory.Work && (
              <FontAwesomeIcon icon={faBriefcase} />
            )}
            {task.category === TaskCategory.Home && (
              <FontAwesomeIcon icon={faHome} />
            )}
            {task.category === TaskCategory.Shopping && (
              <FontAwesomeIcon icon={faShoppingBasket} />
            )}
            <p> {TaskCategory[task.category]}</p>
          </div>
          <div className="flex items-center space-x-6 mr-2">
            {!task.isCompleted && (
              <button onClick={() => handleEdit(task)}>
                <FontAwesomeIcon icon={faEdit} className="text-yellow-700" />
              </button>
            )}
            <button onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;

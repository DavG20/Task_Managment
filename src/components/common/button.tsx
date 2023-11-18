import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CustomButtonProps {
  isMobile: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ isMobile, onClick }) => {
  const buttonContent = (
    <>
      <FontAwesomeIcon icon={faPlus} className="mr-8" />
      Add Task
    </>
  );

  if (isMobile) {
    return (
      <a href="#task-form" className="text-gray-500 p-4 my-1">
        {buttonContent}
      </a>
    );
  } else {
    return (
      <button className="text-gray-500 p-4 my-1" onClick={onClick}>
        {buttonContent}
      </button>
    );
  }
};

export default CustomButton;

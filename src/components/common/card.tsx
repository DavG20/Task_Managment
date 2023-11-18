import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="m-2  ">
      <div className="bg-white shadow-md rounded-xl border p-4 border-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Card;

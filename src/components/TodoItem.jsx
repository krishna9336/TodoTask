import React from "react";

const TodoItem = ({ title, description, isCompleted, updateHandler, deleteHandler, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
      <div>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer">
          <input
            onChange={() => updateHandler(id)}
            type="checkbox"
            checked={isCompleted}
            className="form-checkbox text-blue-500 h-5 w-5"
          />
          <span className="ml-2">Updated</span>
        </label>
        <button
          onClick={() => deleteHandler(id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

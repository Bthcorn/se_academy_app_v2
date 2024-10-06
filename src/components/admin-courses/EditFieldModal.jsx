import React, { useState } from "react";

const EditFieldModal = ({ id, fieldName, fieldValue, onSave, onClose }) => {
  const [value, setValue] = useState(
    fieldName == "category_list" ? fieldValue.join(", ") : fieldValue,
  );

  console.log("EditFieldModal -> value", value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-full max-w-sm rounded-lg bg-[#1E293B] p-4 text-white shadow-lg">
        <h3 className="text-xl font-bold">
          Edit {fieldName.replace(/_/g, " ")}
        </h3>
        {fieldName == "category_list" ? (
          <div className="flex flex-wrap">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter categories separated by commas"
              className="mb-4 w-full rounded-md p-2 text-black"
            />
          </div>
        ) : (
          <textarea
            className="mb-4 mt-2 w-full rounded-md p-2 text-black"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ minHeight: "100px" }}
          />
        )}

        <button
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => onSave(id, fieldName, value)}
        >
          Save
        </button>
        <button
          className="mt-2 w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditFieldModal;

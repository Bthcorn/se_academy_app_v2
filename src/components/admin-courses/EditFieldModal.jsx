import React, { useState } from "react";

const EditFieldModal = ({ id, fieldName, fieldValue, onSave, onClose }) => {
  // Dynamically initialize the state for `fieldValue`
  const [value, setValue] = useState(
    fieldName === "category_list"
      ? fieldValue.join(", ") // Handle `category_list` as a comma-separated string
      : fieldValue
  );

  console.log("EditFieldModal -> value", value);

  // const handleSave = () => {
  //   // Process value before saving, e.g., splitting category list into an array
  //   const processedValue =
  //     fieldName === "category_list"
  //       ? value.split(",").map((item) => item.trim())
  //       : value;

  //   onSave(id, fieldName, processedValue);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-full max-w-sm rounded-lg bg-[#1E293B] p-4 text-white shadow-lg">
        <h3 className="text-xl font-bold">
          Edit {fieldName.replace(/_/g, " ")}
        </h3>

        {/* Render inputs based on the fieldName */}
        {fieldName === "category_list" ? (
          // Handle category_list as a single input field
          <div className="flex flex-wrap">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter categories separated by commas"
              className="mb-4 w-full rounded-md p-2 text-black"
            />
          </div>
        ) : fieldName === "achievements" ? (
          // Handle achievements as a list of editable fields
          <div className="space-y-4">
            {value.map((achievement, index) => (
              <div key={achievement.id} className="space-y-2 border-b pb-4">
                <div>
                  <strong>ID:</strong>
                  <input
                    type="text"
                    value={achievement.id}
                    onChange={(e) => {
                      const updatedAchievements = [...value];
                      updatedAchievements[index].id = e.target.value;
                      setValue(updatedAchievements);
                    }}
                    className="ml-2 w-full rounded-md border p-2 text-black"
                  />
                </div>
                <div>
                  <strong>Title:</strong>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => {
                      const updatedAchievements = [...value];
                      updatedAchievements[index].title = e.target.value;
                      setValue(updatedAchievements);
                    }}
                    className="ml-2 w-full rounded-md border p-2 text-black"
                  />
                </div>
                <div>
                  <strong>Description:</strong>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => {
                      const updatedAchievements = [...value];
                      updatedAchievements[index].description = e.target.value;
                      setValue(updatedAchievements);
                    }}
                    className="w-full rounded-md border p-2 text-black"
                  />
                </div>
                <div>
                  <strong>Badge Path:</strong>
                  <input
                    type="text"
                    value={achievement.badge}
                    onChange={(e) => {
                      const updatedAchievements = [...value];
                      updatedAchievements[index].badge = e.target.value;
                      setValue(updatedAchievements);
                    }}
                    className="ml-2 w-full rounded-md border p-2 text-black"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Handle all other fields as a textarea
          <textarea
            className="mb-4 mt-2 w-full rounded-md border p-2 text-black"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ minHeight: "100px" }}
          />
        )}

        {/* Save and Cancel Buttons */}
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

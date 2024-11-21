import React, { useEffect, useRef, useState } from "react";
import EditFieldModal from "./EditFieldModal";
import axios from "axios";
import { Config } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Toast from "../Toast";

const parseIntField = ["enrolled", "total_video", "year"];
const parseFloatField = ["rating", "total_duration"];

const CourseDetailsModal = ({ selectedCourse, close, openQuiz }) => {
  const [editMode, setEditMode] = useState(false);
  const [editField, setEditField] = useState(null);
  const imgRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [img, setImg] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [achievementData, setAchievementData] = useState([]);
  const [addCategory, setAddCategory] = useState("");
  const [badges, setBadges] = useState({});

  const openEditModal = (field) => {
    setEditField({ name: field, value: selectedCourse[field] });
  };

  const closeEditModal = () => {
    setEditField(null);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onSave = async (id, name, value) => {
    try {
      if (parseIntField.includes(name)) {
        value = parseInt(value);
      } else if (parseFloatField.includes(name)) {
        value = parseFloat(value);
      } else if (name === "category_list") {
        value = value.split(",").map((category) => category.trim());
        console.log(value);
      }

      const response = await axios.patch(
        Config.API_URL + "/course/update_course/" + id,
        {
          [name]: value,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        Toast("Course updated successfully.", "success");
        closeEditModal();
      } else {
        Toast("Error updating course.", "error");
      }
    } catch (error) {
      Toast("Error updating course.", "error");
      console.error(error);
    }
  };

  const handleImageUpload = async (id) => {
    try {
      const formData = new FormData();
      formData.append("image", imgRef.current.files[0]);
      const response = await axios.put(
        Config.API_URL + "/course/update_course_image/" + id,
        formData,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        console.log("Image uploaded successfully.");
        Toast("Image uploaded successfully.", "success");
      } else {
        console.log("Error uploading image.");
        Toast("Error uploading image.", "error");
      }
    } catch (error) {
      console.error(error);
      Toast("Error uploading image.", "error");
    }
  };

  const fetchImg = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/get_course_img/" + id,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );
      if (response.data) {
        setImg(`data:image/jpeg;base64,${response.data}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        Config.API_URL + "/course/get_categories",
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAchievementData = async (id) => {
    try {
      const response = await axios.get(
        Config.API_URL + "/achievement/get_achievements/" + id,
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.data) {
        setAchievementData(response.data);
        console.log("achievements", response.data);
        for (let i = 0; i < response.data.length; i++) {
          const badge = await axios.get(
            Config.API_URL +
              "/achievement/get_achievement/" +
              response.data[i].id,
            {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            },
          );

          if (badge.data) {
            console.log("badge", badge.data);
            setBadges({ ...badges, [badge.data.id]: badge.data.badge });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCategoryChange = (e) => {
  //   setCategoryList(e.target.value);
  // };

  const handleAddCategory = async (category) => {
    setCategoryList([...categoryList, category]);
    console.log(categoryList);
  };

  const handleRemoveCategory = async (category) => {
    setCategoryList(categoryList.filter((cat) => cat !== category));
  };

  const handlClearCategories = async () => {
    setCategoryList([]);
  };

  const handleCategorySave = async (id, categoryList) => {
    try {
      const response = await axios.patch(
        Config.API_URL + "/course/update_course/" + id,
        {
          category_list: categoryList,
        },
        {
          headers: {
            Authorization: Config.AUTH_TOKEN(),
          },
        },
      );

      if (response.status === 200) {
        console.log("Category list updated successfully.");
        Toast("Category list updated successfully.", "success");
      } else {
        console.log("Error updating category list.");
        Toast("Error updating category list.", "error");
      }
    } catch (error) {
      console.error(error);
      Toast("Error updating category list.", "error");
    }
  };

  useEffect(() => {
    fetchImg(selectedCourse.id);
    fetchCategoryData();
    fetchAchievementData(selectedCourse.id);
    setCategoryList(selectedCourse.category_list);
  }, [selectedCourse]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 leading-tight">
      <div
        className="max-h-dvh w-full max-w-xl rounded-lg bg-[#1E293B] p-8 text-white shadow-lg"
        // style={{ maxHeight: "100vh" }}
      >
        <h2 className="mb-4 text-xl font-bold">{selectedCourse.title}</h2>
        {/* Scrollable content container with distinct background shade */}
        <div
          className="overflow-auto rounded-lg bg-[#16202A] p-3"
          style={{ maxHeight: "60vh" }}
        >
          <div className="space-y-4">
            <div
              key={"id"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("title") : undefined}
            >
              <p className="text-sm">
                <strong>id:</strong> {selectedCourse.id}
              </p>
            </div>

            <div
              key={"title"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("title") : undefined}
            >
              <p className="text-sm">
                <strong>title:</strong> {selectedCourse.title}
              </p>
            </div>

            <div
              key={"description"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("description") : undefined
              }
            >
              <p className="text-sm">
                <strong>description:</strong> {selectedCourse.description}
              </p>
            </div>

            <div
              key={"subjectid"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("subjectid") : undefined}
            >
              <p className="text-sm">
                <strong>subjectid:</strong> {selectedCourse.subjectid}
              </p>
            </div>

            <div
              key={"lecturer"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("lecturer") : undefined}
            >
              <p className="text-sm">
                <strong>lecturer:</strong> {selectedCourse.lecturer}
              </p>
            </div>

            <div
              key={"year"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("year") : undefined}
            >
              <p className="text-sm">
                <strong>year:</strong> {selectedCourse.year}
              </p>
            </div>

            <div
              key={"total_duration"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("total_duration") : undefined
              }
            >
              <p className="text-sm">
                <strong>total duration:</strong> {selectedCourse.total_duration}
              </p>
            </div>

            <div
              key={"rating"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("rating") : undefined}
            >
              <p className="text-sm">
                <strong>rating:</strong> {selectedCourse.rating}
              </p>
            </div>

            <div
              key={"status"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("status") : undefined}
            >
              <p className="text-sm">
                <strong>status:</strong> {selectedCourse.status}
              </p>
            </div>

            <div
              key={"enrolled"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={editMode ? () => openEditModal("enrolled") : undefined}
            >
              <p className="text-sm">
                <strong>enrolled:</strong> {selectedCourse.enrolled}
              </p>
            </div>

            <div
              key={"total_video"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              onClick={
                editMode ? () => openEditModal("total_video") : undefined
              }
            >
              <p className="text-sm">
                <strong>total video:</strong> {selectedCourse.total_video}
              </p>
            </div>

            <div
              key={"category_list"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              // onClick={
              //   editMode ? () => openEditModal("category_list") : undefined
              // }
            >
              <p className="text-sm">
                <strong>category list:</strong> {categoryList.join(", ")}
              </p>

              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                    className="rounded-lg border border-gray-400 p-2 text-black"
                  />
                  <div className="flex flex-wrap gap-2">
                    {categoryList.map((category) => (
                      <div
                        key={category}
                        className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        <span>{category}</span>
                        <button
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlClearCategories}
                      className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => handleAddCategory(addCategory)}
                      className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                    >
                      Add Category
                    </button>
                    <select
                      onChange={(e) => handleAddCategory(e.target.value)}
                      className="rounded-lg border border-gray-400 p-2 text-black"
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() =>
                      handleCategorySave(selectedCourse.id, categoryList)
                    }
                    className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    {" "}
                    Save Categories{" "}
                  </button>
                </div>
              ) : null}
            </div>

            <div
              key={"image"}
              className={`cursor-pointer p-2 ${editMode ? "rounded-lg border-2 border-yellow-400 shadow-sm transition-all duration-300 ease-in-out" : "border border-transparent"}`}
              // onClick={
              //   editMode ? () => openEditModal("category_list") : undefined
              // }
            >
              <p className="text-sm">
                <strong>image:</strong>
              </p>
              {editMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImgFile(e.target.files[0]);
                      console.log(imgFile);
                      console.log(e.target.files[0]);
                    }}
                    ref={imgRef}
                  />
                  <img
                    src={imgFile ? URL.createObjectURL(imgFile) : img}
                    alt="course_image"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleImageUpload(selectedCourse.id)}
                    className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Save Image
                  </button>
                </div>
              ) : (
                <img
                  src={img}
                  alt={selectedCourse.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>

            <div
              key={"achievement"}
              className={`cursor-pointer border border-transparent p-2`}
            >
              {achievementData.length > 0 ? (
                <div className="flex">
                  <strong>Achievements:</strong>
                  <ul className="list-disc pl-4">
                    {achievementData.map((achievement) => (
                      <li
                        key={achievement.id}
                        className="flex items-center gap-4"
                      >
                        <span>{achievement.title}</span>
                        <img
                          src={
                            "data:image/jpeg;base64," + badges[achievement.id]
                          }
                          alt={`${achievement.title} Badge`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No achievements found.</p>
              )}
            </div>

            <div className="cursor-pointer p-2">
              <p className="text-sm">
                <strong>created At: </strong>
                {new Date(selectedCourse.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <button
            onClick={toggleEditMode}
            className="w-full rounded-md bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
          >
            {editMode ? "Stop Editing" : "Edit Course Details"}
          </button>
          <button
            onClick={openQuiz}
            className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            View Quiz
          </button>
          <div className="flex w-full gap-4">
            <Link
              to={`/admin/course/${selectedCourse.id}/achievements`}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
            >
              View Achievements
            </Link>
            <Link
              to={`/admin/course/${selectedCourse.id}/videos`}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
            >
              View Videos
            </Link>
          </div>
          <button
            onClick={close}
            className="w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
      {editField && (
        <EditFieldModal
          id={selectedCourse.id}
          fieldName={editField.name}
          fieldValue={editField.value}
          onSave={onSave}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default CourseDetailsModal;

import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyProfile = () => {
  const { userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-50 to-purple-50 p-3">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Header Cover */}
          <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px]">
              {isEdit ? (
                <label htmlFor="image" className="relative cursor-pointer">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="Profile"
                  />
                  <div className="absolute bottom-2 right-2 bg-blue-600 p-1.5 rounded-full shadow-md">
                    <Camera size={14} className="text-white" />
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <img
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                  src={userData.image}
                  alt="Profile"
                />
              )}
            </div>
          </div>

          {/* Profile Body */}
          <div className="pt-14 px-5 pb-6">
            {/* Name */}
            {isEdit ? (
              <input
                type="text"
                className="text-xl font-bold text-center w-full bg-gray-50 rounded-md py-1 border"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-xl font-bold text-center text-gray-800">
                {userData.name}
              </h2>
            )}

            <p className="text-center text-gray-500 text-sm">{userData.email}</p>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Contact Info */}
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Contact Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="font-medium">Phone:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-50 border rounded px-2 py-0.5 text-sm"
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-blue-700">{userData.phone}</p>
                )}
              </div>

              <div className="flex justify-between items-start">
                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <div className="text-right space-y-1">
                    <input
                      className="bg-gray-50 border rounded px-2 py-0.5 text-sm block"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                    <input
                      className="bg-gray-50 border rounded px-2 py-0.5 text-sm block"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-600 text-right text-sm">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Basic Info */}
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Basic Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="font-medium">Gender:</p>
                {isEdit ? (
                  <select
                    className="bg-gray-50 border rounded px-2 py-0.5 text-sm"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-600">{userData.gender}</p>
                )}
              </div>

              <div className="flex justify-between">
                <p className="font-medium">Birthday:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-50 border rounded px-2 py-0.5 text-sm"
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-600">{userData.dob}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-center">
              {isEdit ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm shadow-md hover:opacity-90 transition"
                  onClick={updateUserProfileData}
                >
                  Save Info
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-1.5 rounded-full border border-blue-500 text-blue-600 font-semibold text-sm shadow-sm hover:bg-blue-500 hover:text-white transition"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default MyProfile;

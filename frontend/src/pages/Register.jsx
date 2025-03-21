import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "user",
      profile: null, // Add profile image field
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      role: Yup.string()
        .oneOf(["user", "admin"], "Invalid role")
        .required("Role is required"),
      profile: Yup.mixed().required("Profile image is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("role", values.role);
        formData.append("profile", profileImage); 

        const response = await axios.post(
          "http://localhost:8000/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          alert("User registered successfully!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-300 to-blue-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register User
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.role}
              </div>
            )}
          </div>

          {/* Profile Image Field */}
          <div>
            <label
              htmlFor="profile"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="profile"
              id="profile"
              accept="image/*"
              onChange={(event) => {
                setProfileImage(event.currentTarget.files[0]);
                formik.setFieldValue("profile", event.currentTarget.files[0]);
              }}
              className="mt-2 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formik.touched.profile && formik.errors.profile && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.profile}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

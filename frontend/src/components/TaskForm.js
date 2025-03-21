
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { createTask, updateTask } from "../services/apiService";

const TaskForm = ({ task, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["Pending", "In Progress", "Completed"]),
  });

  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      if (task) {
        await updateTask(task._id, values);
      } else {
        console.log("created");
        await createTask(values);
      }
      onSubmit();
      resetForm();
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="max-w-md mx-auto p-8 bg-gradient-to-r from-blue-50 via-gray-100 to-white rounded-lg shadow-lg space-y-6">
        {/* Task Title Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Task Title
          </label>
          <Field
            name="title"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter task title"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        {/* Task Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Task Description
          </label>
          <Field
            name="description"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter task description"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        {/* Task Status Field */}
        {!task?.completed && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Status
            </label>

            <Field
              as="select"
              name="status"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </Field>

            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : task ? "Update Task" : "Add Task"}
        </button>
      </Form>
    </Formik>
  );
};

export default TaskForm;

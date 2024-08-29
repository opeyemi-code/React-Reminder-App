import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/formValidation";
import { ReminderContext } from "../context/DataContext";

export default function EditReminder() {
  const {
    selectedReminder,
    setShowEditReminder,
    reminderData,
    setReminderData,
    setSelectedReminder,
    setDisableEditBtn,
    setDisableDeleteBtn,
  } = useContext(ReminderContext);

  // let updatedReminders;

  const onSubmit = (e) => {
    // e.preventDefault();
    const updatedReminders = reminderData.map((reminder) =>
      reminder.id === selectedReminder.id ? values : reminder
    );

    const reminderItemsContainer = document.querySelector("ul");
    reminderItemsContainer.classList.remove("reminder-items-container");

    //Store update localStorage with the updatedReminder
    localStorage.setItem("value", JSON.stringify(updatedReminders));
    // Update the state
    setReminderData(updatedReminders);
    setShowEditReminder(false);
    setDisableEditBtn(false);
    setDisableDeleteBtn(false);
    setSelectedReminder(""); // Clear selectedReminder after update
    resetForm();
  };

  // useEffect(() => {
  //   if (selectedReminder !== null) {
  //     setSelectedReminder(null);
  //   }
  // });

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        id: selectedReminder.id,
        title: selectedReminder.title,
        description: selectedReminder.description,
        date: selectedReminder.date,
        time: selectedReminder.time,
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <div className="card edit-reminder-container">
      <header className="bg-primary rounded d-flex justify-content-between align-items-center px-3 mb-2 py-2">
        <h2 className="text-white mb-0">Edit Reminder</h2>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            const reminderItemsContainer = document.querySelector("ul");
            reminderItemsContainer.classList.remove("reminder-items-container");
            setShowEditReminder(false);
            setDisableEditBtn(false);
            setDisableDeleteBtn(false);
          }}
        >
          X
        </button>
      </header>
      <form className="mt-2 px-3" onSubmit={handleSubmit}>
        <label htmlFor="title" className="d-block mb-3">
          <input
            className={`w-100 rounded px-2 py-1 ${
              errors.title && touched.title ? "border-danger" : "border-primary"
            }`}
            type="text"
            id="title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && touched.title ? (
            <div className="text-danger mt-1">{errors.title}</div>
          ) : null}
        </label>
        <label htmlFor="description" className="d-block mb-3">
          <input
            className={`w-100 rounded px-2 py-1 ${
              errors.description && touched.description
                ? "border-danger"
                : "border-primary"
            }`}
            type="text"
            id="description"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && touched.description ? (
            <div className="text-danger mt-1">{errors.description}</div>
          ) : null}
        </label>
        <label htmlFor="date" className="d-block mb-3">
          <input
            className={`w-100 rounded px-2 py-1 ${
              errors.date && touched.date ? "border-danger" : "border-primary"
            }`}
            type="date"
            id="date"
            value={values.date}
            onChange={handleChange}
          />
          {errors.date && touched.date ? (
            <div className="text-danger mt-1">{errors.date}</div>
          ) : null}
        </label>
        <label htmlFor="time" className="d-block">
          <input
            className={`w-100 rounded px-2 py-1 ${
              errors.time && touched.time ? "border-danger" : "border-primary"
            }`}
            type="time"
            id="time"
            value={values.time}
            onChange={handleChange}
          />
          {errors.time && touched.time ? (
            <div className="text-danger mt-1">{errors.time}</div>
          ) : null}
        </label>
        <button
          id="save-edit-button"
          className="my-3 px-3 btn btn-success fw-bold float-end"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

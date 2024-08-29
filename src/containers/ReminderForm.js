import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/formValidation";
import { AlarmFill } from "react-bootstrap-icons";
import { ReminderContext } from "../context/DataContext";

export default function ReminderForm() {
  const { reminderData, setReminderData } = useContext(ReminderContext);

  useEffect(() => {
    const newDate = new Date();
    const dateField = document.getElementById("date");
    const timeField = document.getElementById("time");

    dateField.min = `${newDate.getFullYear()}-${
      newDate.getMonth() < 10
        ? "0" + (Number(newDate.getMonth()) + 1)
        : newDate.getMonth() + 1
    }-${newDate.getDate()}`;

    timeField.min = `${newDate.getHours()}:${newDate.getMinutes()}`;
  }, []);

  const onSubmit = (values) => {
    //new reminder with id
    const newReminder = {
      id: reminderData.length,
      ...values,
    };

    setReminderData((prev) => [...prev, newReminder]);
    values = {
      title: "",
      description: "",
      date: "",
      time: "",
    };
    resetForm();
  };

  useEffect(() => {
    // Store updated reminderData in localStorage whenever it changes
    localStorage.setItem("value", JSON.stringify(reminderData));
  }, [reminderData]);

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        date: "",
        time: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} className="my-3 py-3">
      <label htmlFor="title" className="w-100">
        <input
          className={`w-100 py-2 ps-3 border ${
            errors.title && touched.title ? "border-danger" : "border-primary"
          } rounded`}
          type="text"
          id="title"
          placeholder="Title here"
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && touched.title ? (
          <div className="text-danger mt-1">{errors.title}</div>
        ) : null}
      </label>
      <label htmlFor="description" className="mt-3 w-100">
        <input
          className={`w-100 py-2 ps-3 border ${
            errors.description && touched.description
              ? "border-danger"
              : "border-primary"
          } rounded`}
          type="text"
          id="description"
          placeholder="Description here"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && touched.description ? (
          <div className="text-danger mt-1">{errors.description}</div>
        ) : null}
      </label>
      <div className="mt-3 d-sm-flex">
        <label className="w-100" htmlFor="date">
          <input
            className={`w-100 py-2 px-3 border ${
              errors.date && touched.date ? "border-danger" : "border-primary"
            } rounded`}
            type="date"
            id="date"
            min=""
            value={values.date}
            onChange={handleChange}
          />
          {errors.date && touched.date ? (
            <div className="text-danger mt-1">{errors.date}</div>
          ) : null}
        </label>
        <label htmlFor="time" className="w-100 ms-sm-3 mt-3 mt-sm-0">
          <input
            className={`w-100 py-2 px-3 border ${
              errors.time && touched.time ? "border-danger" : "border-primary"
            } rounded`}
            type="time"
            id="time"
            min=""
            value={values.time}
            onChange={handleChange}
          />
          {errors.time && touched.time ? (
            <div className="text-danger mt-1">{errors.time}</div>
          ) : null}
        </label>
      </div>
      <button className="mt-3 btn-primary btn fw-bold px-3 py-2" type="submit">
        Set Reminder
        <span className="ms-2">
          <AlarmFill />
        </span>
      </button>
    </form>
  );
}

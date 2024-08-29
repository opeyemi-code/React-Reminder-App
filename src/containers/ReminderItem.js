import React, { useContext, useEffect } from "react";
import { ReminderContext } from "../context/DataContext";
import { PencilSquare, XSquare } from "react-bootstrap-icons";
import alarm from "../assets/best_alarm.mp3";
// import EditReminder from "./EditReminder";

export default function ReminderItem() {
  const alarmSound = new Audio(alarm);
  const {
    reminderData,
    setReminderData,
    setShowEditReminder,
    setSelectedReminder,
    setDueReminder,
    setShowReminderModal,
    disableDeleteBtn,
    setDisableDeleteBtn,
    setFilteredReminders,
    selectedReminder,
    disableEditBtn,
    setDisableEditBtn,
  } = useContext(ReminderContext);
  // const alarmSound = new Audio(alarm);

  useEffect(() => {
    function checkDueReminder() {
      const date = new Date();
      const dueReminder = [];
      // let filterdReminder = [];
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth() + 1;
      const currentDate = date.getDate();
      const currentHour = date.getHours();
      const currentMinute = date.getMinutes();
      const reminders = document.querySelectorAll(".reminders");

      reminders.forEach((reminder) => {
        const reminderId = Number(reminder.id);
        if (reminderId >= 0 && reminderId < reminderData.length) {
          const reminderDetails = reminderData[reminderId];

          const [reminderYear, reminderMonth, reminderDate] =
            reminderDetails.date.split("-");
          const [reminderHour, reminderMinutes] =
            reminderDetails.time.split(":");
          if (
            Number(reminderYear) === currentYear &&
            Number(reminderMonth) === currentMonth &&
            Number(reminderDate) === currentDate &&
            currentHour === Number(reminderHour) &&
            currentMinute === Number(reminderMinutes)
          ) {
            dueReminder.push(reminderData[reminderId].title);
            let updatedReminders = reminderData.filter(
              (reminder) => reminder.id !== reminderId
            );
            updatedReminders = updatedReminders.map((reminder, index) => ({
              ...reminder,
              id: index,
            }));
            setFilteredReminders(updatedReminders);
          }
        }
      });

      if (dueReminder.length > 0) {
        // Play alarm sound once
        alarmSound.play();

        // Set the reminders in state once
        setDueReminder(dueReminder);

        // Display the modal once
        setShowReminderModal(true);
      }
    }

    const intervalId = setInterval(checkDueReminder, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [reminderData]);

  //EditReminder button
  useEffect(() => {
    const reminderEditBtns = document.querySelectorAll("#reminder-edit-button");
    reminderEditBtns.forEach((reminderEditBtn) =>
      reminderEditBtn.addEventListener("click", editReminder)
    );

    function editReminder(e) {
      e.preventDefault();

      const reminderItemsContainer = document.querySelector("ul");
      reminderItemsContainer.classList.add("reminder-items-container");
      setDisableEditBtn(true);
      setDisableDeleteBtn(true);

      // console.log(deleteReminderBtns);
      setShowEditReminder(true);
      setSelectedReminder(
        () => reminderData[e.currentTarget.parentElement.parentElement.id]
      );
    }
  }, [setSelectedReminder, selectedReminder]);

  //deleteRemider
  useEffect(() => {
    const deleteReminderBtn = document.querySelectorAll(".delete-reminder-btn");

    deleteReminderBtn.forEach((reminder) =>
      reminder.addEventListener("click", deleteReminder)
    );

    function deleteReminder(e) {
      const targetedReminderID =
        e.currentTarget.parentElement.parentElement.parentElement.id;

      let updatedReminders = reminderData.filter(
        (reminder) => reminder.id !== Number(targetedReminderID)
      );

      // Reassign IDs to match the position in the array
      updatedReminders = updatedReminders.map((reminder, index) => ({
        ...reminder,
        id: index,
      })); // Update id to match the new position
      localStorage.setItem("value", JSON.stringify(updatedReminders));
      setReminderData(updatedReminders);
    }
  });

  return (
    <ul className="list-unstyled mt-3">
      {reminderData.length > 0 &&
        reminderData.map((reminder) => (
          <li
            key={reminder.id}
            id={reminder.id}
            className="reminders card py-2 px-3 mb-4"
          >
            <header className="d-flex justify-content-between align-items-center">
              <h2 id="reminder-title" className="mb-0">
                {reminder.title}
              </h2>
              <button
                disabled={disableEditBtn}
                type="button"
                id="reminder-edit-button"
                className="btn btn-primary"
              >
                <PencilSquare size={24} />
              </button>
            </header>
            <hr />
            <p id="reminder-description" className="py-2">
              {reminder.description}
            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <li id="reminder-date">{reminder.date}</li>
              <li id="">
                {reminder.time.split(":")[0] >= 12 ? (
                  <span id="reminder-time">{`${reminder.time} pm`}</span>
                ) : (
                  <span id="reminder-time">{`${reminder.time} am`}</span>
                )}
              </li>

              <li>
                <button
                  type="button"
                  disabled={disableDeleteBtn}
                  id=""
                  className="btn btn-danger delete-reminder-btn"
                >
                  <XSquare />
                </button>
              </li>
            </div>
          </li>
        ))}
    </ul>
  );
}

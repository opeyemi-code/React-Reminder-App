import React, { useContext, useEffect } from "react";
import { XSquare } from "react-bootstrap-icons";
import { ReminderContext } from "../context/DataContext";

export default function ReminderModal() {
  const {
    dueReminder,
    setReminderData,
    setShowReminderModal,
    filteredReminders,
  } = useContext(ReminderContext);

  useEffect(() => {
    const closeReminderModalBtns = document.querySelectorAll(
      ".close-reminder-modal"
    );

    closeReminderModalBtns.forEach((closeReminderModalBtn) =>
      closeReminderModalBtn.addEventListener("click", closeReminderModal)
    );

    function closeReminderModal(e) {
      e.preventDefault();

      setShowReminderModal(false);

      setTimeout(() => {
        localStorage.setItem("value", JSON.stringify(filteredReminders));

        setReminderData(filteredReminders);
      }, 5000);
    }
  }, [dueReminder, setShowReminderModal, setReminderData]);

  return (
    <div className="card reminder-modal px-2 pb-2">
      <header className="d-flex justify-content-between align-items-center py-2">
        <h1>Remider</h1>
        <span className="btn btn-danger close-reminder-modal">
          <XSquare />
        </span>
      </header>
      <hr className="mt-0"></hr>
      <p>{`${
        dueReminder.length > 1 ? "Reminders" : "Reminder"
      } due: ${dueReminder.join(", ")}`}</p>
      <hr />
      <button className="btn btn-danger close-reminder-modal" type="button">
        Close
      </button>
    </div>
  );
}

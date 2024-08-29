import React, { useContext } from "react";
import ReminderForm from "./ReminderForm";
import ReminderItem from "./ReminderItem";
import EditReminder from "./EditReminder";
import { ReminderContext } from "../context/DataContext";
import { Alarm } from "react-bootstrap-icons";
import ReminderModal from "./ReminderModal";

export default function MainContent() {
  const { showEditReminder, showReminderModal } = useContext(ReminderContext);

  return (
    <div className="app__container">
      <div className="main-container mt-5 py-4 px-4">
        <header>
          <h1 className="text-center text-primary fw-bold">
            Reminder App
            <span className="ms-3">
              <Alarm />
            </span>
          </h1>

          <hr />
        </header>
        <ReminderForm />
        <hr />
        <ReminderItem />
        {showEditReminder && <EditReminder />}
        {showReminderModal && <ReminderModal />}
      </div>
    </div>
  );
}

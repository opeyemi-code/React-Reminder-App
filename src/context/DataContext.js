import { createContext, useState } from "react";

export const ReminderContext = createContext();

function DataProvider({ children }) {
  const [reminderData, setReminderData] = useState(
    JSON.parse(localStorage.getItem("value")) || []
  );
  const [showEditReminder, setShowEditReminder] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState("");
  const [dueReminder, setDueReminder] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(false);
  const [disableEditBtn, setDisableEditBtn] = useState(false);
  const [filteredReminders, setFilteredReminders] = useState("");

  return (
    <ReminderContext.Provider
      value={{
        reminderData,
        setReminderData,
        showEditReminder,
        setShowEditReminder,
        selectedReminder,
        setSelectedReminder,
        dueReminder,
        setDueReminder,
        showReminderModal,
        setShowReminderModal,
        disableDeleteBtn,
        setDisableDeleteBtn,
        filteredReminders,
        setFilteredReminders,
        disableEditBtn,
        setDisableEditBtn,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export default DataProvider;

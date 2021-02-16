import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { useAppContext } from "../../libs/context";

const CustomCalendar = () => {
  const { selectedDate, setSelectedDate } = useAppContext();
  return (
    <DayPicker
      selectedDays={selectedDate}
      onDayClick={setSelectedDate}
      disabledDays={[{ before: new Date() }]}
    />
  );
};

export default CustomCalendar;

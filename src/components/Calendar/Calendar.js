import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../libs/context";

const CustomCalendar = () => {
  const { selectedDate, setSelectedDate } = useAppContext();
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      inline
    />
  );
};

export default CustomCalendar;

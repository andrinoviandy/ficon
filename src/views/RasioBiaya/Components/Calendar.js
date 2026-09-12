import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // untuk drag & drop
import listPlugin from "@fullcalendar/list";
import { useDispatch, useSelector } from "react-redux";
import { setToggleModal } from "../../../redux/n2n/global";

const CalendarComponent = ({listTask, handleClickTask}) => {
  const { toggleModal } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  // Saat user memilih lebih dari satu hari
  const handleDateSelect = (selectInfo) => {
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "addtask", start: selectInfo.startStr, end: selectInfo.endStr}));
  };

  // Saat user mengklik event, tampilkan detailnya
  const handleEventClick = (clickInfo) => {
    handleClickTask(clickInfo.event);
    // alert(
    //   `📌 Event: ${clickInfo.event.title}\n📅 Start: ${clickInfo.event.startStr}\n📅 End: ${clickInfo.event.endStr}\n📝 Description: ${clickInfo.event.extendedProps.description}`
    // );
  };
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={listTask}
        select={handleDateSelect} // Event ketika event di-resize
        eventClick={handleEventClick}
        eventMinWidth={30}
        eventContent={(eventInfo) => (
          <div style={{ 
            background: eventInfo.event.extendedProps.customColor, 
            padding: "5px", 
            borderRadius: "5px",
          }}>
            {eventInfo?.event?.title?.length > 7 ? eventInfo.event.title.substring(0, 8)+ '...' : eventInfo.event.title}
          </div>
        )}
        
      />
    </div>
  );
};

export default CalendarComponent;

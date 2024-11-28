"use client";
import CalendarBox from "@/components/Calendar/CalendarBox";
import CalendarLogin from "@/components/Calendar/CalendarLogin";
import CreateEvent from "@/components/Calendar/CreateEvent";


export default function CalendarPage() {

  return (
    <>
      <CalendarLogin />
      <CalendarBox />
      <CreateEvent />
    </>
  );
}

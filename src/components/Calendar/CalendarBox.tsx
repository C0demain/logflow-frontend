import { listEvents } from "@/app/api/calendarService/listEvents";
import { getTasks } from "@/app/api/tasks/listTasks";
import UserCookie from "@/interfaces/userCookie";
import { EventInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { calendar_v3 } from "@googleapis/calendar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CalendarBox() {
  const [events, setEvents] = useState<EventInput[]>([]);

  async function fetchUser(): Promise<UserCookie | undefined> {
    try {
      const response = await axios.get("/api/getUser");
      return response.data as UserCookie;
    } catch (error) {
      console.error("Failed to fetch token", error);
      return undefined;
    }
  }

  async function getUserTasks() {
    const user = await fetchUser();
    if (user) {
      const response = await getTasks("", "", user.id, "", "");
      setEvents(
        response.tasks.map((task) => {
          return {
            id: task.id,
            title: task.title || "Untitled",
            start: task.dueDate || new Date(),
            description: task.assignedUser?.name || "",
          };
        })
      );
    }
  }

  async function getGoogleCalendarEvents() {
    const user = await fetchUser();
    if (user) {
      const response = await listEvents(user?.id);
      console.log("Google Agenda", response);
      setEvents(
        events.concat(
          response.map((event: calendar_v3.Schema$Event) => {
            return {
              id: event.id,
              title: event.summary || "Evento sem título",
              start: new Date(event.start?.dateTime || new Date()),
              end: new Date(event.end?.dateTime || new Date()),
              description: event.description || "",
              location: event.location || "",
            } as EventInput;
          })
        )
      );
    }
  }

  useEffect(() => {
    getUserTasks();
    getGoogleCalendarEvents();
  }, []);

  return (
    <div className="p-5 bg-gray-50 rounded-md shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        views={{
          timeGridWeek: {
            titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
          },
          timeGridDay: {
            titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
          },
        }}
        displayEventTime={true}
        displayEventEnd={true}
        weekends={true}
        events={events}
        nowIndicator={true}
        locale={"pt-br"}
        height={"auto"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        allDayContent={
          <div className="flex justify-center align-middle text-center text-gray-500">
            Dia inteiro
          </div>
        }
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
        slotLabelClassNames={() =>
          "flex justify-center items-center text-gray-500"
        }
        dayHeaderClassNames="w-full bg-blue-500 text-white py-2 text-center font-bold"
        eventClassNames="rounded-md border p-"
        slotLaneClassNames={() => "p-1"}
        allDayClassNames={["rounded-lg"]}
        viewClassNames={["rounded-lg"]}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        eventOverlap={false}
        slotEventOverlap={false}
      />
    </div>
  );
}

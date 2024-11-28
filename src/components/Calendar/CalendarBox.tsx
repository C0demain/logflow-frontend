import { getTasks } from "@/app/api/tasks/listTasks";
import UserCookie from "@/interfaces/userCookie";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import { useEffect, useState } from "react";

const events = [
  { title: "Reunião", start: new Date() },
  { title: "Almoço", start: new Date() },
];
interface Event {
  title: string;
  start: Date;
}

export default function CalendarBox() {
  const [events, setEvents] = useState<Event[]>([]);

  async function fetchUser(): Promise<UserCookie | undefined> {
    try {
      const response = await axios.get("/api/getUser");
      return response.data as UserCookie;
    } catch (error) {
      console.error("Failed to fetch token", error);
      return undefined;
    }
  }

  async function getuserTasks() {
    const user = await fetchUser();
    if (user) {
      const response = await getTasks("", "", user.id, "", "");
      setEvents(
        response.tasks.map((task) => {
          return {
            title: task.title || "Untitled",
            start: task.dueDate || new Date(),
          };
        })
      );
    }
  }

  useEffect(() => {
    getuserTasks();
  }, []);

  function renderEventContent(eventInfo: any) {
    return (
      <p className="flex">
        <b>{eventInfo.timeText}</b> - <i>{eventInfo.event.title}</i>
      </p>
    );
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        locale={"pt-br"}
      />
    </div>
  );
}

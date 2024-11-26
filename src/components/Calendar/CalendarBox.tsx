import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

const events = [
  { title: "Reunião", start: new Date() },
  { title: "Almoço", start: new Date() },
];

export default function DemoApp() {
  function renderEventContent(eventInfo: any) {
    return (
      <p>
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

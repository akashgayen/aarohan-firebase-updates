import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { EventForm } from "./components/EventForm";
import { EventCard } from "./components/EventCard";
import { eventService } from "./services/eventService";
import { Event, EventFormData } from "./types/event";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await eventService.getAll();
      setEvents(fetchedEvents);
    } catch (error) {
      toast.error("Failed to load events");
    }
  };

  const handleCreateEvent = async (data: EventFormData) => {
    try {
      const id = await eventService.create(data);
      setEvents((prev) => [...prev, { ...data, id }]);
      setIsFormOpen(false);
      toast.success("Event created successfully");
    } catch (error) {
      toast.error("Failed to create event");
    }
  };

  const handleUpdateEvent = async (data: EventFormData) => {
    if (!editingEvent?.id) return;

    try {
      await eventService.update(editingEvent.id, data);
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id ? { ...data, id: event.id } : event
        )
      );
      setEditingEvent(null);
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await eventService.delete(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event
          </button>
        </div>

        {(isFormOpen || editingEvent) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="p-6 overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 80px)" }}
              >
                <EventForm
                  initialData={editingEvent || undefined}
                  onSubmit={
                    editingEvent ? handleUpdateEvent : handleCreateEvent
                  }
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingEvent(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={setEditingEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-blue-50 rounded-lg p-8 inline-block">
              <p className="text-blue-600 text-lg">
                No events found!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

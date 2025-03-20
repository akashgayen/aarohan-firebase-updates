import { Event } from "../types/event";
import {
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={() => onEdit(event)}
    >
      {event.imageUrl && (
        <div className="relative h-48">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {event.title}
          </h3>
          <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                event.id && onDelete(event.id);
              }}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-blue-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          {event.location && (
            <div className="flex items-center text-blue-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          )}
          {event.link && (
            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="h-4 w-4 mr-2 text-blue-600" />
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Event Link
              </a>
            </div>
          )}
        </div>

        <p className="mt-4 text-gray-600 line-clamp-3">{event.body}</p>

        {event.tag.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.tag.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-blue-100">
          <div className="text-sm text-blue-600">
            <div>Contact: {event.contact}</div>
            {event.contact5 && (
              <div className="mt-1">Alternative Contact: {event.contact5}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

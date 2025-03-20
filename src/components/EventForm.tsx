import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { EventFormData } from "../types/event";

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

const defaultFormData: EventFormData = {
  title: "",
  body: "",
  category: "",
  contact: "",
  contact5: "",
  date: "",
  imageUrl: "",
  link: "",
  location: "",
  tag: [],
  time: "",
};

export function EventForm({
  initialData = defaultFormData,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [newTag, setNewTag] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tag: [...prev.tag, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses =
    "mt-1 block w-full rounded-lg border-blue-200 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2.5 px-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact 5
          </label>
          <input
            type="text"
            name="contact5"
            value={formData.contact5}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className={inputClasses}
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tag.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-100 rounded-full transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 border border-blue-200 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Save Event
        </button>
      </div>
    </form>
  );
}

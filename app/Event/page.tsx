"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL2 } from "@/config/baseUrl";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_limit: number | null;
  registered_count: number;
  registration_ends: string;
  image: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
const [success,setSuccess] = useState<string | null>(null); 
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    registration_limit: "",
    registration_ends: "",
    image: "",
  });
const router = useRouter();
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL2}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev: any) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Create or update event
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" || formData[key] === null) return;

      if (key === "image") {
        console.log("📸 Image value before append:", formData.image);
        console.log("Is File?", formData.image instanceof File);

        if (formData.image instanceof File) {
          data.append("image", formData.image);
        }
        return;
      }

      console.log(`📝 Appending ${key}:`, formData[key]);
      data.append(key, formData[key]);
    });

    // Debug FormData contents
    for (const [key, value] of data.entries()) {
      console.log("➡️ FormData entry:", key, value);
    }

    if (editingEvent) {
      await axios.put(`${baseURL2}/api/events/${editingEvent.id}`, data);
      setSuccess("Event updated successfully!");
      setEditingEvent(null);
    } else {
      await axios.post(`${baseURL2}/api/events`, data);
      setSuccess("Event created successfully!");
    }

    setFormData({
      title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      registration_limit: "",
      registration_ends: "",
      image: "",
    });
    fetchEvents();
    setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
    console.error("❌ Error saving event", err);
  }
};


  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${baseURL2}/api/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
      setSuccess("Event deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error deleting event", err);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      start_date: event.start_date.slice(0, 16), // datetime-local needs this
      end_date: event.end_date.slice(0, 16),
      registration_limit: event.registration_limit ?? "",
      registration_ends: event.registration_ends.slice(0, 16),
      image: event.image,
    });
  };

  const isPastEvent = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin – Manage Events</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 border rounded-lg p-4 bg-gray-50"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editingEvent ? "Update Event" : "Create New Event"}
        </h2>
        <div className="grid gap-3">
            <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />     <label htmlFor="description">Desciption:</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
          />     <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="p-2 border rounded"
          />     <label htmlFor="start_date">Start dates:</label>
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />     <label htmlFor="end_date">End dates:</label>
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />     <label htmlFor="registration_limit">Registration Limit:</label>
          <input
            type="number"
            name="registration_limit"
            placeholder="Registration Limit"
            value={formData.registration_limit}
            onChange={handleChange}
            className="p-2 border rounded"
          />     <label htmlFor="registration_ends">Registration Ends:</label>
          <input
            type="datetime-local"
            name="registration_ends"
            value={formData.registration_ends}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />      <label htmlFor="image">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 w-sm border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingEvent ? "Update Event" : "Create Event"}
          </button>
{success && <p className="text-green-600">{success}</p>}
        </div>
      </form>

      {/* Events List */}
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`border rounded-lg p-4 shadow-sm ${
                isPastEvent(event.end_date) ? "border-red-400 bg-red-50" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <div className="space-x-2 ">
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                    onClick={() =>router.push("Event/RegisteredUsers")}
                  >Registered: {event.registered_count}</button>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{event.description}</p>
              <p className="mt-1 text-sm text-gray-600">
                📍 {event.location || "No location"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                🗓️ {new Date(event.start_date).toLocaleString()} →{" "}
                {new Date(event.end_date).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Registration ends:{" "}
                {new Date(event.registration_ends).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Limit:{" "}
                {event.registration_limit
                  ? `${event.registered_count}/${event.registration_limit}`
                  : "Unlimited"}
              </p>
              {event.image && <img src={event.image} alt="Event" className="mt-2" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

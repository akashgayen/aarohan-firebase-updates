export interface Event {
  id?: string;
  title: string;
  body: string;
  category: string;
  contact: string;
  contact5: string;
  date: string;
  imageUrl: string;
  link: string;
  location: string;
  tag: string[];
  time: string;
}

export type EventFormData = Omit<Event, 'id'>;
import { collection, updateDoc, deleteDoc, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Event, EventFormData } from '../types/event';
import toast from 'react-hot-toast';

const COLLECTION_NAME = 'Events';

export const eventService = {
  async getAll(): Promise<Event[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));
    } catch (error) {
      toast.error("Error fetching documents: " + error);
      throw error;
    }
  },

  async getById(id: string): Promise<Event | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as Event;
    } catch (error) {
      toast.error("Error fetching document with ID " + id + ": " + error);
      throw error;
    }
  },

  async create(event: EventFormData): Promise<string> {
    try {
      const docRef = doc(db, COLLECTION_NAME, event.title);
      await setDoc(docRef, event);
      return docRef.id;
    } catch (error) {
      toast.error("Error creating document: " + error);
      throw error;
    }
  },

  async update(id: string, event: Partial<EventFormData>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, event);
    } catch (error) {
      toast.error("Error updating document with ID " + id + ": " + error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      toast.error("Error deleting document with ID " + id + ": " + error);
      throw error;
    }
  }
};
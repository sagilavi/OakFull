import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: 'health' | 'social' | 'legal' | 'other';
  location?: string;
  notes?: string;
}

interface ScheduleState {
  events: Event[];
  selectedDate: string | null;
  selectedEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  events: [],
  selectedDate: null,
  selectedEvent: null,
  isLoading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedDate,
  setSelectedEvent,
} = scheduleSlice.actions;
export default scheduleSlice.reducer; 
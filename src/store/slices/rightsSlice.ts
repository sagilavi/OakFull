import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Right {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility: string[];
  documents: string[];
  applicationProcess: string;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface RightsState {
  rights: Right[];
  categories: string[];
  selectedCategory: string | null;
  selectedRight: Right | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RightsState = {
  rights: [],
  categories: [],
  selectedCategory: null,
  selectedRight: null,
  isLoading: false,
  error: null,
};

const rightsSlice = createSlice({
  name: 'rights',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRights: (state, action: PayloadAction<Right[]>) => {
      state.rights = action.payload;
      // Extract unique categories
      const categories = new Set(action.payload.map(right => right.category));
      state.categories = Array.from(categories);
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedRight: (state, action: PayloadAction<Right | null>) => {
      state.selectedRight = action.payload;
    },
    addRight: (state, action: PayloadAction<Right>) => {
      state.rights.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
    updateRight: (state, action: PayloadAction<Right>) => {
      const index = state.rights.findIndex(right => right.id === action.payload.id);
      if (index !== -1) {
        state.rights[index] = action.payload;
      }
    },
    deleteRight: (state, action: PayloadAction<string>) => {
      state.rights = state.rights.filter(right => right.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setRights,
  setSelectedCategory,
  setSelectedRight,
  addRight,
  updateRight,
  deleteRight,
} = rightsSlice.actions;
export default rightsSlice.reducer; 
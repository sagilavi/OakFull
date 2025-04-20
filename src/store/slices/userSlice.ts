import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  language: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  preferences: UserPreferences;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.profile) {
        state.profile.preferences = {
          ...state.profile.preferences,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProfile,
  updateProfile,
  updatePreferences,
} = userSlice.actions;
export default userSlice.reducer; 
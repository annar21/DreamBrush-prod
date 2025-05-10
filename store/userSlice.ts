import { ImageItem } from "@/app/(tabs)";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  recentImages: ImageItem[];
}

const initialState: UserState = {
  recentImages: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    addImages: (state, action: PayloadAction<ImageItem[]>) => {
      state.recentImages = [...state.recentImages, ...action.payload];
    }
  },
});

export const { addImages } = userSlice.actions;
export default userSlice.reducer;
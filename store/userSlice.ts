import { ImageItem } from "@/app/(tabs)/(home)";
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
    setImages: (state, action: PayloadAction<ImageItem[]>) => {
      state.recentImages = action.payload;
    }
  },
});

export const { setImages } = userSlice.actions;
export default userSlice.reducer;
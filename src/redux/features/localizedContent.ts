import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { strapiApiSlice } from "../service/strapiSlice";
import { strapiEnData } from "../strapiDataV2";
import type { RootState } from "../store";

interface LocalizedContentState {
  content: Record<string, string> | any;
}

const initialState: LocalizedContentState = {
  content: strapiEnData,
};

const matchStrapiContentRecieved =
  strapiApiSlice.endpoints.getLocalizedContent.matchFulfilled;

export const localizedContentSlice = createSlice({
  name: "localizedContent",
  initialState,
  reducers: {
    setLocalizedContent: (state, action: PayloadAction<any>) => {
      state.content = {
        ...state.content,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchStrapiContentRecieved, (state, action) => {
      state.content = action.payload.data;
    });
  },
});

export const { setLocalizedContent } = localizedContentSlice.actions;

export const selectLocalizedContent = (state: RootState) =>
  state.localizedContent?.content;

export default localizedContentSlice.reducer;

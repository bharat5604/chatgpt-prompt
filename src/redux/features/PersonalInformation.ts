import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import type { personalInformationSchema } from "../../utils/validations";

// Derive TypeScript type directly from Zod schema
export type PersonalInformation = z.infer<typeof personalInformationSchema>;

export interface PersonalInformationState {
  data: Partial<PersonalInformation>;
}

const initialState: PersonalInformationState = {
  data: {},
};

const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState,
  reducers: {
    setPersonalInformation: (
      state,
      action: PayloadAction<PersonalInformation>
    ) => {
      state.data = action.payload;
    },

    updateField: <K extends keyof PersonalInformation>(
      state: PersonalInformationState,
      action: PayloadAction<{
        key: K;
        value: PersonalInformation[K] | undefined;
      }>
    ) => {
      const { key, value } = action.payload;
      state.data = {
        ...state.data,
        [key]: value,
      };
    },

    resetPersonalInformation: (state) => {
      state.data = {};
    },
  },
});

export const { setPersonalInformation, updateField, resetPersonalInformation } =
  personalInformationSlice.actions;

export default personalInformationSlice.reducer;

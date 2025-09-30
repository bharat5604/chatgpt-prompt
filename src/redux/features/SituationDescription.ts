import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import type { situationDescriptionSchema } from "../../utils/validations";
// adjust path if needed

// Derive the TS type directly from the Zod schema
export type SituationDescription = z.infer<typeof situationDescriptionSchema>;

export interface SituationDescriptionState {
  data: Partial<SituationDescription>;
}

const initialState: SituationDescriptionState = {
  data: {},
};

const situationDescriptionSlice = createSlice({
  name: "situationDescription",
  initialState,
  reducers: {
    setSituationDescription: (
      state,
      action: PayloadAction<SituationDescription>
    ) => {
      state.data = action.payload;
    },

    updateField: <K extends keyof SituationDescription>(
      state: SituationDescriptionState,
      action: PayloadAction<{
        key: K;
        value: SituationDescription[K] | undefined;
      }>
    ) => {
      const { key, value } = action.payload;
      state.data = {
        ...state.data,
        [key]: value,
      };
    },

    // Reset to initial
    resetSituationDescription: (state) => {
      state.data = {};
    },
  },
});

export const {
  setSituationDescription,
  updateField,
  resetSituationDescription,
} = situationDescriptionSlice.actions;

export default situationDescriptionSlice.reducer;

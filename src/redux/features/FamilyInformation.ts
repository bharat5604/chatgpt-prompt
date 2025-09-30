import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import type { familyAndFinancialSchema } from "../../utils/validations";

export type FamilyAndFinancial = z.infer<typeof familyAndFinancialSchema>;

export interface FamilyAndFinancialState {
  data: Partial<FamilyAndFinancial>;
}

const initialState: FamilyAndFinancialState = {
  data: {},
};

const familyAndFinancialSlice = createSlice({
  name: "familyAndFinancial",
  initialState,
  reducers: {
    setFamilyAndFinancial: (
      state,
      action: PayloadAction<FamilyAndFinancial>
    ) => {
      state.data = action.payload;
    },

    updateField: <K extends keyof FamilyAndFinancial>(
      state: FamilyAndFinancialState,
      action: PayloadAction<{
        key: K;
        value: FamilyAndFinancial[K] | undefined;
      }>
    ) => {
      const { key, value } = action.payload;
      state.data = {
        ...state.data,
        [key]: value,
      };
    },

    resetFamilyAndFinancial: (state) => {
      state.data = {};
    },
  },
});

export const { setFamilyAndFinancial, updateField, resetFamilyAndFinancial } =
  familyAndFinancialSlice.actions;

export default familyAndFinancialSlice.reducer;

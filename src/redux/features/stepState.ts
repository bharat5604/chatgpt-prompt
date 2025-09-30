import { createSlice } from "@reduxjs/toolkit";

export interface StepState {
  step: number;
}

const initialState: StepState = {
  step: 0,
};

export const stepStateSlice = createSlice({
  name: "stepState",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetStep: (state) => {
      state.step = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextStep, prevStep, resetStep } = stepStateSlice.actions;

export default stepStateSlice.reducer;

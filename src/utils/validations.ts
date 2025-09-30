import * as z from "zod";

const phoneRegex = new RegExp(/^(?:\+971|971|0)?5[024568]\d{7}$/);

export const personalInformationSchema = z.object({
  name: z
    .string("Name required")
    .regex(/^[A-Za-z'\s.,]+$/, {
      message: "Name must be at least 2 characters long.",
    })
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .max(25),
  mobileNumber: z
    .string("Mobile number required")
    .regex(phoneRegex, "Invalid phone number")
    .min(10, { message: "Please enter the Valid Mobile Number" })
    .max(13, "Please Enter a valid Phone Number"),
  nationalId: z
    .string("National id required")
    .min(10, { message: "Please enter the Valid National ID" })
    .max(13, "Please Enter a valid National Id"),
  address: z.string("Address required").max(200),
  country: z.string("country required"),
  city: z.string("City required").max(200),
  state: z.string("State required").max(200),
  dateOfBirth: z.date("Date required"),
  email: z.email("Please enter valid email"),
  gender: z.string("Please select valid gender"),
});
export const familyAndFinancialSchema = z.object({
  maritalStatus: z.string("Marital status required"),
  dependents: z.string("Dependents  required"),
  employmentStatus: z.string("Employment status required"),
  monthlyIncome: z.string("Monthly income required"),
  housingStatus: z.string("Housing status required"),
});
export const situationDescriptionSchema = z.object({
  currentFinancialSituation: z
    .string("Current financial situation required")
    .min(5, {
      message: "Min 5 charater is required",
    }),
  employmentCircumstances: z
    .string("Employment circumstances required")
    .min(5, {
      message: "Min 5 charater is required",
    }),
  reasonForApplying: z.string("Employment status required").min(5, {
    message: "Min 5 charater is required",
  }),
});

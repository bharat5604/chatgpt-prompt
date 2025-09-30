import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInformationSchema } from "../../utils/validations";
import type z from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../utils/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../redux/features/stepState";
import { selectLocalizedContent } from "../../redux/features/localizedContent";
import { PageHeaderHeading } from "../ui/page-header";
import { setPersonalInformation } from "../../redux/features/PersonalInformation";
import type { RootState } from "../../redux/store";

// import { CountryDropdown } from "../ui/country-dropdown";
type Inputs = z.infer<typeof personalInformationSchema>;
const PersonalInformation = () => {
  const localizedContent = useSelector(selectLocalizedContent);
  const personalInformation = useSelector(
    (state: RootState) => state.personalInformation
  );
  const dispatch = useDispatch();

  const form = useForm<Inputs>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: { ...personalInformation?.data },
  });

  function onSubmit(data: Inputs) {
    console.log("data", data);
    dispatch(nextStep());
    dispatch(setPersonalInformation(data));
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 grid-cols-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <PageHeaderHeading>
          {localizedContent?.PERSONAL_INFORMATION}
        </PageHeaderHeading>
        <div className="grid col-span-2 md:grid-cols-2  gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.FULL_NAME}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={localizedContent?.NAME}
                    className="capitalize"
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.NATIONAL_ID}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={localizedContent?.NATIONAL_ID}
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.MOBILE_NUMBER}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={localizedContent?.MOBILE_NUMBER}
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.EMAIL_ID}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={localizedContent?.EMAIL_ID}
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.GENDER}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{localizedContent?.DATE_OF_BIRTH}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          size="xl"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.ADDRESS}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter Address"
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.COUNTRY}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter country"
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />

                  {/* <CountryDropdown
                    placeholder="Select a country"
                    defaultValue={field.value}
                    onChange={(country) => {
                      field.onChange(country.alpha3);
                    }}
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.STATE}</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Please enter state"
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.CITY}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter city"
                    maxLength={56}
                    {...field}
                    alt="secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="inline-block">
          <Button>{localizedContent?.NEXT_BUTTON}</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInformation;

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
import { familyAndFinancialSchema } from "../../utils/validations";
import type z from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../redux/features/stepState";

import { Button } from "../ui/button";
import { PageHeaderHeading } from "../ui/page-header";
import { selectLocalizedContent } from "../../redux/features/localizedContent";
import { setFamilyAndFinancial } from "../../redux/features/FamilyInformation";
import type { RootState } from "../../redux/store";
type Inputs = z.infer<typeof familyAndFinancialSchema>;
const FamilyAndFinancilaLInformation = () => {
  const localizedContent = useSelector(selectLocalizedContent);
  const familyInformation = useSelector(
    (state: RootState) => state.familyInformation
  );
  const dispatch = useDispatch();
  const form = useForm<Inputs>({
    resolver: zodResolver(familyAndFinancialSchema),
    defaultValues: { ...familyInformation.data },
  });

  function onSubmit(data: Inputs) {
    console.log("data", data);
    dispatch(setFamilyAndFinancial(data));
    dispatch(nextStep());
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 grid-cols-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <PageHeaderHeading>
          {localizedContent?.FAMILY_INFORMATION}
        </PageHeaderHeading>
        <div className="grid col-span-2 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.MARITAL_STATUS}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="female">Married</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dependents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.DEPENDENTS}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select no of dependents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.EMPLOYMENT_STATUS}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="selfEmployed">
                          Self employed
                        </SelectItem>
                        <SelectItem value="privateJob">Private job</SelectItem>
                        <SelectItem value="jobless">
                          Searching for job
                        </SelectItem>
                        <SelectItem value="business">own business</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.MONTHLY_INCOME}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter monthly income"
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
            name="housingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{localizedContent?.HOUSING_STATUS}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter housing status"
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
          <Button>Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default FamilyAndFinancilaLInformation;

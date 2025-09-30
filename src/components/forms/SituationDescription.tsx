import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { situationDescriptionSchema } from "../../utils/validations";
import type z from "zod";

import { Button } from "../ui/button";

import { Textarea } from "../ui/textarea";

import { useCallback, useState } from "react";
import { TextSuggestion } from "./TextSuggestionModal";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
type Inputs = z.infer<typeof situationDescriptionSchema>;
const SituationDescription = () => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fieldName, setFieldName] = useState<keyof Inputs>(
    "currentFinancialSituation"
  );

  const navigate = useNavigate();

  const form = useForm<Inputs>({
    resolver: zodResolver(situationDescriptionSchema),
    //ToDo fix this default values
    defaultValues: {},
  });

  function onSubmit(data: Inputs) {
    console.log("data", data);
    // dispatch(nextStep());
    navigate("/success");
  }
  const {
    currentFinancialSituation,
    employmentCircumstances,
    reasonForApplying,
  } = form.watch();
  const setValue = form.setValue;

  async function sendMessage(textarea: string) {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: textarea }],
        }),
      });

      const data = await res.json();
      setOpen(true);
      setReply(data.choices?.[0]?.message?.content ?? "No reply");
    } catch (err: any) {
      setReply("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const setFieldText = useCallback(
    (text: string) => {
      setValue(fieldName, text, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form, setFieldName, reply]
  );

  return (
    <Form {...form}>
      <TextSuggestion
        isOpen={open}
        suggetion={reply}
        setField={setFieldText}
        setOpen={setOpen}
      />
      <form
        className="grid gap-4 grid-cols-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="grid col-span-2 sm:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="currentFinancialSituation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your current financial situation"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="inline-block">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                sendMessage(currentFinancialSituation);
                setFieldName("currentFinancialSituation");
              }}
              disabled={!currentFinancialSituation || loading}
            >
              {loading && fieldName === "currentFinancialSituation" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Help me write
            </Button>
          </div>
        </div>
        <div className="grid col-span-2 sm:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="employmentCircumstances"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your employment circumstances"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="inline-block">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                sendMessage(employmentCircumstances);
                setFieldName("employmentCircumstances");
              }}
              disabled={!employmentCircumstances || loading}
            >
              {loading && fieldName === "employmentCircumstances" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Help me write
            </Button>
          </div>
        </div>
        <div className="grid col-span-2 sm:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your reason for applying"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="inline-block">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                sendMessage(reasonForApplying);
                setFieldName("reasonForApplying");
              }}
              disabled={!reasonForApplying || loading}
            >
              {loading && fieldName === "reasonForApplying" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Help me write
            </Button>
          </div>
        </div>
        <div className="inline-block">
          <Button>Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default SituationDescription;

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
import { situationDescriptionSchema } from "../../utils/validations";
import type z from "zod";

import { Button } from "../ui/button";

import { Textarea } from "../ui/textarea";

import { useCallback, useState } from "react";
import { TextSuggestion } from "./TextSuggestionModal";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { selectLocalizedContent } from "../../redux/features/localizedContent";
import { useDispatch, useSelector } from "react-redux";
import { setSituationDescription } from "../../redux/features/SituationDescription";
import type { RootState } from "../../redux/store";
import { useLocalization } from "../../hooks/useLocalization";
type Inputs = z.infer<typeof situationDescriptionSchema>;
const SituationDescription = () => {
  const localizedContent = useSelector(selectLocalizedContent);
  const { isLanguageIsArabic } = useLocalization();
  const situation = useSelector((state: RootState) => state.situation);
  const dispatch = useDispatch();
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
    defaultValues: { ...situation.data },
  });

  function onSubmit(data: Inputs) {
    console.log("data", data);
    dispatch(setSituationDescription(data));
    navigate("/success");
  }

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
          max_tokens: 150,
        }),
      });

      const data = await res.json();
      setOpen(true);
      setReply(data.choices?.[0]?.message?.content ?? "No reply");
    } catch (err) {
      if (err instanceof Error) {
        setReply("Error: " + err.message);
      } else {
        setReply("Error: " + String(err));
      }
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
        className=""
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <>
          <FormField
            control={form.control}
            name="currentFinancialSituation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Financial Situation</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Describe your current financial situation"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className={`inline-block absolute bottom-1 ${
                      isLanguageIsArabic ? "left-1" : "right-1"
                    }`}
                  >
                    <Button
                      type="button"
                      variant="gradient"
                      onClick={() => {
                        sendMessage(localizedContent?.FINANCIAL_PROMPT);
                        setFieldName("currentFinancialSituation");
                      }}
                      disabled={loading}
                    >
                      {loading && fieldName === "currentFinancialSituation" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Help me write
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <>
          <FormField
            control={form.control}
            name="employmentCircumstances"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Circumstances</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Describe your employment circumstances"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className={`inline-block absolute bottom-1 ${
                      isLanguageIsArabic ? "left-1" : "right-1"
                    }`}
                  >
                    <Button
                      type="button"
                      variant="gradient"
                      onClick={() => {
                        sendMessage(localizedContent?.EMPLOYMENT_PROMPT);
                        setFieldName("employmentCircumstances");
                      }}
                      disabled={loading}
                    >
                      {loading && fieldName === "employmentCircumstances" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Help me write
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <>
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Applying</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="Describe your reason for applying"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className={`inline-block absolute bottom-1 ${
                      isLanguageIsArabic ? "left-1" : "right-1"
                    }`}
                  >
                    <Button
                      type="button"
                      variant="gradient"
                      onClick={() => {
                        sendMessage(localizedContent?.REASON_PROMPT);
                        setFieldName("reasonForApplying");
                      }}
                      disabled={loading}
                    >
                      {loading && fieldName === "reasonForApplying" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Help me write
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
        <div className="inline-block">
          <Button>Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default SituationDescription;

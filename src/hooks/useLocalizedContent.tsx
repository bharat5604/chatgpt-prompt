import { useGetLocalizedContentQuery } from "../redux/service/strapiSlice";
import { useLocalization } from "./useLocalization";
import { useState } from "react";

export function useLocalizedContent() {
  const [start, _] = useState(0);
  const limit = 100;

  const { selectedLanguage } = useLocalization();

  const formattedLanguage = selectedLanguage?.startsWith("en")
    ? "en"
    : selectedLanguage;

  const { data, isSuccess, isLoading, isError, error } =
    useGetLocalizedContentQuery({
      language: formattedLanguage,
      start,
      limit,
    });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    language: formattedLanguage,
  };
}

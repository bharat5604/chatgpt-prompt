import { useGetLocalizedContentQuery } from "../redux/service/strapiSlice";
import { useLocalization } from "./useLocalization";
import { useEffect, useState } from "react";

export function useLocalizedContent() {
  const [start, setStart] = useState(0);
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

  // When language changes → reset pagination
  useEffect(() => {
    setStart(0);
  }, [selectedLanguage]);

  // Example: auto-increment pagination when data arrives
  useEffect(() => {
    if (isSuccess && data) {
      if (start + limit < (data.meta?.pagination?.total ?? 0)) {
        setStart((old) => old + limit);
      }
    }
  }, [isSuccess, data, start, limit]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    language: formattedLanguage,
  };
}

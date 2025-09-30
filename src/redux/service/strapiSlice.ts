import { createApi } from "@reduxjs/toolkit/query/react";
import { strapiArData, strapiEnData } from "../strapiDataV2";

export type StrapiParams = {
  language: string;
  start?: number;
  limit?: number;
};

export const strapiApiSlice = createApi({
  reducerPath: "strapiApiSlice",
  // no network baseQuery needed when data is local
  baseQuery: async () => ({ data: {} }),
  tagTypes: ["LocalizedContent"],
  endpoints: (build) => ({
    getLocalizedContent: build.query<any, StrapiParams>({
      // simple, synchronous resolution from local data
      queryFn: ({ language = "en" }) => {
        try {
          const localizationData =
            language === "ar" ? strapiArData : strapiEnData;

          return {
            data: {
              data: localizationData,
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: "LOCAL_DATA_ERROR",
              error: error?.message ?? String(error),
            },
          };
        }
      },
      providesTags: (_result, _error, { language }) => [
        { type: "LocalizedContent", id: language },
      ],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetLocalizedContentQuery } = strapiApiSlice;

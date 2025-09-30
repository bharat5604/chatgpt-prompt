import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { strapiArData, strapiEnData } from "../strapiDataV2";
export interface StrapiData {
  data: Record<string, unknown>;
}
export type StrapiParams = {
  language: string;
  start?: number;
  limit?: number;
};

const localBaseQuery: BaseQueryFn<
  void,
  unknown,
  { status: string; error: string }
> = async () => ({
  data: {},
});

export const strapiApiSlice = createApi({
  reducerPath: "strapiApiSlice",
  baseQuery: localBaseQuery,
  tagTypes: ["LocalizedContent"],
  endpoints: (build) => ({
    getLocalizedContent: build.query<StrapiData, StrapiParams>({
      queryFn: ({ language = "en" }) => {
        try {
          const localizationData =
            language === "ar" ? strapiArData : strapiEnData;

          return {
            data: {
              data: localizationData,
            },
          };
        } catch (error) {
          const err =
            error instanceof Error
              ? { status: "LOCAL_DATA_ERROR", error: error.message }
              : { status: "LOCAL_DATA_ERROR", error: String(error) };
          return { error: err };
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

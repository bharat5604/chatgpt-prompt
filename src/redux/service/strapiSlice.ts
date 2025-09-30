// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { STRAPI_API } from "@src/modules/core/api/constants";

// import { strapiArData, strapiEnData } from "../strapiDataV2";

// export type StrapiParams = {
//   language: string;
//   start: number;
//   limit: number;
// };

// export const strapiApiSlice = createApi({
//   reducerPath: "strapiApiSlice",
//   baseQuery: fetchBaseQuery({
//     baseUrl: STRAPI_API,
//   }),
//   tagTypes: ["LocalizedContent"],
//   endpoints: (build) => ({
//     getLocalizedContent: build.query<any, StrapiParams>({
//       queryFn: async ({ language }) => {
//         const result = await new Promise<Record<string, string>>((resolve) => {
//           const localizationData =
//             language === "ar" ? strapiArData : strapiEnData;

//           resolve({
//             data: localizationData as any,
//             meta: { pagination: { start: 0, limit: 10000, total: 1 } } as any,
//           });
//         });

//         return { data: result };
//       },
//     }),
//   }),
//   refetchOnMountOrArgChange: true,
// });

// export const { useGetLocalizedContentQuery } = strapiApiSlice;

// src/modules/core/store/strapiApiSlice.ts
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

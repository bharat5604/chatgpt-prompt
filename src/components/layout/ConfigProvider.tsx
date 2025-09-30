import { ConfigProvider } from "antd";
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";
import type { FC, ReactNode } from "react";
import { useLocalization } from "../../hooks/useLocalization";

interface RCLProviderProps {
  children: ReactNode;
}

export const RCLProvider: FC<RCLProviderProps> = ({ children }) => {
  const { isLanguageIsArabic } = useLocalization();

  return (
    <ConfigProvider
      locale={isLanguageIsArabic ? arEG : enUS}
      direction={isLanguageIsArabic ? "rtl" : "ltr"}
      theme={{
        components: {
          Table: {
            headerSplitColor: "transparent",
          },

          Menu: {
            borderRadius: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

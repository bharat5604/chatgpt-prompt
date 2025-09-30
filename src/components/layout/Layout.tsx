import { useLocalizedContent } from "../../hooks/useLocalizedContent";
import { Shell } from "../ui/Shell";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import i18n from "../../../i18n";

const Layout = () => {
  void i18n;
  useLocalizedContent();
  return (
    <main>
      <Navbar />
      <Shell>
        <Outlet />
      </Shell>
    </main>
  );
};

export default Layout;

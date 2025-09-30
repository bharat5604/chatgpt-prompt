import { useDispatch, useSelector } from "react-redux";
import { Shell } from "../ui/Shell";
import type { RootState } from "../../redux/store";
import { Button } from "../ui/button";
import { prevStep } from "../../redux/features/stepState";
import { useLocalization } from "../../hooks/useLocalization";
import { Globe } from "lucide-react";
import { PageHeaderHeading } from "../ui/page-header";
const Navbar = () => {
  const { step } = useSelector((state: RootState) => state.stepState);
  const dispatch = useDispatch();
  const { isLanguageIsArabic, toggleLanguage } = useLocalization();
  return (
    <Shell>
      <nav className="flex items-center justify-between border-b border-gray-300 bg-white rounded-xl py-4">
        <div>
          {step > 0 && (
            <Button variant="ghost" onClick={() => dispatch(prevStep())}>
              Back
            </Button>
          )}
        </div>
        <PageHeaderHeading className="bg-gradient-to-r from-primary via-destructive to-orange-500 bg-clip-text text-transparent">
          Chat GPT PROMPT
        </PageHeaderHeading>
        <Button
          variant="ghost"
          className="text-sm font-normal"
          onClick={() => toggleLanguage()}
        >
          <Globe size={18} />
          {isLanguageIsArabic ? "ENGLISH" : "عربي"}
        </Button>
      </nav>
    </Shell>
  );
};

export default Navbar;

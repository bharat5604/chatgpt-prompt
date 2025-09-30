import { useDispatch, useSelector } from "react-redux";
import { Shell } from "../ui/Shell";
import type { RootState } from "../../redux/store";
import { Button } from "../ui/button";
import { prevStep } from "../../redux/features/stepState";
import { useLocalization } from "../../hooks/useLocalization";

const Navbar = () => {
  const { step } = useSelector((state: RootState) => state.stepStateReducer);
  const dispatch = useDispatch();
  const { isLanguageIsArabic, toggleLanguage } = useLocalization();
  return (
    <Shell>
      <nav className="flex items-center justify-between border-b border-gray-300">
        <div>
          {step > 0 && (
            <Button variant="ghost" onClick={() => dispatch(prevStep())}>
              Back
            </Button>
          )}
        </div>
        <Button
          variant="ghost"
          className="text-sm font-normal"
          onClick={() => toggleLanguage()}
        >
          {isLanguageIsArabic ? "AR" : "EN"}
        </Button>
      </nav>
    </Shell>
  );
};

export default Navbar;

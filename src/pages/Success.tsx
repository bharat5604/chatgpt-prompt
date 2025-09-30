import { useDispatch, useSelector } from "react-redux";
import { selectLocalizedContent } from "../redux/features/localizedContent";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { resetStep } from "../redux/features/stepState";
import { resetPersonalInformation } from "../redux/features/PersonalInformation";
import { resetFamilyAndFinancial } from "../redux/features/FamilyInformation";
import { resetSituationDescription } from "../redux/features/SituationDescription";

const Success = () => {
  const localizedContent = useSelector(selectLocalizedContent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetStep());
    dispatch(resetPersonalInformation());
    dispatch(resetFamilyAndFinancial());
    dispatch(resetSituationDescription());
    navigate("/");
  };
  return (
    <div className="p-6 shadow border max-w-2/3 mx-auto rounded-2xl border-gray-300 bg-white">
      <h2 className="text-teal-700 text-lg text-center">
        {" "}
        {localizedContent?.THANK_YOU}
      </h2>
      <div className="text-center mt-2">
        <Button onClick={handleClick}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Success;

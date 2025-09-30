import { Steps } from "antd";
import PersonalInformation from "../components/forms/PersonalInformation";
import FamilyAndFinancilaLInformation from "../components/forms/FamilyAndFinancilaLInformation";
import SituationDescription from "../components/forms/SituationDescription";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { selectLocalizedContent } from "../redux/features/localizedContent";

const Homepage = () => {
  const localizedContent = useSelector(selectLocalizedContent);

  const step = useSelector((state: RootState) => state.stepState.step);

  const steps = [
    {
      title: `${localizedContent?.PERSONAL_INFORMATION}`,
      content: <PersonalInformation />,
    },
    {
      title: `${localizedContent?.FAMILY_INFORMATION}`,
      content: <FamilyAndFinancilaLInformation />,
    },
    {
      title: `${localizedContent?.SITUATION_DESCRIPTION}`,
      content: <SituationDescription />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={step} items={items} />
      <div className="border border-gray-200 p-6 mt-4 rounded-xl shadow-sm bg-white">
        {steps[step]?.content}
      </div>
    </>
  );
};

export default Homepage;

import { useSelector } from "react-redux";
import { selectLocalizedContent } from "../redux/features/localizedContent";

const Success = () => {
  const localizedContent = useSelector(selectLocalizedContent);
  return (
    <div className="p-6 shadow border max-w-2/3 mx-auto rounded-2xl border-gray-300">
      <h2 className="text-teal-700 text-lg text-center">
        {" "}
        {localizedContent?.THANK_YOU}
      </h2>
    </div>
  );
};

export default Success;

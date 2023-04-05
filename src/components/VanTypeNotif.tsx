import VanType from "../types/VanType";
import capitalize from "../utils/capitalize";
import vanTypeColoring from "../utils/vanTypeColoring";

type Props = {
  type: VanType;
};

function VanTypeNotif({ type }: Props) {
  return (
    <p
      className={`px-2 py-1 rounded-lg font-bold text-neutral-100 w-20 text-center ${vanTypeColoring(
        type
      )}`}
    >
      {capitalize(type)}
    </p>
  );
}

export default VanTypeNotif;

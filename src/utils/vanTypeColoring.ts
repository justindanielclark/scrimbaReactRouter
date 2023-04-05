import VanType from "../types/VanType";

export default function vanTypeColoring(type: VanType): string {
  switch (type) {
    case "simple": {
      return "bg-orange-500";
    }
    case "rugged": {
      return "bg-emerald-800";
    }
    case "luxury": {
      return "bg-black";
    }
    default: {
      throw new Error("Invalid van-type passed to vanTypeColoring.ts");
    }
  }
}

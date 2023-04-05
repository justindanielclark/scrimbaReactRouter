import VanType from "./VanType";
type Van = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: VanType;
  hostId: string;
};
export default Van;

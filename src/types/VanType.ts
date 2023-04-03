const types = ["simple", "rugged", "luxury"] as const;
type VanType = typeof types[number];

export default VanType;

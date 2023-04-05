import Month from "./Month";

type YearlyIncomeEntry = Partial<Record<Month, number>>;

type Income = Record<string, YearlyIncomeEntry>;

export default Income;

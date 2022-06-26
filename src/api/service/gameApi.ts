import { serviceInstance } from "../httpClient";
import { ICandleStickData } from "../../types/chartData";

export const getChartData = (feedSequence: number) => {
  return serviceInstance.get<ICandleStickData[], ICandleStickData[]>(
    `/get/coin/${feedSequence}`
  );
};

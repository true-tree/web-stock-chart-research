import React, { FC, useRef, useEffect, useState } from "react";
import { init, dispose, KLineData, Chart } from "klinecharts";
import generatedKLineDataList from "../utils/generatedKLineDataList";
import Layout from "../Layout";

// applyNewData(dataList, false), updateData(singleBarData) 써보기

// const kLineModel = {
//   open: prices[openIdx],
//   low: prices[0],
//   high: prices[3],
//   close: prices[closeIdx],
//   volume: volume,
//   timestamp
// }

const getTooltipOptions = () => {
  return {
    candle: {
      tooltip: {
        showType: "standard",
        showRule: "always",
        labels: ["open：", "close：", "diff"],
        values: (kLineData: KLineData) => {
          const change =
            ((kLineData.close - kLineData.open) / kLineData.open) * 100;
          return [
            { value: kLineData.open.toFixed(2) },
            { value: kLineData.close.toFixed(2) },
            {
              value: `${change.toFixed(2)}%`,
              color: change < 0 ? "#EF5350" : "#26A69A",
            },
          ];
        },
      },
    },
    technicalIndicator: {
      tooltip: {
        showRule: "always",
      },
    },
  };
};

const ChartPage: FC = () => {
  const chartDom = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  console.log(chartInstance);

  useEffect(() => {
    const chart = init(chartDom.current!);
    setChartInstance(chart!);

    if (chartInstance === undefined) return;
    chartInstance.createTechnicalIndicator("MA", false, {
      id: "candle_pane",
    });
    chartInstance.createTechnicalIndicator("KDJ", false, { height: 80 });
    chartInstance.setStyleOptions(getTooltipOptions());
    chartInstance.applyNewData(generatedKLineDataList());

    return () => {
      dispose(chartDom.current!);
    };
  }, [chartInstance]);

  return (
    <>
      <Layout title="Test">
        <div style={{ height: "500px" }} ref={chartDom} />
      </Layout>
    </>
  );
};

export default ChartPage;

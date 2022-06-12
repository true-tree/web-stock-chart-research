import React, { PureComponent } from "react";
import { init, dispose } from "klinecharts";
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

function getTooltipOptions(
  candleShowType,
  candleShowRule,
  technicalIndicatorShowRule
) {
  return {
    candle: {
      tooltip: {
        showType: "standard",
        showRule: "always",
        labels: ["open：", "close：", "diff"],
        values: (kLineData) => {
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
        showRule: technicalIndicatorShowRule,
      },
    },
  };
}

const rules = [
  { key: "always", text: "总是显示" },
  { key: "follow_cross", text: "跟随十字光标" },
  { key: "none", text: "不显示" },
];

export default class TooltipKLineChart extends PureComponent {
  state = {
    candleShowType: "standard",
    candleShowRule: "always",
    technicalIndicatorShowRule: "always",
  };

  componentDidMount() {
    const { candleShowType, candleShowRule, technicalIndicatorShowRule } =
      this.state;
    this.kLineChart = init("tooltip-k-line");
    this.kLineChart.createTechnicalIndicator("MA", false, {
      id: "candle_pane",
    });
    this.kLineChart.createTechnicalIndicator("KDJ", false, { height: 80 });
    this.kLineChart.setStyleOptions(
      getTooltipOptions(
        candleShowType,
        candleShowRule,
        technicalIndicatorShowRule
      )
    );
    this.kLineChart.applyNewData(generatedKLineDataList());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { candleShowType, candleShowRule, technicalIndicatorShowRule } =
      this.state;
    if (
      prevState.candleShowType !== candleShowType ||
      prevState.candleShowRule !== candleShowRule ||
      prevState.technicalIndicatorShowRule !== technicalIndicatorShowRule
    ) {
      this.kLineChart.setStyleOptions(
        getTooltipOptions(
          candleShowType,
          candleShowRule,
          technicalIndicatorShowRule
        )
      );
    }
  }

  componentWillUnmount() {
    dispose("tooltip-k-line");
  }

  render() {
    return (
      <Layout title="test">
        <div
          id="tooltip-k-line"
          className="k-line-chart"
          style={{ height: "500px" }}
        />
      </Layout>
    );
  }
}

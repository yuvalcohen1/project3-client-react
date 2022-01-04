import React, { FC } from "react";
import { BarChart } from "../../components/BarChart/BarChart";
import "./ReportsPage.css";

export const ReportsPage: FC = () => {
  return (
    <div id="bar-container">
      <BarChart />
    </div>
  );
};

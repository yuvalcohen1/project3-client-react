import Chart from "chart.js/auto";

import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { VacationModel } from "../../models/Vacation.model";

export const BarChart: FC = () => {
  useEffect(() => {
    const vacations = JSON.parse(
      localStorage.getItem("vacations") as string
    ) as VacationModel[];

    const followedVacations = vacations.filter(
      (vacation) => vacation.followersAmount > 0
    );

    const labels = followedVacations.map((vacation) => vacation.id);

    const data = {
      labels,
      datasets: [
        {
          label: "Amount of followers",
          data: followedVacations.map((vacation) => vacation.followersAmount),
          backgroundColor: "rgba(95,158,160, 0.5)",
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };

    new Chart("my-chart", config as any);
  }, []);

  return (
    <div
      id="chart"
      style={{ position: "relative", width: "80vw", height: "90vh" }}
    >
      <Link to="/manage-vacations" style={{ textDecoration: "none" }}>
        Back to the vacation editing page
      </Link>

      <canvas id="my-chart"></canvas>
    </div>
  );
};

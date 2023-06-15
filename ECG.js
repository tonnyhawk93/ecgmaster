import { Chart } from "chart.js/auto";
import { otvMapTitles } from "./constants";

export default class ECG {
  constructor(otv, ecg) {
    this.ecg = ecg;
    this.otv = otv;
    this.container = document.createElement("canvas");
    this.container.style.width = "1000px";
    this.container.style.height = "120px";
    this.container.id = otv;
    this.t = Array.from({ length: 1000 }, (_, i) => "");
    root.appendChild(this.container);
  }

  draw() {
    new Chart(document.getElementById(this.otv), {
      type: "line",
      data: {
        labels: this.t,
        datasets: [
          {
            label: this.otv,
            borderColor: "black",
            data: this.ecg[this.otv],
            borderWidth: 1,
            pointStyle: false,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: otvMapTitles[this.otv],
            align: "start",
          },
        },
        scales: {
          y: {
            stacked: true,
            ticks: {
              display: false,
            },
          },
          x: {
            stacked: true,
          },
        },
        barPercentage: 1,
      },
    });
  }
}

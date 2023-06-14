import "./style.css";
import { Chart } from "chart.js/auto";

document.querySelector("#app").innerHTML = `
  <div id="main">
  <h1>Загрузите ЭКГ</h1>
    <input id="fileinput" type="file">
    <a href="javascript:(print());" class="button-print"><button id="button">Печать</button></a>
  </div>
  <div id="root">
  </div>
`;

const keys = [
  "1",
  "2",
  "3",
  "avl",
  "avf",
  "avr",
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "name",
  "age",
  "id",
  "speed",
  "vol",
];

const otvs = ["1", "2", "3", "avl", "avf", "avr", "v1", "v2", "v3", "v4", "v5", "v6"];
const otvMapTitles = {
  1: "I",
  2: "II",
  3: "III",
  avl: "aVL",
  avf: "aVF",
  avr: "aVR",
  v1: "V1",
  v2: "V2",
  v3: "V3",
  v4: "V4",
  v5: "V5",
  v6: "V6",
};
const width = 1000;

const validateFile = (obj) => {
  return keys.every((key) => key in obj);
};

window.addEventListener("load", () => {
  fileinput.addEventListener("change", () => {
    let file = fileinput.files[0];
    if (!file) return;
    root.innerHTML = "";

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      const ecg = JSON.parse(reader.result);

      if (validateFile(ecg)) {
        for (let otv of otvs) {
          const container = document.createElement("canvas");
          container.style.width = "1000px";
          container.style.height = "120px";
          container.id = otv;
          const t = Array.from({ length: 1000 }, (_, i) => "");
          root.appendChild(container);
          new Chart(document.getElementById(otv), {
            type: "line",
            data: {
              labels: t,
              datasets: [
                {
                  label: otv,
                  borderColor: "black",
                  data: ecg[otv],
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
                  text: otvMapTitles[otv],
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
      } else {
        throw new Error("Файл экг не валидный");
      }
    };

    reader.onerror = function () {
      throw new Error("Ошибка загрузки файла");
    };
  });
});

window.addEventListener("error", (error) => {
  alert(error.message);
});

import "./style.css";
import { otvs } from "./constants";
import { validateFile } from "./viladtor";
import ECG from "./ECG";

document.querySelector("#app").innerHTML = `
  <div id="main">
  <h1>ЭКГ-мастер</h1>
    <input id="fileinput" type="file">
    <a href="javascript:(print());" class="button-print"><button id="button">Печать</button></a>
  </div>
  
  <div id="root">
  </div>
`;

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
          const otvCmp = new ECG(otv, ecg);
          otvCmp.draw();
        }
        res.style.display = "block";
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

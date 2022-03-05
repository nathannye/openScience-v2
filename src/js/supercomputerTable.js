import supercomputers from "./supercomputersData";

const table = document.getElementById("supercomputerTable");

supercomputers.forEach((computer) => {
  let tableRow = document.createElement("tr");

  let dataName = document.createElement("td");
  dataName.innerHTML = computer.name;
  tableRow.appendChild(dataName);

  let dataOps = document.createElement("td");

  let dataOpsTextContainer = document.createElement("span");
  dataOpsTextContainer.classList.add("opsText");
  dataOpsTextContainer.innerHTML = computer.flops;
  dataOps.appendChild(dataOpsTextContainer);

  tableRow.appendChild(dataOps);

  let dataBar = document.createElement("span");
  dataBar.classList.add("supercomputerDataBar");
  dataBar.style.width = (computer.flops / 1100) * 100 + "%";

  dataOps.appendChild(dataBar);

  table.appendChild(tableRow);
});

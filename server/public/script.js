// reading query string from url
const params = new URLSearchParams(document.location.search);
var config = params.get("config");
var bgcolor = params.get("bgcolor");
var fontColor = "black";

// selecting font color according to background contrast
if (bgcolor != null && bgcolor[3] == "(") {
  var colorSum = 0;
  var bgcolorRgb = bgcolor.replace("rgb(", "").replace(")", "").split(",");

  bgcolorRgb.forEach((Element) => {
    colorSum += parseInt(Element);
  });

  if (colorSum < 382) {
    fontColor = "white";
  }
}

// adding new css rule for font color
var style = document.createElement("style");
style.innerHTML =
  ".roofpig-count, .roofpig-help-button {color: " + fontColor + " !important;}";
document.head.appendChild(style);

// setting background color
document.querySelector("body").style.backgroundColor = bgcolor;

// creating roofpig div
var container = document.getElementById("container");

visualizer = document.createElement("div");
visualizer.classList.add("roofpig");
visualizer.style.color = "green";
// setting data-config attribute of roofpig to data query from the url
visualizer.setAttribute("data-config", config);

container.appendChild(visualizer);

// automatically play the algorithm
setTimeout(function () {
  document.getElementById("play-1").click();
}, 1000);

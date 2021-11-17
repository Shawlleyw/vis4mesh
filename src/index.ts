import { Controller } from "./controller/controller";
import { Grid } from "./display/layout/grid";
import { Display } from "./display/display";
import { Ticker } from "./controller/module/ticker";
import { Legend } from "./controller/module/legend";
import { LinearNormalize } from "./controller/module/normalize";
import { SmartSlider } from "./widget/smartslider";

let divGraph = document.getElementById("graph") as HTMLElement;
let c = new Controller("ws://127.0.0.1:8080/", new Display(divGraph, Grid));
let t = new Ticker();
c.loadModule(t).loadModule(new Legend()).loadModule(new LinearNormalize());
t.signalChange.get("state")!("still");

let divSlider = document.getElementById("slider") as HTMLElement;
let slider = new SmartSlider(divSlider, 100, [0, 1]);
setTimeout(() => {
  slider.setLeft(10);
}, 1000);
setTimeout(() => {
  slider.setRight(50);
}, 2000);

//
// Global Event
//

let flipCall = [
  function () {
    t.signalChange.get("state")!("auto");
  },
  function () {
    t.signalChange.get("state")!("pause");
  },
];
let flipIndex: number = 0;
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    flipCall[flipIndex]();
    flipIndex = (flipIndex + 1) % flipCall.length;
  }
  if (event.key == "ArrowRight") {
    t.signalChange.get("state")!("manual");
  }
});

import SideCanvas from "./sidecanvas";

class ClickInteraction {
  protected clearLastEvent: () => any;

  constructor() {
    this.clearLastEvent = () => {};
  }

  onNode(
    level: number,
    text: string,
    executeEvent: () => any,
    clearEvent: () => any
  ) {
    this.reset();
    executeEvent();

    SideCanvas.write(`<h9>${text}</h9>`);
    // if (level === 0) {
    //   SideCanvas.DisplayChord();
    // }
    this.clearLastEvent = clearEvent;
  }

  onEdge(text: string, executeEvent: () => any, clearEvent: () => any) {
    this.reset();
    executeEvent();

    SideCanvas.write(`<h9>${text}</h9>`);

    this.clearLastEvent = clearEvent;
  }

  reset() {
    console.log("reset interaction hit");
    this.clearLastEvent();
    this.clearLastEvent = () => {};
    // Back to overview
    SideCanvas.Clear();
  }
}

export default new ClickInteraction();

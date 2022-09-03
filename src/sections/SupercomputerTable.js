import gsap from "gsap";
import Component from "../classes/Component";

export default class SupercomputerTable extends Component {
  constructor() {
    super({
      element: "#supercomputerTable",
      elements: {},
    });
    this.tl = gsap.timeline();
    this.create();
    this.createSupercomputerTable();
  }

  create() {
    super.create();
  }

  createSupercomputerTable() {
    let t = gsap.to(this.element, {
      opacity: 0,
      duration: 2,
    });

    this.tl.add(t);

    console.log(this.tl);
  }
}

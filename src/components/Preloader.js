import Component from "../classes/Component";

export default class Preloader extends Component {
  constructor() {
    super({
      element: "",
      elements: {},
    });
    this.length = 0;
    this.create();
  }

  create() {
    super.create();
    this.createPreloader();
  }

  createPreloader() {}
}

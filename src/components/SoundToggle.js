import Component from "../classes/Component";

export default class SoundToggle extends Component {
  constructor() {
    super({
      element: "html",
      elements: {},
    });
  }

  create() {
    super.create();
    this.createAudio();
  }

  createAudio() {}

  toggleSound() {}
}

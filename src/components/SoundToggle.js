import Component from "../classes/Component";
import { Howl, Howler } from "howler";
import normalSound from "../audio/ambientSoundtrackLoop.mp3";
import darkSound from "../audio/darkSoundtrackLoop.mp3";

export default class SoundToggle extends Component {
  constructor() {
    super({
      element: "html",
      elements: {},
    });
    sound = this.sound;
    this.sound.normal = new Howl({
      src: [normalSound],
      loop: true,
    });
    this.sound.dark = new Howl({
      src: [normalSound],
      loop: true,
    });
  }

  create() {
    super.create();
    // this.createAudio();
    // this.sound = "no";
  }

  createAudio() {
    console.log(this.sound);
    const normalTrack = new Howl({
      src: [normalSound],
      loop: true,
    });
    const darkTrack = new Howl({
      src: [darkSound],
      loop: true,
    });
  }

  toggleSound() {}
}

import Component from "../classes/Component";
import { Howl, Howler } from "howler";
import normalSound from "../audio/ambientSoundtrackLoop.mp3";
import darkSound from "../audio/darkSoundtrackLoop.mp3";

export default class SoundToggle {
  constructor() {
    this.sound = {};
    this.sound.normal = new Howl({
      src: [normalSound],
      loop: true,
    });
    this.sound.dark = new Howl({
      src: [normalSound],
      loop: true,
    });
    // Default active track is normal one
    this.sound.active = this.sound.normal;
    this.sound.inactive = this.sound.dark;
    this.duration = 1000;
  }

  toggleSound(sound) {
    console.log(sound);

    if (sound) {
      this.sound.active.play();
      this.sound.active.fade(0, 1, this.duration);
    } else if (!sound) {
      this.sound.active.fade(1, 0, this.duration);
      setTimeout(() => {
        this.sound.active.pause();
      }, this.duration);
    }
  }

  changeActiveTrack(active) {

    if (this.sound.active === active) {
      
    } else if (!this.sound.active === active) {

      if(this.sound)

      this.sound.active = this.sound.dark
    }

  }
}

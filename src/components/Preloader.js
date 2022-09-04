import Component from "../classes/Component";

export default class Preloader extends Component {
  constructor() {
    super({
      element: "",
      elements: {
        images: "img",
      },
    });
    this.length = 0;
    this.create();
  }

  create() {
    super.create();
    this.createPreloader();
  }

  loadImages() {
    this.elements.images.forEach((img, i) => {
      img.onload = () => {
        console.log("loaded image");
      };
      img.src = img.getAttribute = "data-src";
    });
    // this.elements.img.getAttribute("data-src");
  }

  createPreloader() {}
}

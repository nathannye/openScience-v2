// import MotionPathPlugin from "gsap/MotionPathPlugin";
// import Lottie from "lottie-web";
// import gsap from "gsap";

// gsap.registerPlugin(MotionPathPlugin);

// function LottieScrollTrigger(vars, guidePathId) {
//   let guidePath = guidePathId;

//   let playhead = { frame: 0 },
//     target = gsap.utils.toArray(vars.target)[0],
//     speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
//     st = {
//       trigger: target,
//       pin: true,
//       start: "top top",
//       end: speeds[vars.speed] || "+=1000",
//       scrub: 1,
//     },
//     animation = Lottie.loadAnimation({
//       container: target,
//       renderer: vars.renderer || "svg",
//       loop: false,
//       autoplay: false,
//       path: vars.path,
//     });
//   for (let p in vars) {
//     // let users override the ScrollTrigger defaults
//     st[p] = vars[p];
//   }
//   animation.addEventListener("DOMLoaded", function () {
//     gsap.to(playhead, {
//       frame: animation.totalFrames - 1,
//       ease: "none",
//       onUpdate: () => animation.goToAndStop(playhead.frame, true),
//       motionPath: {
//         path: guidePath,
//       },
//       scrollTrigger: st,
//     });
//     // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
//     ScrollTrigger.sort();
//     ScrollTrigger.refresh();
//   });
//   return animation;
// }

// export default LottieScrollTrigger;

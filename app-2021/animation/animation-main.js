window.addEventListener("load", async () => {
  const naiveButton = document.getElementById("naive");
  const requestAnimationFrameButton = document.getElementById("requestAnimationFrame");
  const cssTransitionsButton = document.getElementById("cssTransitions");
  const cssAnimationsButton = document.getElementById("cssAnimations");
  const webAnimationsButton = document.getElementById("webAnimations");

  naiveButton.addEventListener("click", () => {
    const element = document.getElementById("naiveBlock");
    function changeOpacity() {
      element.style.opacity -= 0.01;
      if (element.style.opacity <= 0.3) {
        window.clearInterval(timeoutHandle);
      }
    }

    element.style.opacity = 1;
    const timeoutHandle = window.setInterval(changeOpacity, 20);
  });

  requestAnimationFrameButton.addEventListener("click", () => {
    const element = document.getElementById("requestAnimationFrameBlock");
    element.style.opacity = 1;

    function step() {
      element.style.opacity -= 0.01;

      if (element.style.opacity > 0.3) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  });

  cssTransitionsButton.addEventListener("click", () => {
    const element = document.getElementById("cssTransitionBlock");

    if (element.style.opacity === "0.3") {
      element.style.opacity = "1";
    } else {
      element.style.opacity = "0.3";
    }
  });

  cssAnimationsButton.addEventListener("click", () => {
    const element = document.getElementById("cssAnimationBlock");

    element.style.animationPlayState = "running";

    if (element.style.animationName === "fadeOut") {
      element.style.animationName = "fadeIn";
    } else {
      element.style.animationName = "fadeOut";
    }
  });

  let animation;

  webAnimationsButton.addEventListener("click", () => {
    const webAnimationBlock = document.getElementById("webAnimationBlock");
    const options = {
      duration: 1000,
      fill: "forwards",
    };
    const keyFrames = [{ opacity: 1 }, { opacity: 0.3 }];
    if (!animation) {
      animation = webAnimationBlock.animate(keyFrames, options);
    } else {
      animation.reverse();
    }
  });
});

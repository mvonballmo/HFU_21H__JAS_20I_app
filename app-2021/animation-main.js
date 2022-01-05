window.addEventListener("load", async () => {
  const naiveButton = document.getElementById("naive");
  const requestAnimationFrameButton = document.getElementById("requestAnimationFrame");

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
});

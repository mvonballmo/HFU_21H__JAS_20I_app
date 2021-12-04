import { application } from "./src/app.js";

const app = new application("http://localhost:3000/");

window.addEventListener("load", async () => {
  await app.initialize();
});

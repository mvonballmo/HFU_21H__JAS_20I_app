import { application } from "./src/application.js";

const app = new application("http://localhost:3000/");

window.addEventListener("load", async () => {
  await app.initialize();
});

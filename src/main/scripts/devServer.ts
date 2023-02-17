import { ChildProcess } from "child_process";
import { spawn } from "child_process";
const child = spawn("npm run nuxtDev", {
  shell: true,
  stdio: "inherit",
});
child.on("exit", function (code, signal) {
  console.log(
    "child process exited with " + `code ${code} and signal ${signal}`,
  );
});

const child2 = spawn("npm run startElectronDev", {
  shell: true,
  stdio: "inherit",
});
child2.on("exit", function (code, signal) {
  console.log(
    "child process exited with " + `code ${code} and signal ${signal}`,
  );
});

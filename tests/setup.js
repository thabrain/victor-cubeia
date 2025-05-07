import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./fixture.html"), "utf8");
document.body.innerHTML = html;

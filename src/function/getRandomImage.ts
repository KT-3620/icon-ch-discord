import * as fs from "fs";
import * as path from "path";

export function getRandomImage(): string {
  const imageFolderPath = path.join(__dirname, "../../image");
  const imageFiles = fs
    .readdirSync(imageFolderPath)
    .filter((file) => file.endsWith(".png"));
  const randomNum = Math.floor(Math.random() * imageFiles.length);
  const randomImageFileName = imageFiles[randomNum];
  return path.join(imageFolderPath, randomImageFileName);
}

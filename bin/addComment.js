import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), 'dist/index.js');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('无法读取文件:', err);
    return;
  }

  const comment = '#! /usr/bin/env node\n';
  const newData = comment + data;

  fs.writeFile(filePath, newData, 'utf8', (err) => {
    if (err) {
      console.error('无法写入文件:', err);
      return;
    }
  });
});

#! /usr/bin/env node
import {argv as $hgUW1$argv, cwd as $hgUW1$cwd} from "process";
import {Command as $hgUW1$Command} from "commander";
import $hgUW1$fsextra from "fs-extra";
import $hgUW1$path from "path";
import $hgUW1$jimp from "jimp";


var $df64573ef6d51081$exports = {};
$df64573ef6d51081$exports = JSON.parse('{"name":"@xxhls/image-transformer","version":"1.0.0","description":"","source":"src/index.ts","main":"dist/index.js","type":"module","types":"dist/index.d.ts","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","build":"pnpm run clear && parcel build && pnpm run insert","clear":"node bin/clearDist.js","insert":"node bin/addComment.js"},"bin":{"img-t":"dist/index.js"},"keywords":[],"author":"","license":"ISC","dependencies":{"chalk":"^5.3.0","commander":"^12.0.0","fs-extra":"^11.2.0","jimp":"^0.22.12"},"devDependencies":{"@parcel/packager-ts":"2.12.0","@parcel/transformer-typescript-types":"2.12.0","@types/commander":"^2.12.2","@types/fs-extra":"^11.0.4","@types/node":"^20.11.28","buffer":"^5.5.0||^6.0.0","events":"^3.1.0","parcel":"^2.12.0","path-browserify":"^1.0.0","process":"^0.11.10","ts-node":"^10.9.2","typescript":"^5.4.2"}}');



const $87c593608833b4ae$var$getFilesR = async (dir)=>{
    const files = await (0, $hgUW1$fsextra).readdir(dir);
    const result = [];
    for (const file of files){
        const filePath = `${dir}/${file}`;
        const stat = await (0, $hgUW1$fsextra).stat(filePath);
        if (stat.isDirectory()) {
            const subFiles = await $87c593608833b4ae$var$getFilesR(filePath);
            result.push(...subFiles);
        } else result.push(filePath);
    }
    return result;
};
const $87c593608833b4ae$var$getFiles = async (dir)=>{
    const files = await (0, $hgUW1$fsextra).readdir(dir);
    const result = [];
    for (const file of files){
        const filePath = `${dir}/${file}`;
        const stat = await (0, $hgUW1$fsextra).stat(filePath);
        if (stat.isDirectory()) continue;
        result.push(filePath);
    }
    return result;
};
const $87c593608833b4ae$var$getFilesAfterFilter = async (dir, filter, recursionFlag)=>{
    const files = await (recursionFlag ? $87c593608833b4ae$var$getFilesR(dir) : $87c593608833b4ae$var$getFiles(dir));
    return files.filter((file)=>filter.test(file)).map((file)=>file.replace(/\\/g, "/"));
};
var $87c593608833b4ae$export$2e2bcd8739ae039 = $87c593608833b4ae$var$getFilesAfterFilter;



const $fb32508177e497d5$var$getFileType = (filePath)=>{
    const ext = (0, $hgUW1$path).extname(filePath);
    return ext.slice(1);
};
var $fb32508177e497d5$export$2e2bcd8739ae039 = $fb32508177e497d5$var$getFileType;



const $b303505768f2368e$var$transformer = async (filePath, target)=>{
    const image = await (0, $hgUW1$jimp).read(filePath);
    const outputPath = filePath.replace(/\.\w+$/, `.${target}`);
    await image.writeAsync(outputPath);
};
const $b303505768f2368e$var$transformerMap = new Map([
    [
        "jpg",
        $b303505768f2368e$var$transformer
    ],
    [
        "jpeg",
        $b303505768f2368e$var$transformer
    ],
    [
        "png",
        $b303505768f2368e$var$transformer
    ],
    [
        "bmp",
        $b303505768f2368e$var$transformer
    ],
    [
        "tiff",
        $b303505768f2368e$var$transformer
    ],
    [
        "gif",
        $b303505768f2368e$var$transformer
    ]
]);
var $b303505768f2368e$export$2e2bcd8739ae039 = $b303505768f2368e$var$transformerMap;



const $149c1bd638913645$var$main = async ()=>{
    const program = new (0, $hgUW1$Command)();
    program.name((0, $df64573ef6d51081$exports.name)).version((0, $df64573ef6d51081$exports.version)).description((0, $df64573ef6d51081$exports.description)).requiredOption("--name <pattern>", "the name of the file, which can be a regular expression").requiredOption("--target <target>", "the converted target format").option("--recursion <recursion>", "whether to recursion or not, the default is false", "false").parse($hgUW1$argv);
    const options = program.opts();
    const { name: pattern, recursion: recursion } = options;
    const patternReg = new RegExp(pattern);
    const recursionFlag = recursion === "true" ? true : false;
    const files = await (0, $87c593608833b4ae$export$2e2bcd8739ae039)($hgUW1$cwd(), patternReg, recursionFlag);
    console.log("files", files);
    files.forEach(async (file)=>{
        const fileType = (0, $fb32508177e497d5$export$2e2bcd8739ae039)(file);
        if (fileType === options.target) return;
        const transformer = (0, $b303505768f2368e$export$2e2bcd8739ae039).get(fileType);
        if (!transformer) {
            console.log(`Unsupported file type: ${fileType}`);
            return;
        }
        await transformer(file, options.target);
    });
};
$149c1bd638913645$var$main();


//# sourceMappingURL=index.js.map

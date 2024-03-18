#! /usr/bin/env node
import {cwd as $hgUW1$cwd, argv as $hgUW1$argv, exit as $hgUW1$exit} from "process";
import {Command as $hgUW1$Command} from "commander";
import $hgUW1$fsextra from "fs-extra";
import $hgUW1$path from "path";
import $hgUW1$chalk from "chalk";
import $hgUW1$jimp from "jimp";


var $df64573ef6d51081$exports = {};
$df64573ef6d51081$exports = JSON.parse('{"name":"@xxhls/image-transformer","version":"1.0.0","description":"","source":"src/index.ts","main":"dist/index.js","type":"module","types":"dist/index.d.ts","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","build":"pnpm run clear && parcel build && pnpm run insert","clear":"node bin/clearDist.js","insert":"node bin/addComment.js"},"bin":{"img-t":"dist/index.js"},"keywords":[],"author":"","license":"ISC","dependencies":{"chalk":"^5.3.0","commander":"^12.0.0","fs-extra":"^11.2.0","jimp":"^0.22.12"},"devDependencies":{"@parcel/packager-ts":"2.12.0","@parcel/transformer-typescript-types":"2.12.0","@types/commander":"^2.12.2","@types/fs-extra":"^11.0.4","@types/node":"^20.11.28","buffer":"^5.5.0||^6.0.0","events":"^3.1.0","parcel":"^2.12.0","path-browserify":"^1.0.0","process":"^0.11.10","ts-node":"^10.9.2","typescript":"^5.4.2"}}');



const $3d5f0f54962d6611$export$54cf0fce7b972b70 = async (dir, recursionFlag)=>{
    const dirents = await (0, $hgUW1$fsextra).readdir(dir, {
        withFileTypes: true
    });
    const files = await Promise.all(dirents.map((dirent)=>{
        const res = `${dir}/${dirent.name}`;
        return dirent.isDirectory() && recursionFlag ? $3d5f0f54962d6611$export$54cf0fce7b972b70(res, recursionFlag) : res;
    }));
    return Array.prototype.concat(...files);
};



const $1322af845bb6b9fd$export$89627d0c99cb1996 = async (dirs)=>{
    const files = [];
    for (const dir of dirs){
        const state = (0, $hgUW1$fsextra).lstatSync(dir);
        if (!state.isDirectory()) files.push(dir);
    }
    return files;
};



const $b7a65e68252004f2$export$d3156cc1d0cfdd9c = (files, name)=>{
    const patternReg = new RegExp(name);
    return files.filter((file)=>{
        console.log((0, $hgUW1$path).basename(file));
        return patternReg.test((0, $hgUW1$path).basename(file));
    });
};



/**
 * 获取文件拓展名
 * @param file 文件路径
 * @returns 拓展名
 */ const $b8719bb8939b5d7d$export$5f7821c344028c56 = (file)=>{
    return (0, $hgUW1$path).extname(file).slice(1);
};



const $13168db1829b0fee$export$a80b3bd66acc52ff = (message)=>{
    console.log((0, $hgUW1$chalk).white.bgGray.bold(" INFO  	"), (0, $hgUW1$chalk).gray(message));
};
const $13168db1829b0fee$export$1c9f709888824e05 = (message)=>{
    console.log((0, $hgUW1$chalk).white.bgBlue.bold(" DEBUG 	"), (0, $hgUW1$chalk).blue(message));
};
const $13168db1829b0fee$export$c106dd0671a0fc2d = (message)=>{
    console.log((0, $hgUW1$chalk).white.bgYellow.bold(" WARN  	"), (0, $hgUW1$chalk).yellow(message));
};
const $13168db1829b0fee$export$a3bc9b8ed74fc = (message)=>{
    console.log((0, $hgUW1$chalk).white.bgRed.bold(" ERROR 	"), (0, $hgUW1$chalk).red(message));
};





const $e4d2b7dd3fbcf7ae$var$transformer_jpeg_jpg_png_bmp_tiff_gif = async (filePath, target)=>{
    const image = await (0, $hgUW1$jimp).read(filePath);
    const outputPath = filePath.replace(/\.\w+$/, `.${target}`);
    if ((0, $hgUW1$fsextra).existsSync(outputPath)) {
        (0, $13168db1829b0fee$export$c106dd0671a0fc2d)(`File already exists: ${outputPath}, and it will be overwritten`);
        (0, $hgUW1$fsextra).removeSync(outputPath);
    }
    await image.writeAsync(outputPath);
};
var $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039 = $e4d2b7dd3fbcf7ae$var$transformer_jpeg_jpg_png_bmp_tiff_gif;


const $b303505768f2368e$var$transformerMap = new Map([
    [
        "jpg",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ],
    [
        "jpeg",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ],
    [
        "png",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ],
    [
        "bmp",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ],
    [
        "tiff",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ],
    [
        "gif",
        (0, $e4d2b7dd3fbcf7ae$export$2e2bcd8739ae039)
    ]
]);
var $b303505768f2368e$export$2e2bcd8739ae039 = $b303505768f2368e$var$transformerMap;



// 主函数
const $149c1bd638913645$var$main = async ()=>{
    const program = new (0, $hgUW1$Command)();
    program.name((0, $df64573ef6d51081$exports.name)).version((0, $df64573ef6d51081$exports.version)).description((0, $df64573ef6d51081$exports.description)).requiredOption("--name <_name>", "the name of the file, which can be a regular expression").requiredOption("--target <_target>", "the converted target format").option("--path <_path>", "the path of the file, the default is the current directory", $hgUW1$cwd()).option("--recursion <_recursion>", "whether to recursion or not, the default is false", "false").parse($hgUW1$argv);
    const options = program.opts();
    /**
     * @type {string} _name 文件名
     * @type {string} _target 目标格式
     * @type {string} _path 文件路径
     * @type {string} _recursion 是否递归
     */ const { name: _name, target: _target, path: _path, recursion: _recursion } = options;
    // 预览参数
    (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`name: ${_name}, target: ${_target}, path: ${_path}, recursion: ${_recursion}`);
    // 获取所有文件
    const files = await (0, $1322af845bb6b9fd$export$89627d0c99cb1996)(await (0, $3d5f0f54962d6611$export$54cf0fce7b972b70)(_path, _recursion === "true" ? true : false));
    (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`Find ${files.length} files`);
    files.forEach((file)=>{
        (0, $13168db1829b0fee$export$1c9f709888824e05)(file);
    });
    // 过滤文件
    const filterFiles = (0, $b7a65e68252004f2$export$d3156cc1d0cfdd9c)(files, _name);
    (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`Find ${filterFiles.length} files after filter`);
    filterFiles.forEach((file)=>{
        (0, $13168db1829b0fee$export$1c9f709888824e05)(file);
    });
    // 检测文件类型
    const supportedTypes = Array.from((0, $b303505768f2368e$export$2e2bcd8739ae039).keys());
    filterFiles.forEach((file)=>{
        const ext = (0, $b8719bb8939b5d7d$export$5f7821c344028c56)(file);
        if (!supportedTypes.includes(ext)) {
            (0, $13168db1829b0fee$export$c106dd0671a0fc2d)(`Unsupported file type: ${ext}`);
            $hgUW1$exit(1);
        }
    });
    let finished = 0;
    // 转换文件
    (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`Start converting files`);
    filterFiles.forEach(async (file)=>{
        const ext = (0, $b8719bb8939b5d7d$export$5f7821c344028c56)(file);
        const transformer = (0, $b303505768f2368e$export$2e2bcd8739ae039).get(ext);
        await transformer(file, _target);
        finished++;
        if (finished === filterFiles.length) {
            (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`Converted ${finished} files`);
            (0, $13168db1829b0fee$export$a80b3bd66acc52ff)("All files have been converted");
        } else (0, $13168db1829b0fee$export$a80b3bd66acc52ff)(`Converted ${finished} files`);
    });
};
$149c1bd638913645$var$main();


//# sourceMappingURL=index.js.map

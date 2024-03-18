import { Command } from 'commander';
import { name, version, description } from '../package.json';
import { getAllFiles } from './utils/getAllFiles';
import { removeDirs } from './utils/removeDirs';
import { filterFileName } from './utils/filterFileName';
import { getFileExtension } from './utils/getFileExtension';
import { info, debug, error, warn } from './log/index';
import transformerMap from './core';

// 主函数
const main = async () => {
    const program = new Command();

    program
        .name(name)
        .version(version)
        .description(description)
        .requiredOption('--name <_name>', 'the name of the file, which can be a regular expression')
        .requiredOption('--target <_target>', 'the converted target format')
        .option('--path <_path>', 'the path of the file, the default is the current directory', process.cwd())
        .option('--recursion <_recursion>', 'whether to recursion or not, the default is false', 'false')
        .parse(process.argv);

    const options = program.opts();
    
    /**
     * @type {string} _name 文件名
     * @type {string} _target 目标格式
     * @type {string} _path 文件路径
     * @type {string} _recursion 是否递归
     */
    const { name: _name, target: _target, path: _path, recursion: _recursion } = options;

    // 预览参数
    info(`name: ${_name}, target: ${_target}, path: ${_path}, recursion: ${_recursion}`);

    // 获取所有文件
    const files = await removeDirs(await getAllFiles(_path, _recursion === 'true' ? true : false));
    info(`Find ${files.length} files`);
    files.forEach((file) => {
        debug(file);
    });

    // 过滤文件
    const filterFiles = filterFileName(files, _name);
    info(`Find ${filterFiles.length} files after filter`);
    filterFiles.forEach((file) => {
        debug(file);
    });

    // 检测文件类型
    const supportedTypes = Array.from(transformerMap.keys());
    filterFiles.forEach((file) => {
        const ext = getFileExtension(file);
        if (!supportedTypes.includes(ext)) {
            warn(`Unsupported file type: ${ext}`);
            process.exit(1);
        }
    });

    let finished = 0;
    // 转换文件
    info(`Start converting files`);
    filterFiles.forEach(async (file) => {
        const ext = getFileExtension(file);
        const transformer = transformerMap.get(ext)!;
        await transformer(file, _target);
        finished++;
        if (finished === filterFiles.length) {
            info(`Converted ${finished} files`);
            info('All files have been converted');
        } else {
            info(`Converted ${finished} files`);
        }
    });
};

main();

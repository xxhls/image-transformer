import { Command } from 'commander';
import { name, version, description } from '../package.json';
import getFilesAfterFilter from './utils/getFiles';
import getFileType from './utils/getFileType';
import transformerMap from './core';

const main = async () => {
    const program = new Command();

    program
        .name(name)
        .version(version)
        .description(description)
        .requiredOption('--name <pattern>', 'the name of the file, which can be a regular expression')
        .requiredOption('--target <target>', 'the converted target format')
        .option('--recursion <recursion>', 'whether to recursion or not, the default is false', 'false')
        .parse(process.argv);

    const options = program.opts();
    const { name: pattern, recursion } = options;

    const patternReg = new RegExp(pattern);

    const recursionFlag = recursion === 'true' ? true : false;

    const files = await getFilesAfterFilter(process.cwd(), patternReg, recursionFlag);
    console.log("files", files);
    
    files.forEach(async (file) => {
        const fileType = getFileType(file);

        if (fileType === options.target) return;

        const transformer = transformerMap.get(fileType);
        if (!transformer) {
            console.log(`Unsupported file type: ${fileType}`);
            return;
        }

        await transformer(file, options.target);
    });
};

main();

import fs from 'fs-extra';

const getFilesR = async (dir: string): Promise<string[]> => {
    const files = await fs.readdir(dir);
    const result: string[] = [];

    for (const file of files) {
        const filePath = `${dir}/${file}`;
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            const subFiles = await getFilesR(filePath);
            result.push(...subFiles);
        } else {
            result.push(filePath);
        }
    }

    return result;
};

const getFiles = async (dir: string): Promise<string[]> => {
    const files = await fs.readdir(dir);
    const result: string[] = [];

    for (const file of files) {
        const filePath = `${dir}/${file}`;
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            continue;
        }

        result.push(filePath);
    }

    return result;
};

const getFilesAfterFilter = async (dir: string, filter: RegExp, recursionFlag: boolean): Promise<string[]> => {
    const files = await (recursionFlag ? getFilesR(dir) : getFiles(dir));
    return files.filter((file) => filter.test(file)).map((file) => file.replace(/\\/g, '/'));
}

export default getFilesAfterFilter;

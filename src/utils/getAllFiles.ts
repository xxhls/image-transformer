import fs from 'fs-extra';
import { warn } from '../log';

export const getAllFiles = async (dir: string, recursionFlag: boolean): Promise<string[]> => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents.map((dirent) => {
            const res = `${dir}/${dirent.name}`;
            return dirent.isDirectory() && recursionFlag ? getAllFiles(res, recursionFlag) : res;
        })
    );
    return Array.prototype.concat(...files);
};

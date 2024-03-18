import fs from 'fs-extra';
import path from 'path';

export const removeDirs = async (dirs: string[]): Promise<string[]> => {
    const files: string[] = [];
    
    for (const dir of dirs) {
        const state = fs.lstatSync(dir); 
        if (!state.isDirectory()) {
            files.push(dir);
        } 
    }

    return files;
};

import path from "path";

export const filterFileName = (files: string[], name: string): string[] => {
    const patternReg = new RegExp(name);

    return files.filter((file) => {
        return patternReg.test(path.basename(file));
    });
};

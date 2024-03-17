import path from "path";

const getFileType = (filePath: string) => {
    const ext = path.extname(filePath);
    return ext.slice(1);
};

export default getFileType;

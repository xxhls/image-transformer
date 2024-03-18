import path from "path";

/**
 * 获取文件拓展名
 * @param file 文件路径
 * @returns 拓展名
 */
const getFileExtension = (file: string): string => {
    return path.extname(file).slice(1);
};

export { getFileExtension };

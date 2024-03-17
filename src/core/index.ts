import Jimp from "jimp";

const transformer = async (filePath: string, target: string) => {
    const image = await Jimp.read(filePath);
    const outputPath = filePath.replace(/\.\w+$/, `.${target}`);
    await image.writeAsync(outputPath);
};

const transformerMap = new Map<string, typeof transformer>([
    ["jpg", transformer],
    ["jpeg", transformer],
    ["png", transformer],
    ["bmp", transformer],
    ["tiff", transformer],
    ["gif", transformer],
    // ["webp", transformer],
    // ["avif", transformer],
    // ["jxl", transformer],
]);

export default transformerMap;

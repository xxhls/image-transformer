import Jimp from "jimp";

export const JPT2 = async (filePath: string, target: string) => {
    const image = await Jimp.read(filePath);
    const outputPath = filePath.replace(/\.\w+$/, `.${target}`);
    await image.writeAsync(outputPath);
};

import Jimp from "jimp";
import { warn } from "../log";
import fs from 'fs-extra'

const transformer_jpeg_jpg_png_bmp_tiff_gif = async (filePath: string, target: string) => {
    const image = await Jimp.read(filePath);
    const outputPath = filePath.replace(/\.\w+$/, `.${target}`);
    if (fs.existsSync(outputPath)) {
        warn(`File already exists: ${outputPath}, and it will be overwritten`);
        fs.removeSync(outputPath);
    }
    await image.writeAsync(outputPath);
};

export default transformer_jpeg_jpg_png_bmp_tiff_gif;

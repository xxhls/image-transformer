import transformer_jpeg_jpg_png_bmp_tiff_gif from "./JPEG_JPG_PNG_BMP_TIFF_GIF";

type Transformer = (filePath: string, target: string) => Promise<void>;

const transformerMap = new Map<string, Transformer>([
    ["jpg", transformer_jpeg_jpg_png_bmp_tiff_gif],
    ["jpeg", transformer_jpeg_jpg_png_bmp_tiff_gif],
    ["png", transformer_jpeg_jpg_png_bmp_tiff_gif],
    ["bmp", transformer_jpeg_jpg_png_bmp_tiff_gif],
    ["tiff", transformer_jpeg_jpg_png_bmp_tiff_gif],
    ["gif", transformer_jpeg_jpg_png_bmp_tiff_gif],
]);

export default transformerMap;

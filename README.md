# IMAGE-TRANSFORMER

## Introduction

A tool to modify the format of an image from the command line

## Guide

```shell
npm install @xxhls/image-transformer -g

img-t --name='.*.tiff' --target='png' --path='./images' --recursion='true'
```

## Param

- `--name`: the name of the file, which can be a regular expression
- `--target`: the converted target format
- `--path`: the path of the file, the default is the current directory
- `--recursion`: whether to recursion or not, the default is false

## Examples

### Transform .png to jpeg

```shell
img-t --name='.*.png' --target='jpeg'
```

### Transform .png to jpeg by relatived path

```shell
img-t --name='.*.png' --target='jpeg' --path='./images-test'
```

### Transform .tiff to png by absolute path

```shell
img-t --name='.*.tiff' --target='png' --path='E:\Projects\image-transformer\images-test'
```

### Transform .jpeg to png by relatived path recursively

```shell
img-t --name='.*.jpeg' --target='png' --path='E:\Projects\image-transformer\images-test' --recursion='true'
```

### Transform .png&.tiff to bmp by relatived path recursively

```shell
img-t --name='.*.(png|tiff)' --target='bmp' --path='E:\Projects\image-transformer\images-test' --recursion='true'
```

## Support List

- `JPEG`
- `JPG`
- `PNG`
- `BMP`
- `TIFF`
- `GIF`

## CHANGELOG

- v1.1.0: finish the most function
- v1.0.0: support the basic use

## LICENSE

[MIT LICENSE](https://mit-license.org/)

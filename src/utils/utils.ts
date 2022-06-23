import {IImage} from "../store/reducers/models";

export const NewImage = (img: HTMLImageElement) => {
  let aspectRatio = img.width / img.height
  if (img.width > 1280 || img.height > 720) {
    if (aspectRatio > 1.77) {
      img.width = 1280
      img.height = 1280 / aspectRatio
    } else {
      img.width = 720 * aspectRatio
      img.height = 720
    }
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  context!.drawImage(img,
    0,
    0,
    img.width,
    img.height
  );
  let cURL = canvas.toDataURL()

  let newImage: IImage = {src: cURL, width: img.width, height: img.height, annotations: []}
  return newImage
}
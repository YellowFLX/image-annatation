import useImage from "use-image";
import {Image} from "react-konva";
import {IRect} from "konva/lib/types";

export const ImageBySrc = ({src, crop}: { src: string, crop: IRect }) => {
  const [image] = useImage(src);
  return <Image image={image} crop={crop}/>;
}

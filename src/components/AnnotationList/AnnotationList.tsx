import {Annotation, AnnotationListWrapper, ColoredClose, Preview} from "./style";
import React, {Dispatch, SetStateAction} from "react";
import {IImage, IRectangle} from "../../store/reducers/models";
import {Layer, Stage} from "react-konva";
import {ImageBySrc} from "../ImageBySrc";

type Props = {
  rects: IRectangle[]
  setRects: Dispatch<SetStateAction<IRectangle[]>>
  focus: string
  setFocus: Dispatch<SetStateAction<string>>
  img: IImage
}

export function AnnotationList({rects, setRects, focus, setFocus, img}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const {name, value} = e.target
    setRects(
      rects.map(rect =>
        rect.id === name
          ? {...rect, label: value}
          : rect
      ))
  }

  return (
    <AnnotationListWrapper offset={img.width}>
      {rects.map(rect =>
        <Annotation
          key={rect.id}
          focus={focus === rect.id}
          onClick={() => setFocus(rect.id)}
        >
          <Preview>
            <Stage width={37} height={37}>
              <Layer>
                <ImageBySrc
                  src={img.src}
                  crop={{
                    x: Math.min(rect.x1, rect.x2),
                    y: Math.min(rect.y1, rect.y2),
                    width: Math.abs(rect.x1 - rect.x2) * img.width / 37,
                    height: Math.abs(rect.y1 - rect.y2) * img.height / 37,
                  }}
                />
              </Layer>
            </Stage>
          </Preview>
          {focus === rect.id ?
            <input
              list="tag-list"
              autoFocus
              type="text"
              placeholder="label"
              name={rect.id}
              defaultValue={rect.label}
              maxLength={30}
              onFocus={e => {
                e.target.select();
              }}
              onChange={handleChange}
              onKeyPress={({key}) => {
                if (key === "Enter") setFocus("")
              }}
            />
            :
            <h2>{rect.label}</h2>
          }
          <datalist id="tag-list">
            <option value="Авакадо"></option>
            <option value="Ананас"></option>
            <option value="Апельсин"></option>
            <option value="Банан"></option>
            <option value="Гранат"></option>
            <option value="Груша"></option>
            <option value="Киви"></option>
            <option value="Клубника"></option>
            <option value="Лайм"></option>
            <option value="Лимон"></option>
            <option value="Яблоко"></option>
          </datalist>
          <ColoredClose size={37} onClick={() => {
            setRects(rects.filter(value => value.id !== rect.id))
          }}/>
        </Annotation>
      )}
    </AnnotationListWrapper>
  );
}
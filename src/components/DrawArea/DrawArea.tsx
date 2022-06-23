import React, {useEffect, useRef, useState} from "react";
import {Group, Layer, Rect, Stage, Text} from 'react-konva';
import AnnotationList from "../AnnotationList";
import {DrawAreaWrapper} from "./style"
import {EmptyRectangle, IImage, IRectangle} from "../../store/reducers/models";
import {v4 as uuidV4} from "uuid";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAction";

type DrawAreaProps = {
  setImages?: React.Dispatch<React.SetStateAction<IImage[]>>
}


export function DrawArea({setImages}: DrawAreaProps) {
  const images = useTypedSelector(store => store.images.images)
  const currentImage = useTypedSelector(store => store.images.currentImage)
  const annotations = useTypedSelector(store => store.images.currentImage.annotations)
  const {setAnnotations} = useActions()

  const [rects, setRects] = useState<IRectangle[]>(annotations);
  const [newRect, setNewRect] = useState<IRectangle>(EmptyRectangle);
  const [moving, setMoving] = useState(false);
  const [focus, setFocus] = useState("");


  useEffect(() => {
      if (images.length > 0) setRects(currentImage.annotations)
    }, [currentImage]
  )
  useEffect(() => {
      setAnnotations(rects)
    }, [rects]
  )


  // useEffect(() => {
  //     setImages(
  //       images.map(image =>
  //         image.src === currentImage.src
  //           ? {...image, annotations: rects}
  //           : image
  //       ))
  //   }, [rects]
  // )


  const refStage = useRef(null)
  const handleMouseDown = () => {
    setMoving(true)
    // @ts-ignore: Object is possibly 'null'.
    let {x, y} = refStage.current.getPointerPosition()
    let _id = uuidV4()

    setNewRect({
      ...EmptyRectangle,
      x1: Math.floor(x),
      y1: y,
      x2: x,
      y2: y,
      id: _id
    })
    setFocus(_id)
  }

  const handleMouseMove = () => {
    if (moving) {
      // @ts-ignore: Object is possibly 'null'.
      let {x, y} = refStage.current.getPointerPosition()

      if (Math.floor(x) !== newRect.x1 && y !== newRect.y1) {
        setNewRect({...newRect, x2: Math.floor(x), y2: y, label: ""})
        setRects([...rects.slice(0, 10).filter(rect => rect.id !== newRect.id), newRect])
      }
    }
  }

  const handleMouseUp = () => {
    setMoving(false)
    setAnnotations(rects)
  }

  return (
    <DrawAreaWrapper onMouseUp={handleMouseUp}>
      <img src={currentImage.src} alt="" height={currentImage.height}/>
      {currentImage.width === 0 ? null : <Stage
        ref={refStage}
        width={currentImage.width}
        height={currentImage.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {rects.map((rect) => (
            <Group
              key={rect.id + 2}
              name={rect.id}
              onClick={() => setFocus(rect.id)}
              onDblClick={() => {
                setRects(rects.filter(value => value.id !== rect.id))
              }}
            >
              <Rect
                name={rect.id}
                x={rect.x1}
                y={rect.y1}
                width={rect.x2 - rect.x1}
                height={rect.y2 - rect.y1}
                fill="white"
                stroke={rect.id === focus ? "blue" : "none"}
                opacity={0.5}
              />
              <Text
                text={rect.label}
                name={rect.id}
                x={Math.min(rect.x1, rect.x2) + 5}
                y={Math.min(rect.y1, rect.y2) + 5}
                fontSize={50}
                scale={{x: 0.5, y: 0.5}}
                fill="white"
                shadowColor="black"
                shadowBlur={5}
              ></Text>
            </Group>

          ))}
        </Layer>
      </Stage>}
      <AnnotationList
        img={currentImage}
        rects={rects}
        setRects={setRects}
        focus={focus}
        setFocus={setFocus}
      />
    </DrawAreaWrapper>
  );
}
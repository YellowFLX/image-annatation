import {ColoredClose, ColoredUpload, ImageListWrapper, ImageWrapper} from "./style";
import React, {useEffect, useRef} from "react";
import {EmptyImage, IRectangle} from "../../store/reducers/models";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAction";
import {NewImage} from "../../utils/utils";
import {ExposurePlus1} from "@styled-icons/material-rounded";
import {fileApi} from "../../api";


export function ImageList() {
  const refImageList = useRef<HTMLDivElement>(null);

  const images = useTypedSelector(store => store.images.images)
  const currentImage = useTypedSelector(store => store.images.currentImage)

  const {setCurrentImage, addImage, removeImage, setAnnotations} = useActions()

  useEffect(() => {
    fileApi.get('').then(req => {
      req.data.map((item: any) => {
        getImage(item.id, item.annotations)
      })
    })
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (refImageList.current) {
      refImageList.current["scrollLeft"] += e.deltaY;
    }
  }

  const handleClick = (uuid: string) => {
    setAnnotations(currentImage.annotations)
    const data = new FormData()
    data.append('annotations', JSON.stringify(currentImage.annotations))
    fileApi.post(`${currentImage.uuid}`, data)
      .then(req => console.log(req.data))
      .catch(req => console.warn(req.data))
    setCurrentImage(uuid!)
  }

  function getImage(id: string = "1", annotations?: string) {
    let data: IRectangle[] = EmptyImage.annotations
    if (annotations) data = JSON.parse(annotations)
    fileApi.get(`${id}/download`).then(
      res => {
        let img = new Image()

        img.src = res.request.responseURL
        img.crossOrigin = "anonymous"
        img.onload = () => {
          addImage({image: NewImage(img), id: id, annotations: data})
        }
      }
    )
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const {files} = event.target
    const img = new Image()

    const formData = new FormData();
    if (files) {
      formData.append('file', files[0]);
      img.src = window.URL.createObjectURL(files[0])
    }
    fileApi.post('', formData).then(res => {
      getImage('' + res.data);
    }).catch(reason => {
      console.warn(reason);
    })
  }


  return (
    <ImageListWrapper ref={refImageList} onWheel={handleWheel}>
      <ImageWrapper>
        <ExposurePlus1 size={150} onClick={() => {
          getImage('1')
        }}/>
      </ImageWrapper>
      {images.map((image, i) =>
        image.uuid ?
          <ImageWrapper key={i}
                        onClick={() => handleClick(image.uuid!)}
                        border={image.src === currentImage.src}
          >
            <img src={image.src} height={150} alt=""/>
            <ColoredClose size={40} onClick={(e) => {
              e.stopPropagation()
              removeImage(image.uuid!)
            }}/>
          </ImageWrapper>
          : null
      )}
      <ImageWrapper>
        <input
          id="uploadImage"
          type="file"
          onChange={handleUpload}
          hidden
        />
        <ColoredUpload size={150} onClick={() => {
          let input = document.getElementById("uploadImage")
          if (input) input.click()
        }}/>
      </ImageWrapper>
    </ImageListWrapper>);
}
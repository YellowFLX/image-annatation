import {
  AddImageAction,
  ImagesActionEnum,
  RemoveImageAction,
  SetAnnotationsAction,
  SetCurrentImageAction,
  SetImageAction
} from "./types";
import {IImage, IRectangle} from "../models";

export const ImagesActionCreator = {
  addImage: (payload: { image:IImage, id:string, annotations: IRectangle[]}): AddImageAction => ({type: ImagesActionEnum.ADD_IMAGE, payload}),
  setCurrentImage: (payload: string): SetCurrentImageAction => ({type: ImagesActionEnum.SET_CURRENT_IMAGE, payload}),
  setAnnotations: (payload: IRectangle[]): SetAnnotationsAction => ({type: ImagesActionEnum.SET_ANNOTATIONS, payload}),
  setImage: (): SetImageAction => ({type: ImagesActionEnum.SET_IMAGE}),
  removeImage: (payload: string): RemoveImageAction => ({type: ImagesActionEnum.REMOVE_IMAGE, payload}),
}
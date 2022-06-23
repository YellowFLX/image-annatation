import {IImage, IRectangle} from "../models";

export enum ImagesActionEnum {
  ADD_IMAGE = 'ADD_IMAGE',
  SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE',
  SET_IMAGE = 'SET_IMAGE',
  SET_ANNOTATIONS = 'SET_ANNOTATIONS',
  REMOVE_IMAGE = 'REMOVE_IMAGE'
}

export interface AddImageAction {
  type: ImagesActionEnum.ADD_IMAGE;
  payload: { image:IImage, id:string, annotations: IRectangle[] };
}

export interface SetCurrentImageAction {
  type: ImagesActionEnum.SET_CURRENT_IMAGE;
  payload: string;
}

export interface SetAnnotationsAction {
  type: ImagesActionEnum.SET_ANNOTATIONS;
  payload: IRectangle[];
}

export interface SetImageAction {
  type: ImagesActionEnum.SET_IMAGE;
}

export interface RemoveImageAction {
  type: ImagesActionEnum.REMOVE_IMAGE;
  payload: string;
}

export type ImagesAction =
  AddImageAction |
  SetCurrentImageAction |
  SetImageAction |
  SetAnnotationsAction |
  RemoveImageAction

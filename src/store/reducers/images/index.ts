import {ImagesAction, ImagesActionEnum} from "./types";
import {EmptyImage, IImagesStore} from "../models";
import {v4 as uuidV4} from "uuid";


const initialState: IImagesStore = {
  images: [EmptyImage],
  currentImage: EmptyImage
}

export const imagesReducer = (state = initialState, action: ImagesAction): IImagesStore => {
  switch (action.type) {
    case ImagesActionEnum.ADD_IMAGE:
      // let newWState = {
      //   ...state,
      //   gamesWon: state.gamesWon + 1,
      //   gamesPlayed: state.gamesPlayed + 1,
      //   currentStreak: state.currentStreak + 1,
      //   attempts: [...state.attempts]
      // }
      // if (newWState.currentStreak > newWState.bestStreak) newWState.bestStreak = newWState.currentStreak
      // newWState.attempts[action.payload] += 1
      let newImage = action.payload.image
      newImage.uuid = action.payload.id;
      newImage.annotations = action.payload.annotations
      return {...state, images: [...state.images, newImage]};

    case ImagesActionEnum.SET_CURRENT_IMAGE:
      return {...state,
        images: state.images.map(image =>
          image.uuid === state.currentImage.uuid
            ? {...image, annotations: state.currentImage.annotations}
            : image),
        currentImage: state.images.filter(image => image.uuid === action.payload)[0]};

    case ImagesActionEnum.SET_IMAGE:

      return {
        ...state,
        // images: [
        //   ...state.images.filter(image => image.uuid !== state.currentImage.uuid),
        //   state.currentImage
        // ],
        images: state.images.map(image =>
          image.uuid === state.currentImage.uuid
            ? {...image, annotations: state.currentImage.annotations}
            : image),
        currentImage: EmptyImage
      };

    case ImagesActionEnum.SET_ANNOTATIONS:
      return {...state, currentImage: {...state.currentImage, annotations: action.payload}};

    case ImagesActionEnum.REMOVE_IMAGE:
      return {...state, images: state.images.filter(image => image.uuid !== action.payload)};

    default:
      return state;
  }
}

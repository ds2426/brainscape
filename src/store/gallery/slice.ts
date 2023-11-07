import { createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../../model/IPhoto";

interface GalleryState {
  gallery: IPhoto[];
  isLoading: boolean;
  error?: string;
}

const initialState: GalleryState = {
  gallery: [],
  isLoading: true,
};


const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGallery(state, action) {
      
      state.gallery = action.payload.images;
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
    addGallery(state, action) {
     state.gallery.push(action.payload)
    },
    deleteGallery(state, action) {
      const newGallerys = state.gallery.filter(gallery => gallery.id !== action.payload.id)
      state.gallery = newGallerys
    }
  }
});

export default gallerySlice;

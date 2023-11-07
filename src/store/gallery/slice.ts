import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../../model/IPhoto";
import { PhotosRequest } from "../../model/PhotosRequest";
import request from "../../utils/request";
import { RequestStatus } from "../../utils/enums";
import { RootState } from "..";
import { PhotoResponse } from "../../model/PhotosResponse";

interface GalleryState {
  gallery: IPhoto[];
  status: RequestStatus;
}

const initialState: GalleryState = {
  gallery: [],
  status: RequestStatus.IDLE,
};

export const fetchPhotos = createAsyncThunk(
  'gallery/fetchPhotos',
  async ({ offset, limit }: PhotosRequest) => {
    const url = `?offset=${offset}&limit=${limit}`;
    const response = await request.get<PhotoResponse>(url);
    return response.photos;
  },
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addGallery(state, action) {
     state.gallery.push(action.payload)
    },
    deleteGallery(state, action) {
      const newGallerys = state.gallery.filter(gallery => gallery.id !== action.payload.id)
      state.gallery = newGallerys
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (_state) => {
        const state = _state;
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (_state, action) => {
        const state = _state;
        state.status = RequestStatus.SUCCEEDED;
        state.gallery = action.payload;
      })
      .addCase(fetchPhotos.rejected, (_state) => {
        const state = _state;
        state.status = RequestStatus.FAILED;
      })
    }
});

export const selectPhotos = (state: RootState): IPhoto[] =>
  state.gallery.gallery;
export const selectStatus = (state: RootState) => state.gallery.status;

export default gallerySlice;

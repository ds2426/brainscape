import { createSlice } from "@reduxjs/toolkit";
import { IPhoto } from "../../model/IPhoto";

interface AlbumState {
  albums: IPhoto[];
}

const initialState: AlbumState = {
  albums: []
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    addAlbum(state, action) {
      const isAdded = state.albums.find(album => album.id === action.payload.id)
      !isAdded && state.albums.push(action.payload)
    },
    deleteAlbum(state, action) {
      const newAlbums = state.albums.filter(album => album.id !== action.payload)
      state.albums = newAlbums
    }
  }
});

export default albumSlice;

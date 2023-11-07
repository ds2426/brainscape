
import React, { FC } from 'react';
import { IPhoto } from '../../model/IPhoto'
import './album.css';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import albumSlice from '../../store/album/slice';
import gallerySlice from '../../store/gallery/slice';


export const Album: FC = () => {
    const dispatch = useAppDispatch();
    const { albums } = useAppSelector((state) => state.album);
    const [{ canDrop, isOver, result }, drop] = useDrop(() => ({
      accept: ItemTypes.PHOTO,
      drop: () => ({ photo: 'Album' }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        result: monitor.getDropResult()
      })
    }))
  
    const handleDelete = (photo: IPhoto ) => {
      dispatch(albumSlice.actions.deleteAlbum(photo.id));
      dispatch(gallerySlice.actions.addGallery(photo))
    };
    return (
        <section ref={drop} className='album'>
         <h4>Album Generator</h4>
        {albums.length < 1 ? 'Drag an image here' : '' }
        <ul className='album-gallery'>
            {albums.map((album) => <li key={album.id}>
              <div className='thumbnail-img'><img width='50' height='50' src={album.url} alt={album.title} /></div>
              <div className='overlay' onClick={() => handleDelete(album)}>X</div>
              
              </li>)}
              </ul>
        <div className='album-list'>
            {albums.map((album, index) =>  <div key={album.id} className='thumbnail-title'>{`${index + 1}. `}{album.title}</div> )}
        </div>
      </section>
    )
  }

export default Album;
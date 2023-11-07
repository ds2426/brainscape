import { FC } from 'react';
import { IPhotoProp } from '../../model/IPhotoProp';
import './photo.css';
import { useDrag } from 'react-dnd';
import { DropResult } from '../../model/IDropResult';
import { ItemTypes } from '../../constants/ItemTypes';
import albumSlice from '../../store/album/slice';
import gallerySlice from '../../store/gallery/slice';
import { useAppDispatch } from '../../store/hooks';
 

const Photo: FC<IPhotoProp> = ({ photo }) => {
    const dispatch = useAppDispatch();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PHOTO,
        item: { photo },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult<DropResult>()
          if (item && dropResult) {
            dispatch(albumSlice.actions.addAlbum(photo))
            dispatch(gallerySlice.actions.deleteGallery(photo))
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))
  return (
    <div ref={drag} className='photo'>
        <img width={200} height={200} src={photo.url} alt={photo.title} />
        <div className='overlay'></div>
    </div>
    
  );
};
export default Photo;
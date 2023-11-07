
import { FC, useEffect } from 'react';
import FetchImages from '../../lib/FetchImages';
import Photo from '../photo/photo';
import { IPhoto } from '../../model/IPhoto'
import './gallery.css';
import gallerySlice from '../../store/gallery/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';


export const Gallery: FC = () => {
    const URL = "https://api.slingacademy.com/v1/sample-data/photos?limit=100";
    const dispatch = useAppDispatch();
    const { gallery } = useAppSelector((state) => state.gallery);
    const {images, isLoading, error} =  FetchImages(URL)
    useEffect(() => {
      dispatch(gallerySlice.actions.setGallery({images, isLoading, error}))
    },[dispatch, images, isLoading, error])
  return (
    <div className="gallery">
        <ul className='image-gallery'>
        {gallery && gallery.length > 0 && gallery.map((image: IPhoto) => (
                <li key={image.id}><Photo photo={image} /></li>
            ))}
        </ul>

    </div>
  );
}

export default Gallery;
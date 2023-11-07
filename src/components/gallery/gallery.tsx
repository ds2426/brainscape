
import { FC, useEffect, useState } from 'react';
import Photo from '../photo/photo';
import { IPhoto } from '../../model/IPhoto'
import './gallery.css';
import gallerySlice, { fetchPhotos, selectPhotos, selectStatus } from '../../store/gallery/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RequestStatus } from '../../utils/enums';


export const Gallery: FC = () => {
    const URL = "https://api.slingacademy.com/v1/sample-data/photos?limit=100";
    const dispatch = useAppDispatch();
    const gallery = useAppSelector(selectPhotos);
    const status = useAppSelector(selectStatus);
    const [params, setParams] = useState({
      offset: 0,
      limit: 5
    });
    const [photoCount, setPhotoCount] = useState(0);
    // TODO: add more dynamic paging to load less images at time for increasing page load time
    useEffect(() => {
      if(photoCount < 100){
        dispatch(fetchPhotos(params)).then((data) =>{
          if(data && data.payload) {
            setPhotoCount(5)
            setParams({offset: 6, limit: 100})
          }
        }
  
      )
    }
    },[dispatch, photoCount])
  return status !== RequestStatus.LOADING ? (
    <div className="gallery">
        <ul className='image-gallery'>
        {gallery && gallery.length > 0 && gallery.map((image: IPhoto) => (
                <li key={image.id}><Photo photo={image} /></li>
            ))}
        </ul>

    </div>
  ) : <div className='gallery'>LOADING</div>;
}

export default Gallery;
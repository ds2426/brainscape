import { useState, useEffect } from "react";
import { IPhoto } from "../model/IPhoto";

interface ApiReturnData {
  images: IPhoto[];
  isLoading: boolean;
  error: string;
}

const FetchImages = (url: string): ApiReturnData => {
  const [images, setImages] = useState<IPhoto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (res.ok) {
        setImages(resData.photos as IPhoto[]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      if (error instanceof Error) {
        console.error(error.message);
        setError("Unable to fetch images");
      }
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, isLoading, error };
};
export default FetchImages;

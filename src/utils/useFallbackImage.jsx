import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpeg'
import img3 from '../../assets/3.jpeg'
import img4 from '../../assets/4.jpeg'
import img5 from '../../assets/5.jpeg'
import img6 from '../../assets/6.jpeg'
import img7 from '../../assets/7.jpeg'
import img8 from '../../assets/8.jpeg'
import img9 from '../../assets/9.jpeg'
import img10 from '../../assets/10.jpeg'
import img11 from '../../assets/11.jpeg'
import img12 from '../../assets/12.jpeg'

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
  const getRandomFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

const useFallbackImage = () => {      
    //~ Function to handle image loading error
        const handleImageError = (e) => {
          e.target.src = getRandomFallbackImage();
        };
      
    return handleImageError;
  };

export default useFallbackImage;

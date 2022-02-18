import { useState, useEffect } from 'react'
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('');



  async function getImage() {
    const response = await fetch(`https://pixabay.com/api/?key=25775595-77326cc9d8ba7ecd30c163adf&q=${term}&image_type=photo&pretty=true`)
    const data = await response.json();
    setImages(data.hits)
    setIsLoading(false)
  }

  useEffect(() => {
    getImage()
  }, [term])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No images found</h1>}
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;

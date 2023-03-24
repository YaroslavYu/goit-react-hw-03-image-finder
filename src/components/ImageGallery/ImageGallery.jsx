import { Component } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ToastNotify } from 'components/ToastNotify/ToastNotify';

import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    showBtnLoad: false,
    isLoading: false,
    isEmpty: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ isLoading: true });
      this.fetchImages(search, page);
    }
  };

  fetchImages(searchWord, page) {
    fetch(
      `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=32598481-51c6e368c4b2f2440a6e9b5e3&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => response.json())
      .then(data => {
        if (!data.hits.length) {
          this.setState({ isEmpty: true });
          toast.info('Nothing not found');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          showBtnLoad: page < Math.ceil(data.totalHits / 12),
        }));
      })
      .catch(() => toast.error('Somthing wrong. Please, try again'))
      .finally(this.setState({ isLoading: false }));
  }

  onSearch = searchValue => {
    this.setState({
      search: searchValue,
      page: 1,
      images: [],
      showBtnLoad: false,
      isEmpty: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, showBtnLoad, isEmpty } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.onSearch} />
        {isEmpty && <ToastNotify />}
        {isLoading && <Loader />}
        <Gallery>
          {images &&
            images.map(image => {
              return <ImageGalleryItem image={image} key={image.id} />;
            })}
        </Gallery>
        {showBtnLoad && <Button loadMore={this.loadMore} />}
      </>
    );
  }
}

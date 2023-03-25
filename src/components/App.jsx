import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledAppContainer } from './App.styled';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ToastNotify } from './ToastNotify/ToastNotify';

export class App extends Component {
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
    if (searchValue !== this.state.search || this.state.page !== 1)
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
      <StyledAppContainer>
        <SearchBar onSubmit={this.onSearch} />
        {isEmpty && <ToastNotify />}
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {showBtnLoad && <Button loadMore={this.loadMore} />}
      </StyledAppContainer>
    );
  }
}

import { Component } from 'react';

import {
  StyledSearchBar,
  StyledSearchForm,
  StyledSubmitButton,
  StyledButtonLabel,
  StyledInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  onChange = e => {
    const searchValue = e.currentTarget.value;
    this.setState({ search: searchValue });
  };

  onSubmit = e => {
    e.preventDefault();
    const searchWord = this.state.search.trim();
    if (!searchWord) return;
    this.props.onSubmit(searchWord);
    this.setState({ search: '' });
  };

  render() {
    return (
      <StyledSearchBar>
        <StyledSearchForm onSubmit={this.onSubmit}>
          <StyledSubmitButton type="submit">
            <StyledButtonLabel>Search</StyledButtonLabel>
          </StyledSubmitButton>

          <StyledInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.onChange}
          />
        </StyledSearchForm>
      </StyledSearchBar>
    );
  }
}

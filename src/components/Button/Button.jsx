import { StyledButton } from './Button.styled';

export function Button({ loadMore }) {
  return (
    <StyledButton type="button" onClick={loadMore}>
      Load more...
    </StyledButton>
  );
}

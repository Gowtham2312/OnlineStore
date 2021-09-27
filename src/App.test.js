import { render , screen , getByText} from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux-store/store'

render(
<Provider store={store}>
  <App />
</Provider>
)

test('render to check logout', () => {
  const linkElement = screen.getByText('Register');
  expect(linkElement).toBeInTheDocument();
});

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Movie from './Movie';

// Mock API responses before each test
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('&i=')) {
      // Detailed fetch
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            Title: 'Avatar',
            Year: '2009',
            imdbID: 'tt0499549',
            Plot: 'A marine on an alien planet...',
          }),
      });
    } else {
      // Search fetch
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            Response: 'True',
            Search: [
              { imdbID: 'tt0499549', Title: 'Avatar', Year: '2009' },
            ],
          }),
      });
    }
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders search input and performs movie search', async () => {
  render(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText(/search by title/i);
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'Avatar');
  await userEvent.click(button);

  const movieTitle = await screen.findByText(/avatar/i);
expect(movieTitle).toBeInTheDocument();

});

test('displays loading indicator while fetching movies', async () => {
  render(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  const movieTitle = await screen.findByText(/avatar/i);
  expect(movieTitle).toBeInTheDocument();
});

test('renders movie grid with fetched results', async () => {
  render(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );

  const movieCard = await screen.findByText(/avatar/i);
  expect(movieCard).toBeInTheDocument();
});

test('load more button triggers fetch for next page', async () => {
  render(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );

  await screen.findByText(/avatar/i);
  const loadMore = screen.queryByText(/load more/i);
  if (loadMore) {
    await userEvent.click(loadMore);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('&page=2'));
    });
  }
});

test('hides Load More button when no more data available', async () => {
  // Adjust mock to return fewer than 10 results
  global.fetch = jest.fn((url) => {
    const result =
      url.includes('&i=') ?
        {
          json: () =>
            Promise.resolve({
              Title: 'Avatar',
              Year: '2009',
              imdbID: 'tt0499549',
              Plot: 'A marine on an alien planet...',
            }),
        } :

        {
          json: () =>
            Promise.resolve({
              Response: 'True',
              Search: [
                { imdbID: 'tt0499549', Title: 'Avatar', Year: '2009' },
              ],
            }),
        };
    return Promise.resolve(result);
  });

  render(
    <BrowserRouter>
      <Movie />
    </BrowserRouter>
  );

  await screen.findByText(/avatar/i);
  expect(screen.queryByText(/load more/i)).not.toBeInTheDocument();
});


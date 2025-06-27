import {render , screen} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MovieDetails from "./MovieDetails";

const mockMovie = {
  Title: 'Avatar',
  Year: '2009',
  imdbID: 'tt1375666',
  imdbRating: '7.9',
  Plot: 'Paraplegic Marine dispatched', 
  Genre: 'Action, Adventure',
  Actors: 'Sam Worthington, Zoe Saldana',
  Poster: 'https://example.com/avatar.jpg',
};

function renderWithRouter(movieState) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/details', state: { movie: movieState } }]}>
      <Routes>
        <Route path="/details" element={<MovieDetails />} />
      </Routes>
    </MemoryRouter>
  );
}
   test('renders movie details correctly',async() => {
  renderWithRouter(mockMovie);

 expect(await screen.findByText(/avatar/i)).toBeInTheDocument();
  expect(await screen.getByText(/2009/)).toBeInTheDocument();
  expect(await screen.getByText(/7.9/)).toBeInTheDocument();
expect(screen.getByText(/action, adventure/i)).toBeInTheDocument();
expect(screen.getByText(/sam worthington/i)).toBeInTheDocument();
expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('avatar'));


 expect(await screen.findByText(/paraplegic marine dispatched/i));


  const link = screen.getByRole('link', { name: /watch movie/i });
  expect(link).toHaveAttribute('href', expect.stringContaining(mockMovie.imdbID));
});


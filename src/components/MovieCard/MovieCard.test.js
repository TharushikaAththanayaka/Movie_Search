import {render , screen} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import './MovieCard';
import MovieCard from "./MovieCard";

const mockMovie ={
    Title : 'Avatar',
    Year : '2009',
    imdbID : 'tt1375666',
    imdbRating : '7.9'
};
test("render movie name, year and ratings" , ()=>{
    render(
        <BrowserRouter>
        <MovieCard movie ={mockMovie} onSeeMore={jest.fn()}/>
        </BrowserRouter>
 );
 const name = screen.getByText(/avatar/i);
 const year = screen.getByText(/2009/);
 const rating = screen.getByText(/7.9/);

expect(name).toBeInTheDocument();
expect(year).toBeInTheDocument();
expect(rating).toBeInTheDocument();

});
const mockOnSeeMore = jest.fn();
test("render see more button" , ()=>{
    render(
        <BrowserRouter>
        <MovieCard movie={mockMovie} onSeeMore={mockOnSeeMore}/>
        </BrowserRouter>
    );
    const buttonSee = screen.getByRole('button' , {name : /see more/i});
    expect(buttonSee).toBeInTheDocument();
})
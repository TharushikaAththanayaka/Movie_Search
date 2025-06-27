import {render , screen} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import './NavBar';
import NavBar from "./NavBar";

test("renders the links", () =>{
    render(
        <BrowserRouter>
        <NavBar/>
        </BrowserRouter>
    );
    const homeLink = screen.getByRole('link',{name : /home/i});
    const movieLink = screen.getByRole('link',{name : /movie/i});

    expect(homeLink).toBeInTheDocument();
    expect(movieLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute('href', '/');
    expect(movieLink).toHaveAttribute('href' , '/movies');
});



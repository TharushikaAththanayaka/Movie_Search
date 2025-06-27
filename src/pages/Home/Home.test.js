import {render , screen} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from "./Home";

test("renders the home page paragraph" , () =>{
   render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
    const paragraphEl = screen.getByText(/Match Your Mood/i);
    expect(paragraphEl).toBeInTheDocument();
});

test("renders the explore more button" ,async() =>{
   const handleExplore = jest.fn(); //mock testing
   render(
   <BrowserRouter>
   <button onClick={handleExplore}>Explore More</button>
   </BrowserRouter>
   );
   const buttonEl = screen.getByRole('button' , {name : /explore more/i });
   await userEvent.click(buttonEl);
   expect(handleExplore).toHaveBeenCalledTimes(1);
});


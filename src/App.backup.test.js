import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test("render home page" , ()=>{
    render(      
       <MemoryRouter initialEntries={['/']}>
      <App />  
      </MemoryRouter>  
    );
    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
});



test("render movie page" , ()=>{
  render(   
    <MemoryRouter initialEntries={['/movies']}>
      <App />  
      </MemoryRouter>
  );
  const movie = screen.getByText(/movie/i);
  expect(movie).toBeInTheDocument();
});

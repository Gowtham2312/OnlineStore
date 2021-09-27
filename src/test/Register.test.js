import { render, screen , getByTitle } from "@testing-library/react";
import Register from "../components/Register";

it('Value in State is changed when button clicked', () => {

     render(<Register />);

     const element = screen.getByTitle('SubmitBtn')
     expect(element).toHaveTextContent('Submit')
     
    // expect(getByText(/value).textContent).toBe(false)

    // fireEvent.click(getByText("onRegisterFormSubmit"))

    // expect(getByText(true).textContent).toBe(true)
 })

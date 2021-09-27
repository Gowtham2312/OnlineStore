import { render , screen } from "@testing-library/react";
import Carousel from "../components/Carousel";

describe('Img', () => {
    test('Img must have height=400px and alt = "carousel-image"', () => {
      render(<Carousel/>);
      const logo = screen.getByTitle('first carousal');
      expect(logo).toHaveAttribute('height', '400px');
      expect(logo).toHaveAttribute('alt', 'carousal image');
      expect(logo).toHaveAttribute('class','d-block w-75 mx-auto')
    });
  });
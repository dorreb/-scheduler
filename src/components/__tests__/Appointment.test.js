import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";


describe("Appointment", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  });

  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });

});
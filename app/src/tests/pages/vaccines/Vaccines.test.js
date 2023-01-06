import "tests/mocks/matchMedia";

import React from "react";
import { setupServer } from "msw/node";
import { useDispatch } from "react-redux";
import renderWithStore from "tests/render";
import { fireEvent, screen, cleanup } from "@testing-library/react";

import useDocumentTitle from "hooks/useDocumentTitle";
import useDebounceEffect from "hooks/useDebounceEffect";

import Vaccines from "pages/vaccine/Vaccines";
import { getAllVaccines } from "redux/actions/vaccineAction";

import {
  allVaccinesResponseData,
  vaccineCountResponseData,
} from "tests/constants";

jest.mock("antd-img-crop", () => () => <div />);
jest.mock("hooks/useDocumentTitle");
jest.mock("hooks/useDebounceEffect");

// mock dispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// setup server
const server = setupServer(allVaccinesResponseData, vaccineCountResponseData);

describe("Vaccines", () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  // test if component renders
  it("should render", () => {
    renderWithStore(<Vaccines />);

    expect(screen.getByText("Vaccines")).toBeInTheDocument();
  });

  //snapshot
  it("should match snapshot", () => {
    const { asFragment } = renderWithStore(<Vaccines />);

    expect(asFragment()).toMatchSnapshot();
  });
});

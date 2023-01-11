import React from "react";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "tests/render";

import Vaccines from "pages/vaccine/Vaccines";
import VaccineFormModal from "pages/vaccine/components/VaccineFormModal";
import {
  vaccineResponse,
  allVaccinesResponse,
  vaccineCountResponse,
} from "tests/handlers";

jest.mock(
  "antd-img-crop",
  () =>
    ({ children }) =>
      children
);

// setup server
const server = setupServer(
  allVaccinesResponse,
  vaccineCountResponse,
  vaccineResponse
);

describe("Vaccines", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => server.close());

  it('should render "No data" when there is no vaccine', async () => {
    render(<Vaccines />);

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should render", async () => {
    render(<Vaccines />);

    expect(screen.getByText("All Vaccines")).toBeInTheDocument();
    expect(screen.getByText("No data")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByText("No data"));

    await waitFor(
      () => screen.getByText("Vaccine 1") && screen.getByText("Vaccine 2")
    );
  });

  it("should render vaccine count", async () => {
    await render(<Vaccines />);

    expect(await screen.getByTestId("total-count").textContent).toBe(
      "Total: 2"
    );
    expect(await screen.getByTestId("mandatory-count").textContent).toBe(
      "Mandatory: 1"
    );
    expect(await screen.getByTestId("optional-count").textContent).not.toBe(
      "Optional: 2"
    );
  });

  it("should highlight mandatory tab when mandatory tab is clicked", async () => {
    await render(<Vaccines />);

    const mandatoryButton = screen.getByTestId("mandatory-count");
    expect(mandatoryButton.textContent).toBe("Mandatory: 1");
    act(() => mandatoryButton.click());
    expect(
      mandatoryButton.className.includes("ant-tag-has-color")
    ).toBeTruthy(); // check if the tag is highlighted
  });

  it('should search for "Vaccine 2" when "Vaccine 2" is typed in search input', async () => {
    await render(<Vaccines />);
    await waitForElementToBeRemoved(screen.queryByText("No data"));

    const searchInput = screen.getByPlaceholderText("Search Vaccines");
    fireEvent.change(searchInput, { target: { value: "Vaccine 2" } });

    //press enter
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    await screen.findByText("Vaccine 2");

    await expect(screen.getByText("Vaccine 2")).toBeInTheDocument();
  });

  it('should open add vaccine modal when "Add Vaccine" button is clicked', async () => {
    await render(<Vaccines />);

    const addVaccineButton = screen.getByRole("button", {
      name: "Add vaccine",
    });
    act(() => addVaccineButton.click());

    //open modal and check if the modal is open
    await render(<VaccineFormModal />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Add vaccine" })
    ).toBeInTheDocument();
  });

  it('should open edit vaccine modal when "Edit" button is clicked and should have the correct data', async () => {
    await render(<Vaccines />);
    await waitForElementToBeRemoved(screen.queryByText("No data"));

    //search by data-icon="edit" and click the button
    const editVaccineButton = screen.getByTestId("edit-vaccine-1");
    act(() => editVaccineButton.click());

    //open modal and check if the modal is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Edit vaccine" })
    ).toBeInTheDocument();

    //check if the form is filled with the correct data
    expect(screen.getByRole("textbox", { name: "Name" }).value).toBe(
      "Vaccine 1"
    );
    expect(screen.getByRole("textbox", { name: "Description" }).value).toBe(
      "vaccine 1 desc"
    );
  });

  it("should be able to edit and save vaccine", async () => {
    await render(<Vaccines />);
    await waitForElementToBeRemoved(screen.queryByText("No data"));

    //search by data-icon="edit" and click the button
    const editVaccineButton = screen.getByTestId("edit-vaccine-1");
    act(() => editVaccineButton.click());

    //open modal and check if the modal is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    //edit the form
    const descriptionInput = screen.getByRole("textbox", {
      name: "Description",
    });
    fireEvent.change(descriptionInput, {
      target: { value: "vaccine 1 description" },
    });

    const releaseDateInput = screen.getByRole("textbox", {
      name: "Release Date",
    });
    fireEvent.change(releaseDateInput, { target: { value: "2021-01-01" } });

    const mandatoryCheckbox = screen.getByRole("switch", {
      name: "Is Mandatory",
    });
    fireEvent.click(mandatoryCheckbox);

    const photoUrl = screen.getByTestId("upload");
    fireEvent.change(photoUrl, { target: { value: "photoUrl.png" } });

    const saveButton = screen.getByRole("button", { name: "Update Vaccine" });

    //save the form
    act(() => saveButton.click());

    //check if the form is saved
    await screen.findByText("Vaccine 1");
    expect(screen.getByText("vaccine 1 description")).toBeInTheDocument();
  });

  it('should open delete vaccine modal when "Delete" button is clicked', async () => {
    await render(<Vaccines />);
    await waitForElementToBeRemoved(screen.queryByText("No data"));

    const deleteVaccineButton = screen.getByTestId("delete-vaccine-1");
    act(() => deleteVaccineButton.click());

    await screen.findByRole("dialog");

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Delete Vaccine")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this vaccine?")
    ).toBeInTheDocument();
  });

  //snapshot
  it("should match snapshot", async () => {
    const { asFragment } = await render(<Vaccines />);

    // await waitForElementToBeRemoved(screen.queryByText("No data"));

    expect(await asFragment()).toMatchSnapshot();
  });
});

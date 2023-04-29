import React from "react";
import { screen, render } from "@testUtils";
import Drawer, { Props } from "../Drawer";
import userEvent from "@testing-library/user-event";

describe("Drawer", () => {
    const props: Props = {
        mobileOpen: false,
        toggleDrawer: jest.fn(),
        children: <React.Fragment></React.Fragment>,
        selectedRoute: "/",
        updateRoute: jest.fn(),
        toggleNested: jest.fn(),
        isOpen: false,
    };
    test("should display Talos Help, and a list of 5 Items", () => {
        render(<Drawer {...props} />);
        expect(screen.getAllByText("TALOS Docs")).toHaveLength(1);
        expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });
    test("should toggle actions and update route in the store", async () => {
        const componente = render(<Drawer {...props} />);
        expect(componente.store.getState().navigation.selected).toBe("/");
        expect(screen.getByTestId("ExpandMoreIcon")).toBeDefined();
        const actionOption = screen.getAllByRole("link")[3];
        await userEvent.click(actionOption);
        expect(await screen.findByTestId("ExpandLessIcon")).toBeDefined();
        expect(screen.getByText("Navigate")).toBeDefined();
        expect(componente.store.getState().navigation.selected).toBe("/actions");
    });
});

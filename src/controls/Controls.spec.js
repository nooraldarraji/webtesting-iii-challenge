// Test away!
import React from "react";
import TestRenderer from "react-test-renderer";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";

import Dashboard from "../dashboard/Dashboard";
import Controls from "./Controls";

describe("Controls snapshot", () => {
  it("Controls check for snapshot", () => {
    const tree = TestRenderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("toggle buttons", () => {
  it("should display two buttons, Close Gate and Lock Gate", () => {
    const { getByText } = render(<Controls />);
    getByText("Lock Gate");
    getByText("Close Gate");
  });
});

describe("button text changes", () => {
  it("should display Open Gate on Close Gate click", () => {
    const { getByText } = render(<Dashboard />);
    const closeGateButton = getByText("Close Gate");
    fireEvent.click(closeGateButton);
    expect(closeGateButton.textContent).toBe("Open Gate");
  });

  it("should display Unlock Gate on Lock Gate click", () => {
    const { getByText } = render(<Dashboard />);
    const lockGateButton = getByText("Lock Gate");
    const closeGateButton = getByText("Close Gate");
    fireEvent.click(closeGateButton);
    fireEvent.click(lockGateButton);
    expect(lockGateButton.textContent).toBe("Unlock Gate");
  });
});

describe("disabled buttons", () => {
  it("close button should be disabled if gate is closed and locked", () => {
    const { getByText } = render(<Controls locked={true} closed={true} />);
    getByText("Unlock Gate");
    expect(getByText("Unlock Gate").hasAttribute("disabled")).toBeFalsy();
    getByText("Open Gate");
    expect(getByText("Open Gate").hasAttribute("disabled")).toBeTruthy();
  });

  it("lock button should be disabled if gate is open", () => {
    const { getByText } = render(<Controls closed={false} />);
    getByText("Close Gate");
    expect(getByText("Close Gate").hasAttribute("disabled")).toBeFalsy();
    getByText("Lock Gate");
    expect(getByText("Lock Gate").hasAttribute("disabled")).toBeTruthy();
  });
});

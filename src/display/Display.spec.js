// Test away!
import React from "React";
import renderer from "react-test-renderer";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";

import Display from "./Display";

describe("Display Snapshot", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Display />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("closed prop test", () => {
  it("displays Closed if closed prop is true", () => {
    const { getByText } = render(<Display closed={true} />);
    getByText("Closed");
  });

  it("displays Open if closed prop is false", () => {
    const { getByText } = render(<Display closed={false} />);
    getByText("Open");
  });
});

describe("locked prop test", () => {
  it("displays Unlocked if locked prop is false", () => {
    const { getByText } = render(<Display locked={false} />);
    getByText("Unlocked");
  });

  it("displays Locked if locked prop is true", () => {
    const { getByText } = render(<Display locked={true} />);
    getByText("Locked");
  });
});

describe("red-led class tests", () => {
  it("use red-led class when locked is true", () => {
    const { getByText } = render(<Display locked={true} />);
    expect(getByText("Locked")).toHaveClass("led red-led");
  });

  it("use red-led class when closed is true", () => {
    const { getByText } = render(<Display closed={true} />);
    expect(getByText("Closed")).toHaveClass("led red-led");
  });
});

describe("green-led class tests", () => {
  it("use green-led class when locked is false", () => {
    const { getByText } = render(<Display closed={false} />);
    expect(getByText("Open")).toHaveClass("led green-led");
  });

  it("use green-led class when closed is false", () => {
    const { getByText } = render(<Display locked={false} />);
    expect(getByText("Unlocked")).toHaveClass("led green-led");
  });
});

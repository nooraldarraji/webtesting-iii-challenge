// Test away
import React from "react";
import renderer from "react-test-renderer";

import Dashboard from "./Dashboard";

describe("Dashboard snapshot", () => {
  it("check for snapshot", () => {
    const tree = renderer.create(<Dashboard />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

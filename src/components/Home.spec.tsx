import * as React from "react";
import { shallow } from "enzyme";

import { Home } from "./Home";

describe("Component", () => {
  describe("Home", () => {
    it("should render without throwing an error", function () {
      expect(
        shallow(<Home />).contains(<h3 className="fw5 f3 mt2">Tierra Whack</h3>)
      ).toEqual(true);
    });
  });
});

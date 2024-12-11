import datez from "../src";
import getOffsetHours from "../src/plugins/getOffsetHours";

describe("Plugins - get time offset", () => {
  test("getOffsetHours_1", () => {
    datez().register(getOffsetHours);

    const offsetHours = (datez() as any).getOffsetHours().execute();
    expect(typeof offsetHours).toBe("number");
  });
});

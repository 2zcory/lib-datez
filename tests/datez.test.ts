import datez from "../src";

describe("DateZ", () => {
  test("Should create a valid date object", () => {
    const date = datez("2024-12-03").execute();
    expect(date).toBeInstanceOf(Date);
    expect(date.toISOString()).toBe("2024-12-03T00:00:00.000Z");
  });

  test("Should add days to the date", () => {
    const date = datez("2024-12-03").addDays(10).execute();
    expect(date.toISOString()).toBe("2024-12-13T00:00:00.000Z");
  });
});

describe("DateZ - Format", () => {
  test("Test format YYYY-MM-DD (1)", () => {
    const formatString = datez("2024-12-03T00:00:00.000Z")
      .format("YYYY-MM-DD")
      .execute();

    expect(formatString).toBe("2024-12-03");
  });
});

describe("DateZ - toString", () => {
  test("Test toString (1)", () => {
    const value = datez("2024-12-05").toString();
    expect(value).toBe("2024-12-05T00:00:00.000Z");
  });
});

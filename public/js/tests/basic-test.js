
$(function() {
  describe("a basic test", function() {
    expect(0).toBe(0);

    var x = {};
    expect(x.a).toBeUndefined();
    expect(5).toBeLessThan(8);
    expect(7).toBeGreaterThan(3);
    expect("abc").toMatch(/a.*/);
  });
});
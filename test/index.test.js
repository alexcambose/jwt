const jwt = require('../src');
describe('index', () => {
  it('contains the verify and sign functions', () => {
    expect(typeof jwt.sign).toBe('function');
    expect(typeof jwt.verify).toBe('function');
  });
});

function soma(a, b) {
  return a + b;
}

test('testa', () => {
  expect(soma(1, 2)).toBe(3);
});

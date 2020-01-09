import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let defaultPipe = new DefaultPipe();
  it('create an instance', () => {
    const pipe = new DefaultPipe();
    expect(pipe).toBeTruthy();
  });
  it('return true if there is a value', () => {
    let input = [0, 1, 2, 3, 4];
    let output = [0, 2, 4, 6, 8];
    expect(defaultPipe.transform(input)).toEqual(output);
  })
});

import * as RandomCode from './randomCode';
import { ClassA } from './classA';

describe('mockImplementation', () => {
  it('Without mock', () => {
    expect(RandomCode.randomCode()).toBe('random-code');
  });

  it('randomCode function', () => {
    // This is type safe
    const mock = jest.spyOn(RandomCode, 'randomCode');
    mock.mockImplementation(() => 'TEST');
    expect(RandomCode.randomCode()).toBe('TEST');

    mock.mockImplementation(() => 'fred');
    expect(RandomCode.randomCode()).toBe('fred');
  });

  it('ClassA method', () => {
    // This is type safe
    const mock = jest.spyOn(RandomCode, 'randomCode');
    mock.mockImplementation(() => 'TEST');

    const classA = new ClassA();
    expect(classA.createId()).toBe('TEST-Q');
  });
});

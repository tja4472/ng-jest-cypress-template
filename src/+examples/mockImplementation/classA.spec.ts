import * as RandomCode from './randomCode';
import { ClassA } from './classA';

describe('mockImplementation', () => {
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
    mock.mockImplementation(() => 'June');

    const classA = new ClassA();
    expect(classA.createId()).toBe('June-Q');
  });

  it('Without mock use previous', () => {
    expect(RandomCode.randomCode()).toBe('June');
  });

  it('Without mock using jest.restoreAllMocks', () => {
    jest.restoreAllMocks();
    expect(RandomCode.randomCode()).toBe('random-code');
  });
});

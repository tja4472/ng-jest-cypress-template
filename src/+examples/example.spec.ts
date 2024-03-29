/* eslint-disable @typescript-eslint/class-literal-property-style */
describe('AppComponent', () => {
  it('static getter', () => {
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class MyClass {
      static get foo() {
        return true;
      }
    }

    jest.spyOn(MyClass, 'foo', 'get').mockReturnValue(false);
    expect(MyClass.foo).toBe(false);
  });

  it('non-static getter', () => {
    class MyClass {
      get foo() {
        return true;
      }
    }

    const instance = new MyClass();

    jest.spyOn(instance, 'foo', 'get').mockReturnValue(false);
    expect(instance.foo).toBe(false);
  });

  it('non-static property', () => {
    // Give error:
    // Property foo does not have access type get
    class MyClass {
      foo = true;
    }

    const instance = new MyClass();
    // Give error:
    // Property foo does not have access type get
    // jest.spyOn(instance, 'foo', 'get').mockReturnValue(false);
    // ^^^^
    Object.defineProperty(instance, 'foo', {
      get() {
        return false;
      },
    });
    expect(instance.foo).toBe(false);
  });

  it('aaa', () => {
    class TestA {
      get foo(): unknown {
        return jest.fn();
      }
    }

    const mock = new TestA();
    jest.spyOn(mock, 'foo', 'get').mockReturnValue('baz');
  });

  it('bbb', () => {
    class TestA {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get foo(): any {
        return jest.fn();
      }
    }

    const mock = new TestA();
    jest.spyOn(mock, 'foo', 'get').mockReturnValue('baz');
  });
});

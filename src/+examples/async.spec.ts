/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
// #region eslint-plugin-jest
// https://github.com/jest-community/eslint-plugin-jest/blob/v26.8.2/docs/rules/no-conditional-expect.md
class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};
// #endregion

interface User {
  name: string;
}

const users: Record<number, User> = {
  4: { name: 'Mark' },
  5: { name: 'Paul' },
};

function request(url: any) {
  return new Promise<User>((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() => {
      users[userID]
        ? resolve(users[userID])
        : // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject({
            error: `User with ${userID.toString()} not found.`,
          });
    });
  });
}

function getUserName(userID: number) {
  return request(`/users/${userID.toString()}`).then((user: User) => user.name);
}

describe('async testing', () => {
  // Testing promise can be done using `.resolves`.
  it('works with resolves', () => {
    expect.assertions(1);
    return expect(getUserName(5)).resolves.toBe('Paul');
  });

  // The assertion for a promise must be returned.
  it('works with promises', () => {
    expect.assertions(1);
    return getUserName(4).then((data) => {
      expect(data).toBe('Mark');
    });
  });

  // async/await can be used.
  it('works with async/await', async () => {
    expect.assertions(1);
    const data = await getUserName(4);
    expect(data).toBe('Mark');
  });

  // async/await can also be used with `.resolves`.
  it('works with async/await and resolves', async () => {
    expect.assertions(1);
    await expect(getUserName(5)).resolves.toBe('Paul');
  });

  // Testing for async errors using `.rejects`.
  it('tests error with rejects', () => {
    expect.assertions(1);
    return expect(getUserName(3)).rejects.toEqual({
      error: 'User with 3 not found.',
    });
  });

  it('tests error using getError suggested by eslint-plugin-jest', async () => {
    const error = await getError(async () => getUserName(2));

    // check that the returned error wasn't that no error was thrown
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toEqual({
      error: 'User with 2 not found.',
    });
  });

  // Testing for async errors using Promise.catch.
  it('tests error with promises', async () => {
    expect.assertions(1);
    return getUserName(2).catch((e: unknown) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toEqual({
        error: 'User with 2 not found.',
      });
    });
  });

  // Or using async/await.
  it('tests error with async/await', async () => {
    expect.assertions(1);
    try {
      await getUserName(1);
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toEqual({
        error: 'User with 1 not found.',
      });
    }
  });

  // Or using async/await with `.rejects`.
  it('tests error with async/await and rejects', async () => {
    expect.assertions(1);
    await expect(getUserName(3)).rejects.toEqual({
      error: 'User with 3 not found.',
    });
  });
});

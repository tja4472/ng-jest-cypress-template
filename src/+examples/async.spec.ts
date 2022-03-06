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
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          })
    );
  });
}

function getUserName(userID: number) {
  return request('/users/' + userID).then((user: User) => user.name);
}

describe('async testing', () => {
  // Testing promise can be done using `.resolves`.
  it('works with resolves', () => {
    expect.assertions(1);
    return expect(getUserName(5)).resolves.toEqual('Paul');
  });

  // The assertion for a promise must be returned.
  it('works with promises', () => {
    expect.assertions(1);
    return getUserName(4).then((data) => expect(data).toEqual('Mark'));
  });

  // async/await can be used.
  it('works with async/await', async () => {
    expect.assertions(1);
    const data = await getUserName(4);
    expect(data).toEqual('Mark');
  });

  // async/await can also be used with `.resolves`.
  it('works with async/await and resolves', async () => {
    expect.assertions(1);
    await expect(getUserName(5)).resolves.toEqual('Paul');
  });

  // Testing for async errors using `.rejects`.
  it('tests error with rejects', () => {
    expect.assertions(1);
    return expect(getUserName(3)).rejects.toEqual({
      error: 'User with 3 not found.',
    });
  });

  // Testing for async errors using Promise.catch.
  test('tests error with promises', async () => {
    expect.assertions(1);
    return getUserName(2).catch((e) =>
      expect(e).toEqual({
        error: 'User with 2 not found.',
      })
    );
  });

  // Or using async/await.
  it('tests error with async/await', async () => {
    expect.assertions(1);
    try {
      await getUserName(1);
    } catch (e) {
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

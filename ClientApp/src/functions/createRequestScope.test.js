import createRequestScope from './createRequestScope';

const wait = ms => new Promise((r, j) => setTimeout(r, ms));

test("Can Create Request Scope", () => {
  const requestScope = createRequestScope();
  expect(typeof (requestScope.getRequest)).toBe('function')
});

test("Get Request returns a function", () => {
  const mockBeginCallback = jest.fn();
  const mockSuccesCallback = jest.fn();
  const mockFailedCallback = jest.fn();

  const requestScope = createRequestScope();
  const request = requestScope.getRequest(
    mockBeginCallback,
    mockSuccesCallback,
    mockFailedCallback
  );
  expect(typeof (request)).toBe('function');
});

test("Typical success request", async (done) => {
  const apiData = { data: "api response data" };
  const mockBeginCallback = jest.fn();
  const mockSuccesCallback = jest.fn();
  const mockFailedCallback = jest.fn();

  const mockApiFunctionAsync = jest.fn(async () => {
    await wait(10);
    return apiData;
  });

  const requestScope = createRequestScope();
  const request = requestScope.getRequest(
    mockBeginCallback,
    mockSuccesCallback,
    mockFailedCallback
  );
  await request(mockApiFunctionAsync);

  expect(mockBeginCallback).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync).toHaveBeenCalledWith();

  expect(mockSuccesCallback).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback).toHaveBeenCalledWith(apiData, false);

  expect(mockFailedCallback).not.toHaveBeenCalled();

  done();
});

describe("Typical success request detail", () => {
  const apiData = { data: "api response data" };
  let mockBeginCallback;
  let mockSuccesCallback;
  let mockFailedCallback;
  let mockApiFunctionAsync;

  beforeEach(() => {
    mockBeginCallback = jest.fn();
    mockSuccesCallback = jest.fn();
    mockFailedCallback = jest.fn();

    mockApiFunctionAsync = jest.fn(async () => {
      await wait(10);
      return apiData;
    });
  });

  test("Can call api request", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);
    done();
  });

  test("Begin Callback called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockBeginCallback).toHaveBeenCalledTimes(1);
    expect(mockBeginCallback).toHaveBeenCalledWith();

    done();
  });

  test("Api function called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockApiFunctionAsync).toHaveBeenCalledTimes(1);
    expect(mockApiFunctionAsync).toHaveBeenCalledWith();

    done();
  });

  test("Success Callback called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockSuccesCallback).toHaveBeenCalledTimes(1);
    expect(mockSuccesCallback).toHaveBeenCalledWith(apiData, false);

    done();
  });

  test("Failed Callback not called", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockFailedCallback).not.toHaveBeenCalled();

    done();
  });
});

test("Typical faulty request", async (done) => {
  const errorMessage = "test error";
  const mockBeginCallback = jest.fn();
  const mockSuccesCallback = jest.fn();
  const mockFailedCallback = jest.fn();

  const mockApiFunctionAsync = jest.fn(async () => {
    await wait(10);
    throw new Error(errorMessage);
  });

  const requestScope = createRequestScope();
  const request = requestScope.getRequest(
    mockBeginCallback,
    mockSuccesCallback,
    mockFailedCallback
  );
  await request(mockApiFunctionAsync);

  expect(mockBeginCallback).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync).toHaveBeenCalledWith();

  expect(mockSuccesCallback).not.toHaveBeenCalled();

  expect(mockFailedCallback).toHaveBeenCalledTimes(1);
  expect(mockFailedCallback.mock.calls[0].length).toBe(2); // two arguments
  expect(mockFailedCallback.mock.calls[0][0].message).toBe(errorMessage);
  expect(mockFailedCallback.mock.calls[0][1]).toBe(false);

  done();
});

describe("Typical faulty request detail", () => {
  const errorMessage = "test error";
  let mockBeginCallback;
  let mockSuccesCallback;
  let mockFailedCallback;
  let mockApiFunctionAsync;

  beforeEach(() => {
    mockBeginCallback = jest.fn();
    mockSuccesCallback = jest.fn();
    mockFailedCallback = jest.fn();
  
    mockApiFunctionAsync = jest.fn(async () => {
      await wait(10);
      throw new Error(errorMessage);
    });
  });

  test("Can call api request", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);
    done();
  });

  test("Begin Callback called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockBeginCallback).toHaveBeenCalledTimes(1);
    expect(mockBeginCallback).toHaveBeenCalledWith();

    done();
  });

  test("Api function called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockApiFunctionAsync).toHaveBeenCalledTimes(1);
    expect(mockApiFunctionAsync).toHaveBeenCalledWith();
    
    done();
  });

  test("Success Callback not called", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockSuccesCallback).not.toHaveBeenCalled();

    done();
  });

  test("Failed Callback called correctly", async (done) => {
    const requestScope = createRequestScope();
    const request = requestScope.getRequest(
      mockBeginCallback,
      mockSuccesCallback,
      mockFailedCallback
    );
    await request(mockApiFunctionAsync);

    expect(mockFailedCallback).toHaveBeenCalledTimes(1);
    expect(mockFailedCallback.mock.calls[0].length).toBe(2); // two arguments
    expect(mockFailedCallback.mock.calls[0][0].message).toBe(errorMessage);
    expect(mockFailedCallback.mock.calls[0][1]).toBe(false);

    done();
  });
});

// use a call order array, that each mock function mutates as a side effect

// two requests 1, -1, 2, -2 (2a)
// two requests 1, 2, -1, -2 (2b)
// two requests 1, 2, -2, -1 (2c)

// two requests 1, -1x, 2, -2  (2a 1x)
// two requests 1, -1, 2, -2x  (2a 2x)
// two requests 1, -1x, 2, -2x (2a 1x2x)

// two requests 1, 2, -1x, -2  (2b 1x)
// two requests 1, 2, -1, -2x  (2b 2x)
// two requests 1, 2, -1x, -2x (2b 1x2x)

// two requests 1, 2, -2, -1x  (2c 1x)
// two requests 1, 2, -2x, -1  (2c 2x)
// two requests 1, 2, -2x, -1x (2c 1x2x)

// tests would assume a completed (1, -1) will have no effect on later requests.
// The following will start at 1,2,3, then each representation the order of response.
// - three requests: different order response: (1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1)
// - three requests: different order response: with some fails (last fail): (1,2,3x), (3x,1,2), (3x,1,2x)
// - three requests: different order response: with some fails (non-last fail): (1,2x,3), (1,3,2x)

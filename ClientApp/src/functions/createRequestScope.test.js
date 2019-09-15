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

test("Sample success request", async (done) => {
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

describe("Success request detail", () => {
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

test("Sample faulty request", async (done) => {
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

describe("Faulty request detail", () => {
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

test("Sample Reuse request", async (done) => {
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
  await request(mockApiFunctionAsync);

  expect(mockBeginCallback).toHaveBeenCalledTimes(2);
  expect(mockBeginCallback).toHaveBeenNthCalledWith(1);
  expect(mockBeginCallback).toHaveBeenNthCalledWith(2);

  expect(mockApiFunctionAsync).toHaveBeenCalledTimes(2);
  expect(mockApiFunctionAsync).toHaveBeenCalledWith();

  expect(mockSuccesCallback).toHaveBeenCalledTimes(2);
  expect(mockSuccesCallback).toHaveBeenNthCalledWith(1, apiData, false);
  expect(mockSuccesCallback).toHaveBeenNthCalledWith(2, apiData, false);

  expect(mockFailedCallback).not.toHaveBeenCalled();

  done();
});

test("Sample get multiple requests from request scope", async (done) => {
  const apiData1 = { data: "api response data 1" };
  const mockBeginCallback1 = jest.fn();
  const mockSuccesCallback1 = jest.fn();
  const mockFailedCallback1 = jest.fn();

  const mockApiFunctionAsync1 = jest.fn(async () => {
    await wait(10);
    return apiData1;
  });

  const apiData2 = { data: "api response data 2" };
  const mockBeginCallback2 = jest.fn();
  const mockSuccesCallback2 = jest.fn();
  const mockFailedCallback2 = jest.fn();

  const mockApiFunctionAsync2 = jest.fn(async () => {
    await wait(10);
    return apiData2;
  });

  const requestScope = createRequestScope();
  const request1 = requestScope.getRequest(
    mockBeginCallback1,
    mockSuccesCallback1,
    mockFailedCallback1
  );
  await request1(mockApiFunctionAsync1);

  expect(mockBeginCallback1).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback1).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync1).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync1).toHaveBeenCalledWith();

  expect(mockSuccesCallback1).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback1).toHaveBeenCalledWith(apiData1, false);

  expect(mockFailedCallback1).not.toHaveBeenCalled();

  const request2 = requestScope.getRequest(
    mockBeginCallback2,
    mockSuccesCallback2,
    mockFailedCallback2
  );
  await request2(mockApiFunctionAsync2);

  expect(mockBeginCallback2).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback2).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync2).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync2).toHaveBeenCalledWith();

  expect(mockSuccesCallback2).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback2).toHaveBeenCalledWith(apiData2, false);

  expect(mockFailedCallback2).not.toHaveBeenCalled();

  done();
});

test("Test with callHistory side effect", async (done) => {
  const apiData = { data: "api response data" };
  const callHistory = [];
  const mockBeginCallback = jest.fn(() => callHistory.push("begin"));
  const mockSuccesCallback = jest.fn(() => callHistory.push("success"));
  const mockFailedCallback = jest.fn(() => callHistory.push("failed"));

  const mockApiFunctionAsync = jest.fn(async () => {
    callHistory.push("apiFunc start");
    try {
      await wait(10);
      return apiData;
    }
    finally {
      callHistory.push("apiFunc end");
    }
  });

  const requestScope = createRequestScope();
  const request = requestScope.getRequest(
    mockBeginCallback,
    mockSuccesCallback,
    mockFailedCallback
  );
  await request(mockApiFunctionAsync);

  expect(callHistory).toEqual([
    "begin",
    "apiFunc start",
    "apiFunc end",
    "success",
  ]);

  done();
});

//#region two requests
// how to read:
// 1:   request 1 start
// -1:  request 1 returns
// -1x: request 1 returns by throwing error

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

test("2a", async (done) => {
  // two requests 1, -1, 2, -2 (2a)
  const apiData = { data: "api response data" };
  const callHistory = [];
  const mockBeginCallback = jest.fn(() => callHistory.push("begin"));
  const mockSuccesCallback = jest.fn(() => callHistory.push("success"));
  const mockFailedCallback = jest.fn(() => callHistory.push("failed"));

  const mockApiFunctionAsync = jest.fn(async () => {
    callHistory.push("apiFunc start");
    try {
      await wait(10);
      return apiData;
    }
    finally {
      callHistory.push("apiFunc end");
    }
  });

  const requestScope = createRequestScope();
  const request = requestScope.getRequest(
    mockBeginCallback,
    mockSuccesCallback,
    mockFailedCallback
  );
  await request(mockApiFunctionAsync);
  await request(mockApiFunctionAsync);

  expect(mockBeginCallback).toHaveBeenCalledTimes(2);
  expect(mockBeginCallback).toHaveBeenNthCalledWith(1);
  expect(mockBeginCallback).toHaveBeenNthCalledWith(2);

  expect(mockApiFunctionAsync).toHaveBeenCalledTimes(2);
  expect(mockApiFunctionAsync).toHaveBeenCalledWith();

  expect(mockSuccesCallback).toHaveBeenCalledTimes(2);
  expect(mockSuccesCallback).toHaveBeenNthCalledWith(1, apiData, false);
  expect(mockSuccesCallback).toHaveBeenNthCalledWith(2, apiData, false);

  expect(mockFailedCallback).not.toHaveBeenCalled();

  expect(callHistory).toEqual([
    "begin",
    "apiFunc start",
    "apiFunc end",
    "success",
    "begin",
    "apiFunc start",
    "apiFunc end",
    "success",
  ]);

  done();
});

test("2b", async (done) => {
  // two requests 1, 2, -1, -2 (2b)
  // note: when first request returns, successCallback1 is called with second parameter(loading) true
  // meaning the last result is not returned
  const callHistory = [];

  const apiData1 = { data: "api response data 1" };
  const mockBeginCallback1 = jest.fn(() => callHistory.push("begin1"));
  const mockSuccesCallback1 = jest.fn(() => callHistory.push("success1"));
  const mockFailedCallback1 = jest.fn(() => callHistory.push("failed1"));

  const mockApiFunctionAsync1 = jest.fn(async () => {
    callHistory.push("apiFunc1 start");
    try {
      await wait(100);
      return apiData1;
    }
    finally {
      callHistory.push("apiFunc1 end");
    }
  });

  const apiData2 = { data: "api response data 2" };
  const mockBeginCallback2 = jest.fn(() => callHistory.push("begin2"));
  const mockSuccesCallback2 = jest.fn(() => callHistory.push("success2"));
  const mockFailedCallback2 = jest.fn(() => callHistory.push("failed2"));

  const mockApiFunctionAsync2 = jest.fn(async () => {
    callHistory.push("apiFunc2 start");
    try {
      await wait(200);
      return apiData2;
    }
    finally {
      callHistory.push("apiFunc2 end");
    }
  });

  const requestScope = createRequestScope();
  const request1 = requestScope.getRequest(
    mockBeginCallback1,
    mockSuccesCallback1,
    mockFailedCallback1
  );

  const request2 = requestScope.getRequest(
    mockBeginCallback2,
    mockSuccesCallback2,
    mockFailedCallback2
  );
  await Promise.all([
    request1(mockApiFunctionAsync1),
    request2(mockApiFunctionAsync2)
  ]);

  expect(mockBeginCallback1).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback1).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync1).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync1).toHaveBeenCalledWith();

  expect(mockBeginCallback2).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback2).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync2).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync2).toHaveBeenCalledWith();

  expect(mockSuccesCallback1).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback1).toHaveBeenCalledWith(apiData1, true); // loading

  expect(mockSuccesCallback2).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback2).toHaveBeenCalledWith(apiData2, false);

  expect(mockFailedCallback1).not.toHaveBeenCalled();

  expect(mockFailedCallback2).not.toHaveBeenCalled();

  expect(callHistory).toEqual([
    "begin1",
    "apiFunc1 start",
    "begin2",
    "apiFunc2 start",
    "apiFunc1 end",
    "success1",
    "apiFunc2 end",
    "success2",
  ]);

  done();
});

test("2c", async (done) => {
  // two requests 1, 2, -2, -1 (2c)
  const callHistory = [];

  const apiData1 = { data: "api response data 1" };
  const mockBeginCallback1 = jest.fn(() => callHistory.push("begin1"));
  const mockSuccesCallback1 = jest.fn(() => callHistory.push("success1"));
  const mockFailedCallback1 = jest.fn(() => callHistory.push("failed1"));

  const mockApiFunctionAsync1 = jest.fn(async () => {
    callHistory.push("apiFunc1 start");
    try {
      await wait(200);
      return apiData1;
    }
    finally {
      callHistory.push("apiFunc1 end");
    }
  });

  const apiData2 = { data: "api response data 2" };
  const mockBeginCallback2 = jest.fn(() => callHistory.push("begin2"));
  const mockSuccesCallback2 = jest.fn(() => callHistory.push("success2"));
  const mockFailedCallback2 = jest.fn(() => callHistory.push("failed2"));

  const mockApiFunctionAsync2 = jest.fn(async () => {
    callHistory.push("apiFunc2 start");
    try {
      await wait(100);
      return apiData2;
    }
    finally {
      callHistory.push("apiFunc2 end");
    }
  });

  const requestScope = createRequestScope();
  const request1 = requestScope.getRequest(
    mockBeginCallback1,
    mockSuccesCallback1,
    mockFailedCallback1
  );

  const request2 = requestScope.getRequest(
    mockBeginCallback2,
    mockSuccesCallback2,
    mockFailedCallback2
  );
  await Promise.all([
    request1(mockApiFunctionAsync1),
    request2(mockApiFunctionAsync2)
  ]);

  expect(mockBeginCallback1).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback1).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync1).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync1).toHaveBeenCalledWith();

  expect(mockBeginCallback2).toHaveBeenCalledTimes(1);
  expect(mockBeginCallback2).toHaveBeenCalledWith();

  expect(mockApiFunctionAsync2).toHaveBeenCalledTimes(1);
  expect(mockApiFunctionAsync2).toHaveBeenCalledWith();

  expect(mockSuccesCallback2).toHaveBeenCalledTimes(1);
  expect(mockSuccesCallback2).toHaveBeenCalledWith(apiData2, false);

  expect(mockSuccesCallback1).not.toHaveBeenCalled();

  expect(mockFailedCallback1).not.toHaveBeenCalled();

  expect(mockFailedCallback2).not.toHaveBeenCalled();

  expect(callHistory).toEqual([
    "begin1",
    "apiFunc1 start",
    "begin2",
    "apiFunc2 start",
    "apiFunc2 end",
    "success2",
    "apiFunc1 end"
  ]);

  done();
});
//#endregion two requests

// tests would assume a completed (1, -1) will have no effect on later requests.
// The following will start at 1,2,3, then each representation the order of response.
// - three requests: different order response: (1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1)
// - three requests: different order response: with some fails (last fail): (1,2,3x), (3x,1,2), (3x,1,2x)
// - three requests: different order response: with some fails (non-last fail): (1,2x,3), (1,3,2x)

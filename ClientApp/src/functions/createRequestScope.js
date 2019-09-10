import getNextId from './getNextId';

// this is to handle requests that can cause race conditons.
// all requests will be called
// only the returning of the last called request will make isLoading false
// intermediate results returned in-order can be used or ignored depending on the isLoading argument

const requestStatus = Object.freeze({
  started: "started",
  finished: "finished",
  ignored: "ignored",
})

const previousRequestInitial = {
  id: undefined,
  status: undefined,
};

const previousRequestsInitial = [];

// const beginCallback = () => { };
// const successCallback = (result, isLoading) => { if(!isLoading){ setState(result); }};
// const failedCallback = (error, isLoading) => { console.log(error.message) };
const createRequestScope = () => {
  let previousRequests = previousRequestsInitial;

  //#region previousRequests functions
  // returns id
  const startedRequest = () => {
    if (!previousRequests.some(r => r.status === requestStatus.started)) {
      previousRequests = previousRequestsInitial;
    }
    const id = getNextId(previousRequests);
    previousRequests = [...previousRequests, { id, status: requestStatus.started }];
    return id;
  };

  const finishedRequest = id => {
    return previousRequests.map(r => {
      if (r.id === id) {
        return { id, status: requestStatus.finished }
      }
      return r;
    });
  };

  const ignoredRequest = id => {
    return previousRequests.map(r => {
      if (r.id === id) {
        return { id, status: requestStatus.ignored }
      }
      return r;
    });
  };

  // callback may be onSuccess or onRejected
  // onSuccess = onFulfilled and response.ok
  // onRejected = onRejected or !response.ok
  // arg may be (fulfillment value: the response) or (rejection reason: the error)
  // callback takes first argument arg, and second argement isLoading
  // isLoading is false when the last request is finished, or no requests(trivial).
  const handleResponse = (id, callback, arg) => {
    if (previousRequests.some(r => r.id > id && r.requestStatus === requestStatus.finished)) {
      ignoredRequest(id);
    }
    else {
      finishedRequest(id);
      const isloading = getIsLoading();
      return callback(arg, isloading);
    }
  };

  const getIsLoading = () => {
    if (previousRequests.length === 0) {
      return false;
    };
    return previousRequests[previousRequests.length - 1].status === requestStatus.started;
  }
  //#endregion previousRequests functions

  const getRequest = (
    beginCallback,
    successCallback,
    failedCallback
  ) => {
    const requestAsync = async (apiFunctionAsync) => {
      const id = startedRequest();
      beginCallback();
      //setstate isLoading
      try {
        const result = await apiFunctionAsync;
        return handleResponse(id, successCallback, result);
      } catch (e) {
        return handleResponse(id, failedCallback, e);
      }
    };
    return requestAsync;
  };
  const requestScope = {
    getRequest
  };
  return requestScope;
};

export default createRequestScope;

import template from 'url-template';

// page token is optional parameter
// returns promise of
// {
//   data,
//   nextPageToken
// }
// data is an array of jobSetHeaderDto
export const getJobSetsUrlTemplate = `api/job-sets{?pageToken}`;
export async function getJobSetsApiAsync(pageToken) {
  const url = template.parse(getJobSetsUrlTemplate).expand({ pageToken });
  const response = await fetch(url);
  if (!response.ok) {
    // maybe error message?
    throw Error(response.statusText);
  }
  let responseBody;
  try {
    responseBody = await response.json();
  }
  catch (e) {
    throw new Error(`Wrong api response format. ${e.message}`);
  }
  if (!responseBody.data) {
    throw Error("No data in api response.");
  }
  return responseBody;
};

export const deleteJobSetsUrlTemplate = `api/job-sets/{id}`;
export async function deleteJobSetsApiAsync(id, eTag) {
  const url = template.parse(deleteJobSetsUrlTemplate).expand({ id });
  const init = !eTag ?
  { method: "DELETE" } :
  {
    method: "DELETE",
    headers: {
      "If-Match": eTag
    }
  };
  const response = await fetch(url, init);
  if (!response.ok) {
    throw Error(response.statusText);
  }
};
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
  let responseJson;
  try {
    responseJson = await response.json();
  }
  catch (e) {
    throw new Error(`Wrong api response format. ${e.message}`);
  }
  if (!responseJson.data) {
    throw Error("No data in api response.");
  }
  return responseJson;
};
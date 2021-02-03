const API_URL = 'http://localhost:1337';

export async function listLogEntries(){
  const response = await fetch(`${API_URL}/api/logs`);
  const result = await response.json();
  return result;
}

export async function createLogEntry(entry){
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(entry)
  });
  const result = await response.json();
  if(response.ok){
    return result;
  }
  const error = new Error(result.message);
  error.response = result; // axios already has error.response with it
  throw error;
}

// whenever an axios request throws an error
// the error object has response on it (that is the actual parse response)
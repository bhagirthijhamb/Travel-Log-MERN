const API_URL = 'http://localhost:1337';

 export async function listLogEntries(){
  const response = await fetch(`${API_URL}/api/logs`);
  const result = await response.json();
  return result;
}
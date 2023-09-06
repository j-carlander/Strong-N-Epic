function saveSessionValue(ref: string, value: string | object) {
  value = JSON.stringify(value);

  sessionStorage.setItem(ref, value);
}

function getSessionValue(ref: string) {
  const value = sessionStorage.getItem(ref);

  if(!value) {
    throw new Error("blabla");
  }
  
  return JSON.parse(value);
}

function removeSessionValue(ref: string) {
  sessionStorage.removeItem(ref);
}

const memoryService = { saveSessionValue, getSessionValue, removeSessionValue };
export default memoryService;
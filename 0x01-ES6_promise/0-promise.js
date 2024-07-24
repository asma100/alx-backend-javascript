function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const operationSuccessful = Math.random() > 0.5;

      if (operationSuccessful) {
        resolve(true);
      } else {
        reject(new Error("Operation failed"));
      }
    }, 1000); // Simulate a 1-second delay
  });
}

export default getResponseFromAPI;

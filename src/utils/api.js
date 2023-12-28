// errorHandler.js

export const handleError = (error, errorMessage) => {
    if (error.response) {
        errorMessage.value = error.response.data.message || `Error: ${error.response.status}`;
    } else if (error.request) {
        errorMessage.value = "No response was received from the API server.";
    } else {
        errorMessage.value = error.message;
    }
};

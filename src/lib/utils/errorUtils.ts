export function onSubmitErrorMessage(response: Response): string {
  if (response.status === 401) {
    return "You must be logged in to perform this action. Please sign in again.";
  } else if (response.status === 400) {
    return "Invalid form data. Please check your inputs.";
  } else {
    return "Something went wrong. Please try again.";
  }
}

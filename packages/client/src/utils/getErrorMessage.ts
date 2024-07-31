function getErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && error.data) {
    return error.data.message;
  }

  return 'An unknown error occurred.';
}

export default getErrorMessage;

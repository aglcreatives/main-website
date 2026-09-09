interface ApiResult {
  message?: string;
}

export const readApiResult = async (response: Response): Promise<ApiResult> => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      return await response.json() as ApiResult;
    } catch {
      // Fall through to a useful status-based message below.
    }
  }

  if (response.status >= 500) {
    return { message: 'Our inquiry service is temporarily unavailable. Please call +91 7982214262.' };
  }

  return { message: 'We could not process that request. Please try again.' };
};

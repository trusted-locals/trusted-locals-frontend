const getEndpointURL = (): string => 'http://localhost:8080';

export function fetch<D>(
  path: string,
  options: {
    fetchOptions: Parameters<typeof window.fetch>[1];
    onEnd?: () => void;
    onFailure: (error: { errorMessage: string }) => void;
    onStart?: () => void;
    onSuccess: (data: D) => void;
  },
): Promise<void> {
  options.onStart?.();

  return window
    .fetch(getEndpointURL() + path, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options.fetchOptions,
    })
    .then((response: Response) => {
      return response.json().then((json) => {
        if (response.ok) {
          return json;
        }

        throw json;
      });
    })
    .then((json: D) => {
      options.onSuccess(json);
    })
    .catch((error) => {
      options.onFailure({
        errorMessage: error.errorMessage || 'An unknown error has occured.',
      });
    })
    .finally(() => {
      options.onEnd?.();
    });
}

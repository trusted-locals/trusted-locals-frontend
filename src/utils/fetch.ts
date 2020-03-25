const DEFAULT_OPTIONS: Parameters<typeof window.fetch>[1] = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const ENDPOINT_URL = 'http://localhost:8080';

type ErrorType = {
  errorMessage: string;
};

export function fetch<D>(path: string, options?: object): Promise<D | ErrorType> {
  return window
    .fetch(ENDPOINT_URL + path, {
      ...DEFAULT_OPTIONS,
      ...options,
    })
    .then((response: Response) => {
      return response.json().then((json) => {
        if (response.ok) {
          return json;
        }

        throw json;
      });
    })
    .catch((error) => {
      throw new Error(error.errorMessage || 'An unknown error has occured.');
    });
}

const DEFAULT_OPTIONS: Parameters<typeof window.fetch>[1] = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const ENDPOINT_URL =
  process.env.NODE_ENV === 'production' ? 'https://ec2-54-89-76-249.compute-1.amazonaws.com' : 'http://localhost:8080';

export function fetch<D>(path: string, options?: object): Promise<D> {
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

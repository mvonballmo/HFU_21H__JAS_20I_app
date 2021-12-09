import { jest, describe, expect, test } from "@jest/globals";
import { crud } from "./crud";

describe("Fetch Timeout", () => {
  const fetchRequestDurationInMilliseconds = 1000;
  const fetchTimeoutInMilliseconds = 10;

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  global.fetch = async (url, info) => {
    for (let i = 0; i < fetchRequestDurationInMilliseconds; i += fetchTimeoutInMilliseconds) {
      await sleep(fetchTimeoutInMilliseconds);
      if (info.signal && info.signal.aborted) {
        const error = new Error("The user aborted a request.");
        error.name = "AbortError";

        return Promise.reject(error);
      }
    }

    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  };

  test("Call fetch with timeout via AbortController", async () => {
    const controller = new AbortController();
    const promise = fetch("http://localhost:3020/addresses", {
      signal: controller.signal,
    });

    const timeoutId = setTimeout(() => controller.abort(), fetchTimeoutInMilliseconds);

    try {
      await expect(promise).rejects.toThrow("The user aborted a request.");
    } finally {
      clearTimeout(timeoutId);
    }
  });

  test("Call fetch with timeout via AbortController with try/catch", async () => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), fetchTimeoutInMilliseconds);

    try {
      await fetch("http://localhost:3021/addresses", {
        signal: controller.signal,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      expect(error.name).toBe("AbortError");
      expect(error.message).toBe("The user aborted a request.");
    } finally {
      clearTimeout(timeoutId);
    }
  });

  test("Call fetch with timeout in crud", async () => {
    /**
     * @type {crud<address>}
     */
    const addresses = new crud("http://localhost:3021/addresses");

    addresses.timeOutInMilliseconds = fetchTimeoutInMilliseconds;

    try {
      await addresses.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      expect(error.name).toBe("AbortError");
      expect(error.message).toBe("The user aborted a request.");
    }
  });
});

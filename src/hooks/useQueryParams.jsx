import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Custom Hook to manage query parameters
 * */

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  
  /**
   * Set a new query parameter
   * @param {string} key
   * @param {string | number | boolean | function} value
   * @returns void
   */

  const setParams = (key, value) => {
    validateKey(key);
    let v = value;
    if (typeof value === "function") {
      v = value(params.get(key));
    }
    params.set(key, v);
  };

  /**
   * Delete a query parameter
   * @param {string} key
   * @returns void
   */

  const deleteParams = (key) => {
    validateKey(key);
    params.delete(key);
  };

  /**
   * Get the value of a query parameter
   * @param {string} key
   * @returns {string | null}
   */

  const getParams = (key) => {
    validateKey(key);
    return params.get(key);
  };

  /**
   * Update the URL with the new query parameters
   */
  const updateParams = () =>
    router.replace(`${pathname}?${decodeURIComponent(params.toString())}`);

  return {
    get: getParams,
    set: setParams,
    delete: deleteParams,
    update: updateParams,
    keys: () => Array.from(params.keys()),
  };
};

export default useQueryParams;

const validateKey = (key) => {
  if (!key) {
    throw new Error("Key parameter is required.");
  }
};

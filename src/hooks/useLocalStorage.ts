export function useLocalStorage<T>(key: string) {
  function getItem(): T | null {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return null;
    }
    try {
      return JSON.parse(rawValue) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function setItem(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return { getItem, setItem };
}

import { act } from "react";
import { createRoot } from "react-dom/client";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

class MemoryStorage {
  constructor(values = {}) {
    this.values = new Map(Object.entries(values));
  }

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key) {
    return this.values.get(String(key)) ?? null;
  }

  key(index) {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key) {
    this.values.delete(String(key));
  }

  setItem(key, value) {
    this.values.set(String(key), String(value));
  }
}

let storageSeed;
const mountedRoots = [];

export function mockLocalStorage() {
  if (storageSeed === undefined) {
    storageSeed = {};
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      storageSeed[key] = window.localStorage.getItem(key);
    }
  }

  const storage = new MemoryStorage(storageSeed);
  Object.defineProperty(window, "localStorage", { configurable: true, value: storage });
  return storage;
}

export async function render(element) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mountedRoots.push({ container, root });
  await act(async () => root.render(element));
  return container;
}

export async function cleanUp() {
  await act(async () => {
    for (const { container, root } of mountedRoots.splice(0)) {
      root.unmount();
      container.remove();
    }
  });
}

export function setFieldValue(field, value) {
  const prototype = Object.getPrototypeOf(field);
  const setter = Object.getOwnPropertyDescriptor(prototype, "value").set;
  setter.call(field, value);
  field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

afterEach(cleanUp);

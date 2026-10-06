const STORAGE_PREFIX = "sake-d-binks";

const initialData = {
  productos: [
    { id: "p-001", nombre: "Chaqueta urbana", categoriaId: "c-001", precio: 54990, stock: 12 },
    { id: "p-002", nombre: "Polera esencial", categoriaId: "c-002", precio: 19990, stock: 24 },
    { id: "p-003", nombre: "Bolso diario", categoriaId: "c-003", precio: 32990, stock: 8 },
  ],
  categorias: [
    { id: "c-001", nombre: "Mujer" },
    { id: "c-002", nombre: "Hombre" },
    { id: "c-003", nombre: "Accesorios" },
  ],
  ordenes: [
    { id: "o-001", correo: "cliente@ejemplo.cl", estado: "Pendiente", total: 54990 },
  ],
};

function getStorageKey(collection) {
  if (!Object.hasOwn(initialData, collection)) {
    throw new Error(`Colección no válida: ${collection}`);
  }
  return `${STORAGE_PREFIX}:${collection}`;
}

function readCollection(collection) {
  const key = getStorageKey(collection);
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    const seed = structuredClone(initialData[collection]);
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }

  const records = JSON.parse(storedValue);
  if (!Array.isArray(records)) {
    throw new TypeError(`Los datos guardados para "${collection}" no son una lista.`);
  }
  return records;
}

function writeCollection(collection, records) {
  localStorage.setItem(getStorageKey(collection), JSON.stringify(records));
}

export function listRecords(collection) {
  return structuredClone(readCollection(collection));
}

export function getRecord(collection, id) {
  const record = readCollection(collection).find((item) => item.id === id);
  return record ? structuredClone(record) : null;
}

export function createRecord(collection, record) {
  const records = readCollection(collection);
  const newRecord = { ...record, id: record.id ?? crypto.randomUUID() };

  if (records.some((item) => item.id === newRecord.id)) {
    throw new Error(`Ya existe un registro con el id "${newRecord.id}".`);
  }

  writeCollection(collection, [...records, newRecord]);
  return structuredClone(newRecord);
}

export function updateRecord(collection, id, changes) {
  const records = readCollection(collection);
  const index = records.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`No existe un registro con el id "${id}".`);
  }

  const updatedRecord = { ...records[index], ...changes, id };
  records[index] = updatedRecord;
  writeCollection(collection, records);
  return structuredClone(updatedRecord);
}

export function deleteRecord(collection, id) {
  const records = readCollection(collection);
  const remainingRecords = records.filter((item) => item.id !== id);

  if (remainingRecords.length === records.length) {
    throw new Error(`No existe un registro con el id "${id}".`);
  }

  writeCollection(collection, remainingRecords);
}

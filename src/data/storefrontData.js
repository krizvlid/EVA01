const initialCategories = [
  { id: "mujer", name: "Mujer", image: "NoticiaK1.png", description: "Piezas contemporáneas para expresar tu estilo." },
  { id: "hombre", name: "Hombre", image: "taylor-grote-rnH5ITofDAM-unsplash.jpg", description: "Diseño y comodidad para todos los días." },
  { id: "ninos", name: "Niños", image: "edi-libedinsky-1bhp9zBPHVE-unsplash.jpg", description: "Prendas cómodas para cada aventura." },
  { id: "accesorios", name: "Accesorios", image: "trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg", description: "Detalles que completan cada look." },
];

const initialProducts = [
  { id: "vestido-midi", name: "Vestido midi combinado drapeado", category: "mujer", price: 45990, image: "vestiodaudifonos.jpg", thumbImage: "referenciaprimervesitdo.jpg", images: ["vestiodaudifonos.jpg", "vestiodaudifonos2.jpg", "vestiodaudifonos.jpg"], color: "Marfil", stockName: "VESTIDO MIDI COMBINADO DRAPEADO" },
  { id: "vestido-satinado", name: "Vestido largo satinado", category: "mujer", price: 69990, image: "vestidoestampado3.jpg", thumbImage: "referenciavestidoestampado.jpg", images: ["vestidoestampado3.jpg", "vestidoestampado.jpg", "vestidoestampado2.jpg"], color: "Estampado", sku: "SKU-009", stockName: "VESTIDO LARGO SATINADO", catalogSku: "SKU-013" },
  { id: "camisa-lino", name: "Camisa oversized lino", category: "mujer", price: 29990, image: "camisapuntos.jpg", thumbImage: "referenciacamisapuntos.jpg", images: ["camisapuntos.jpg", "camisapuntos2.jpg", "camisapuntos3.jpg"], color: "Azul", sku: "SKU-010", stockName: "CAMISA OVERSIZED LINO", catalogName: "CAMISA ENTALLADA FRUNCES" },
  { id: "blusa-bordada", name: "Blusa cuello bobo bordado", category: "mujer", price: 32990, image: "camisanudoderecha.jpg", thumbImage: "referenciacamisanudo.jpg", images: ["camisanudoderecha.jpg", "camisanudo1.jpg", "camisanudoizquierda.jpg"], color: "Blanco", sku: "SKU-011", stockName: "BLUSA CUELLO BOBO BORDADO", catalogSku: "SKU-015", catalogName: "CAMISA NUDOS" },
  { id: "camisa-negra", name: "Camisa regular fit negra", category: "hombre", price: 49990, image: "camisa1.jpg", thumbImage: "camisa3.jpg", images: ["camisa1.jpg", "camisa2.jpg", "camisa4.jpg"], color: "Negro", sku: "SKU-001", stockName: "CAMISA REGULAR FIT", catalogName: "CAMISA REGULAR FIT NEGRA" },
  { id: "camisa-oxford", name: "Camisa Oxford regular fit", category: "hombre", price: 52990, image: "CamisaB1.webp", thumbImage: "CamisaB4.webp", catalogImages: ["CamisaB1.webp", "CamisaB2.webp", "CamisaB3.webp"], images: ["CamisaB1.webp", "CamisaB2.webp"], color: "Blanco", sku: "SKU-002", stockName: "CAMISA ESTRUCTURADA OXFORD", catalogName: "CAMISA OXFORD REGULAR FIT", colorOptions: [{ name: "Verde", thumb: "CamisaC2.webp", images: ["CamisaC3.webp", "CamisaC4.webp"] }] },
  { id: "chaqueta-abrigo", name: "Abrigo mezcla lana", category: "hombre", price: 119990, image: "AbrigoH1.jpg", thumbImage: "AbrigoH5.jpg", catalogImages: ["AbrigoH1.jpg", "AbrigoH2.jpg", "AbrigoH3.jpg"], images: ["AbrigoH3.jpg", "AbrigoH4.jpg"], color: "Gris", sku: "SKU-006", stockName: "ABRIGO MEZCLA LANA" },
  { id: "polera-kids", name: "Polera algodón estampada", category: "ninos", price: 19990, image: "PoleraNino1.webp", thumbImage: "PoleraNino4.webp", catalogImages: ["PoleraNino1.webp", "PoleraNino2.webp"], images: ["PoleraNino1.webp", "PoleraNino3.webp"], color: "Rojo", sku: "SKU-017", stockName: "POLERA ALGODON ESTAMPADA", catalogSku: "SKU-021", catalogName: "POLERA ALGODÓN ESTAMPADA" },
  { id: "pantalon-kids", name: "Pantalón felpa relaxed fit", category: "ninos", price: 29990, image: "PantalonNino1.jpg", thumbImage: "PantalonNino4.jpg", catalogImages: ["PantalonNino1.jpg", "PantalonNino3.jpg"], images: ["PantalonNino1.jpg", "PantalonNino2.jpg"], color: "Gris", sku: "SKU-018", stockName: "PANTALON FELPA RELAXED FIT", sizeType: "pants", catalogSku: "SKU-022", catalogName: "PANTALÓN FELPA" },
  { id: "chaqueta-kids", name: "Chaqueta denim mini", category: "ninos", price: 39990, image: "ChaquetaNino1.jpg", thumbImage: "ChaquetaNino3.jpg", catalogImages: ["ChaquetaNino1.jpg"], images: ["ChaquetaNino1.jpg", "ChaquetaNino2.jpg"], color: "Denim", sku: "SKU-019", stockName: "CHAQUETA DENIM MINI", catalogSku: "SKU-023" },
  { id: "collares", name: "Pack de collares luna y estrellas", category: "accesorios", price: 29990, image: "collares.jpg", thumbImage: "collares2.jpg", images: ["collares.jpg", "collares2.jpg"], color: "Oro / plata", stockName: "PACK 2 COLLARES COMBINADOS LUNA ESTRELLAS" },
  { id: "bolso", name: "Maleta deportiva multifunción 35L", category: "accesorios", price: 65990, image: "bolsoverded.jpg", images: ["bolsoverded.jpg"], color: "Verde", stockName: "MALETA DEPORTIVA MULTIFUNCIÓN 35L" },
  { id: "guantes", name: "Guantes efecto piel punto", category: "accesorios", price: 23990, image: "guantespuestos.jpg", thumbImage: "referenciaguantes.jpg", images: ["guantespuestos.jpg", "guantes.jpg"], color: "Negro", stockName: "GUANTES EFECTO PIEL PUNTO" },
  { id: "perfume", name: "Brûlante Violette Parfum 100ml", category: "accesorios", price: 45990, image: "perfume.jpg", thumbImage: "perfume.jpg", images: ["perfume.jpg"], color: "Violette", stockName: "BRÛLANTE VIOLETTE PARFUM 100ML" },
  { id: "top-estructurado", name: "Top estructurado blanco", category: "mujer", price: 29990, image: "topbodies.jpg", thumbImage: "referenciatopnegro.jpg", catalogImages: ["topbodies.jpg", "topbodies3.jpg"], images: ["topbodies.jpg", "topbodies3.jpg", "topboides2.jpg"], color: "Blanco", sku: "SKU-012", stockName: "TOP ESTRUCTURADO BLANCO", catalogSku: "SKU-016", catalogName: "TOP ALAMARES MANGA CORTA" },
  { id: "polera-cotton-graphic", name: "Polera cotton graphic", category: "mujer", price: 25990, image: "Polera1.jpg", thumbImage: "referenciacamisetablanca.jpg", catalogImages: ["Polera2.jpg", "Polera1.jpg"], sourceImage: "Polera1.jpg", images: ["Polera1.jpg", "Polera2.jpg", "Polera4.webp"], color: "Blanco", sku: "SKU-013", stockName: "POLERA COTTON GRAPHIC", catalogSku: "SKU-017", catalogName: "CAMISETA CUELLO REDONDO", catalogPrice: 14990 },
  { id: "chaqueta-oversized-women", name: "Chaqueta oversized structural", category: "mujer", price: 89990, image: "04391810800-a1.jpg", thumbImage: "referenciachaquetanegra.jpg", images: ["04391810800-a1.jpg", "04391810800-p.jpg"], color: "Negro", sku: "SKU-014", stockName: "CHAQUETA OVERSIZED STRUCTURAL", catalogSku: "SKU-018" },
  { id: "jeans-high-waist", name: "Jeans high waist straight", category: "mujer", price: 54990, image: "02569210400-p.jpg", thumbImage: "referenciapantalon.jpg", images: ["02569210400-p.jpg", "02569210400-a1.jpg", "02569210400-a5.jpg"], color: "Denim", sku: "SKU-015", stockName: "JEANS HIGH WAIST STRAIGHT", sizeType: "pants", catalogSku: "SKU-019" },
  { id: "mocasines-minimal", name: "Mocasines de cuero minimal", category: "mujer", price: 65990, image: "13595610709-p.jpg", thumbImage: "referenciazapato.jpg", images: ["13595610709-p.jpg"], color: "Negro", sku: "SKU-016", stockName: "MOCASINES DE CUERO MINIMAL", sizeType: "shoes", catalogSku: "SKU-020" },
  { id: "heavy-cotton-men", name: "Polera heavy cotton oversized", category: "hombre", price: 29990, image: "Polera1.webp", thumbImage: "Polera3.webp", images: ["Polera1.webp", "Polera2.webp"], color: "Negro", sku: "SKU-003", stockName: "POLERA HEAVY COTTON OVERSIZED", colorOptions: [{ name: "Blanco", thumb: "Polera5.webp", images: ["Polera4.webp", "Polera6.webp"] }, { name: "Burdeo", thumb: "Polera8.webp", images: ["Polera7.webp", "Polera9.webp"] }] },
  { id: "chaqueta-cazadora", name: "Chaqueta cazadora Oxford", category: "hombre", price: 52990, catalogPrice: 89990, image: "Chaqueta2.jpg", thumbImage: "Chaqueta5.jpg", catalogImages: ["Chaqueta2.jpg", "Chaqueta1.jpg"], images: ["Chaqueta3.jpg", "Chaqueta4.jpg"], color: "Negro", sku: "SKU-004", stockName: "CHAQUETA CAZADORA OXFORD", catalogName: "CHAQUETA Cazadora" },
  { id: "pantalon-chino", name: "Pantalón chino tapered", category: "hombre", price: 54990, image: "Pantalon5.jpg", thumbImage: "Pantalon4.jpg", catalogImages: ["Pantalon1.jpg", "Pantalon2.jpg", "Pantalon3.jpg"], images: ["Pantalon5.jpg", "Pantalon6.jpg"], color: "Camel claro", sku: "SKU-005", stockName: "PANTALON CHINO TAPERED", catalogName: "PANTALÓN CHINO TAPERED", sizeType: "pants" },
  { id: "mocasines-derby", name: "Mocasines de cuero Derby", category: "hombre", price: 75990, image: "ZapatosH1.webp", thumbImage: "ZapatosH2.webp", images: ["ZapatosH1.webp", "ZapatosH3L.webp"], color: "Negro", sku: "SKU-007", stockName: "MOCASINES DE CUERO DERBY", sizeType: "shoes" },
  { id: "zapatillas-kids", name: "Zapatillas urbanas kids", category: "ninos", price: 34990, image: "ZapatillaNino1.jpg", thumbImage: "ZapatillaNino4.jpg", catalogImages: ["ZapatillaNino1.jpg"], images: ["ZapatillaNino2.jpg", "ZapatillaNino3.jpg"], color: "Negro", sku: "SKU-020", stockName: "ZAPATILLAS URBANAS KIDS", sizeType: "kidsShoes" },
  { id: "vestido-boho", name: "Vestido boho chic borlas", category: "mujer", price: 79990, image: "vestidojaponm.jpg", images: ["vestidojaponm.jpg", "mcpeter-5FdfBNJXo3k-unsplash.jpg"], color: "Estampado", sku: "SKU-008", stockName: "VESTIDO BOHO CHIC BORLAS" },
  { id: "camisa-lino-essential", name: "Camisa lino essential", category: "hombre", price: 42990, image: "CamisaB1.webp", sourceImage: "camisa1.jpg", images: ["CamisaB1.webp"], color: "Blanco", catalogSku: "SKU-009" },
  { id: "polera-basica-heavyweight", name: "Polera básica heavyweight", category: "hombre", price: 29990, image: "Polera1.webp", sourceImage: "Polera1.webp", images: ["Polera1.webp"], color: "Negro", catalogSku: "SKU-001" },
  { id: "polera-oversized-graphic", name: "Polera oversized graphic", category: "hombre", price: 32990, image: "Polera2.webp", sourceImage: "Polera2.webp", images: ["Polera2.webp"], color: "Blanco", catalogSku: "SKU-002" },
  { id: "pantalon-cargo-tailored", name: "Pantalón cargo tailored", category: "hombre", price: 59990, image: "Pantalon5.jpg", sourceImage: "Pantalon5.jpg", images: ["Pantalon5.jpg", "Pantalon6.jpg"], color: "Camel", catalogSku: "SKU-003", sizeType: "pants" },
  { id: "pantalon-chino-straight", name: "Pantalón chino straight", category: "hombre", price: 49990, image: "Pantalon1.jpg", sourceImage: "Pantalon1.jpg", images: ["Pantalon1.jpg", "Pantalon2.jpg"], color: "Camel", catalogSku: "SKU-004", sizeType: "pants" },
  { id: "chaqueta-denim-vintage", name: "Chaqueta denim vintage wash", category: "hombre", price: 79990, image: "Chaqueta1.jpg", sourceImage: "Chaqueta1.jpg", images: ["Chaqueta1.jpg", "Chaqueta2.jpg"], color: "Denim", catalogSku: "SKU-005" },
  { id: "bomber-jacket", name: "Bomber jacket minimal", category: "hombre", price: 89990, image: "Chaqueta2.jpg", sourceImage: "Chaqueta2.jpg", images: ["Chaqueta2.jpg", "Chaqueta3.jpg"], color: "Negro", catalogSku: "SKU-006" },
  { id: "hoodie-heavy-cotton", name: "Polerón hoodie heavy cotton", category: "hombre", price: 45990, image: "AbrigoH1.jpg", sourceImage: "AbrigoH1.jpg", images: ["AbrigoH1.jpg", "AbrigoH2.jpg"], color: "Gris", catalogSku: "SKU-007" },
  { id: "crewneck-essential", name: "Polerón crewneck essential", category: "hombre", price: 39990, image: "Polera1.webp", sourceImage: "Polera1.webp", images: ["Polera1.webp", "Polera2.webp"], color: "Negro", catalogSku: "SKU-008" },
  { id: "zapatillas-leather-urban", name: "Zapatillas leather urban", category: "hombre", price: 69990, image: "ZapatosH1.webp", sourceImage: "ZapatosH1.webp", images: ["ZapatosH1.webp", "ZapatosH3L.webp"], color: "Negro", catalogSku: "SKU-010", sizeType: "shoes" },
  { id: "botas-leather-chelsea", name: "Botas leather Chelsea", category: "hombre", price: 89990, image: "ZapatosH3L.webp", sourceImage: "ZapatosH3L.webp", images: ["ZapatosH3L.webp", "ZapatosH4.png"], color: "Negro", catalogSku: "SKU-011", sizeType: "shoes" },
  { id: "camisa-lino-essential-mujer", name: "Camisa oversized lino essential", category: "mujer", price: 49990, image: "amin-naderloei-Mg2chTCMzhk-unsplash.jpg", images: ["amin-naderloei-Mg2chTCMzhk-unsplash.jpg", "amin-naderloei-aLHw5V2HTUo-unsplash.jpg", "amin-naderloei-hoczaAFmSf4-unsplash.jpg"], color: "Natural", catalogSku: "SKU-014" },
  { id: "bolso-cuero-minimalist", name: "Bolso de cuero minimalist", category: "accesorios", price: 89990, image: "bolsoverded.jpg", sourceImage: "bolsoverded.jpg", images: ["bolsoverded.jpg"], color: "Negro", catalogSku: "SKU-025" },
  { id: "collar-plated-gold", name: "Collar plated gold", category: "accesorios", price: 24990, image: "collares.jpg", sourceImage: "collares.jpg", images: ["collares.jpg", "collares2.jpg"], color: "Oro", catalogSku: "SKU-026" },
  { id: "gafas-retro-black", name: "Gafas de sol retro black", category: "accesorios", price: 32990, image: "trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg", sourceImage: "trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg", images: ["trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg"], color: "Negro", catalogSku: "SKU-027" },
  { id: "bucket-hat-cotton", name: "Bucket hat cotton", category: "accesorios", price: 18990, image: "guantes.jpg", sourceImage: "guantes.jpg", images: ["guantes.jpg"], color: "Negro", catalogSku: "SKU-028" },
];

const storagePrefix = "sake-d-binks";
const collectionNames = ["productos", "categorias", "ordenes", "usuarios"];
const initialCollections = {
  productos: initialProducts.map((product) => ({ ...product, estado: "Activo" })),
  categorias: initialCategories,
  ordenes: [],
  usuarios: [],
};
const perSizeStockProductIds = new Set(initialProducts.map((product) => product.id));
const listeners = new Set();
let dataVersion = 0;

function getCollectionKey(collection) {
  if (!collectionNames.includes(collection)) throw new Error(`Colección no válida: ${collection}`);
  return `${storagePrefix}:${collection}`;
}

function readCollection(collection) {
  const key = getCollectionKey(collection);
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    const seed = structuredClone(initialCollections[collection]);
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }

  const records = JSON.parse(storedValue);
  if (!Array.isArray(records)) throw new TypeError(`Los datos guardados para "${collection}" no son una lista.`);

  if (collection === "categorias" && records.some((record) => !record.name)) {
    const migrated = structuredClone(initialCategories);
    records.forEach((record) => {
      const name = String(record.name ?? record.nombre ?? "").trim();
      const base = initialCategories.find((category) => category.name.toLowerCase() === name.toLowerCase());
      if (base) {
        const index = migrated.findIndex((category) => category.id === base.id);
        migrated[index] = { ...base, ...record, id: base.id, name };
      } else if (name) {
        migrated.push({ id: record.id ?? crypto.randomUUID(), name, image: initialCategories[0].image, description: "" });
      }
    });
    localStorage.setItem(key, JSON.stringify(migrated));
    return migrated;
  }

  if (collection === "productos" && records.some((record) => !record.name || !record.category || !record.image)) {
    const migrated = initialCollections.productos.map((product) => ({ ...product }));
    records.forEach((record) => {
      if (record.name && record.category && record.image) {
        const index = migrated.findIndex((product) => product.id === record.id);
        if (index < 0) migrated.push(record);
        else migrated[index] = { ...migrated[index], ...record };
        return;
      }
      const legacyCategory = categories.find((category) => category.id === record.categoryId)
        ?? { name: { "c-001": "Mujer", "c-002": "Hombre", "c-003": "Accesorios" }[record.categoryId] };
      const category = initialCategories.find((item) => item.name.toLowerCase() === String(legacyCategory?.name ?? "").toLowerCase())
        ?? initialCategories[0];
      const id = String(record.id ?? crypto.randomUUID());
      const legacyProduct = {
        id,
        name: String(record.nombre ?? "Producto"),
        stockName: String(record.nombre ?? "Producto").toUpperCase(),
        category: category.id,
        price: Number(record.precio) || 0,
        stock: Math.max(0, Number(record.stock) || 0),
        estado: "Activo",
        image: category.image,
        thumbImage: category.image,
        images: [category.image],
        sku: `ADM-${id}`,
        adminCreated: true,
      };
      const index = migrated.findIndex((product) => product.id === id);
      if (index < 0) migrated.push(legacyProduct);
      else migrated[index] = { ...migrated[index], ...legacyProduct };
    });
    localStorage.setItem(key, JSON.stringify(migrated));
    return migrated;
  }
  return records;
}

function publishChange() {
  dataVersion += 1;
  products = readCollection("productos");
  categories = readCollection("categorias");
  listeners.forEach((listener) => listener());
}

function writeCollection(collection, records) {
  localStorage.setItem(getCollectionKey(collection), JSON.stringify(records));
  if (collection === "productos" || collection === "categorias") publishChange();
  else {
    dataVersion += 1;
    listeners.forEach((listener) => listener());
  }
}

export let categories = readCollection("categorias");
export let products = readCollection("productos");

export function subscribeStoreData(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getStoreDataVersion() {
  return dataVersion;
}

export function useStoreData() {
  return useSyncExternalStore(subscribeStoreData, getStoreDataVersion, getStoreDataVersion);
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
  if (index === -1) throw new Error(`No existe un registro con el id "${id}".`);
  records[index] = { ...records[index], ...changes, id };
  writeCollection(collection, records);
  return structuredClone(records[index]);
}

export function deleteRecord(collection, id) {
  const records = readCollection(collection);
  const remaining = records.filter((item) => item.id !== id);
  if (remaining.length === records.length) throw new Error(`No existe un registro con el id "${id}".`);
  writeCollection(collection, remaining);
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key && !collectionNames.some((name) => event.key === getCollectionKey(name))) return;
    products = readCollection("productos");
    categories = readCollection("categorias");
    dataVersion += 1;
    listeners.forEach((listener) => listener());
  });
}

export const articles = [
  {
    id: "silueta",
    category: "Moda",
    title: "Adidas presenta un adelanto de su colaboración con la estrella del K-pop Jennie",
    summary: "mientras el gigante de la ropa deportiva continúa aprovechando las colaboraciones con celebridades para impulsar su crecimiento.",
    image: "Noticia1.avif",
    paragraphs: [
      "Jennie asume el papel de codiseñadora con una colección que une la funcionalidad deportiva y una estética inspirada en el ballet.",
      "La propuesta incluye prendas y complementos que reinterpretan siluetas clásicas con una energía actual, cuidando los detalles y las proporciones.",
    ],
  },
  {
    id: "texturas",
    category: "Colección",
    title: "Nueva York abraza el renacimiento de las marcas emblemáticas estadounidenses",
    summary: "La Semana de la Moda de Nueva York comenzará la próxima semana con una selección de marcas de legado estadounidense que han logrado atraer a los compradores más jóvenes de la generación Z, pese a las dificultades más amplias que atraviesa el sector del lujo a escala mundial.",
    image: "Noticia2.avif",
    paragraphs: [
      "La Semana de la Moda de Nueva York vuelve a poner en conversación a las casas de tradición estadounidense y a una nueva generación de diseñadores.",
      "Materiales reconocibles, prendas versátiles y una mirada renovada son parte de las claves que mantienen vigente este legado.",
    ],
  },
  {
    id: "armario",
    category: "Moda",
    title: "Sake D Binks New York elige a Kendall Jenner como imagen de su campaña para este otoño",
    summary: "Sake D Binks New York ha fichado a Kendall Jenner para su campaña de otoño 2026.",
    image: "NoticiaK1.png",
    paragraphs: [
      "Sake D Binks New York ha fichado a Kendall Jenner para su campaña de otoño 2026. Fotografiada por Mert Alas, Jenner debuta como imagen de la marca en enclaves emblemáticos de Nueva York.",
    ],
  },
];

export function imageUrl(fileName) {
  return `/Imagenes/${fileName}`;
}

const sizeSets = {
  standard: ["XS", "S", "M", "L", "XL"],
  pants: ["28/30", "30/30", "32/30", "34/32", "36/32"],
  shoes: ["35", "36", "37", "38", "39", "40", "41", "42"],
  kidsShoes: ["24", "26", "28", "30", "32", "34"],
  unique: ["Única"],
};

export function getProductSizes(product) {
  if (["accesorios", "collar", "bolso", "maleta", "guantes", "parfum", "perfume", "gafas", "bucket"].some((term) => `${product.category} ${product.stockName ?? product.name}`.toLowerCase().includes(term))) {
    return sizeSets.unique;
  }
  if (product.catalogSku && !product.sku) return sizeSets.standard;
  return sizeSets[product.sizeType] ?? sizeSets.standard;
}

function generateSku(name) {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) % 900;
  }
  return `SKU-${String(hash + 100).padStart(3, "0")}`;
}

export function getProductStockCode(product) {
  return product.sku ?? product.catalogSku ?? generateSku(product.stockName ?? product.name);
}

export function usesPerSizeStock(product) {
  return perSizeStockProductIds.has(product.id);
}

export function getProductSizeStockKey(product, size, color = product.color) {
  const stockCode = getProductStockCode(product);
  const colorKey = color && color !== product.color ? `_${encodeURIComponent(color)}` : "";
  return `sake_stock_${stockCode}${colorKey}_${encodeURIComponent(size)}`;
}

export function getProductSizeStock(product, size, color = product.color) {
  const stockCode = getProductStockCode(product);
  if (!usesPerSizeStock(product) && Number.isInteger(Number(product.stock)) && product.stock !== undefined) {
    return Number(product.stock);
  }

  const key = getProductSizeStockKey(product, size, color);
  const savedStock = localStorage.getItem(key);
  if (savedStock !== null && Number.isInteger(Number(savedStock))) {
    const stock = Number(savedStock);
    if (!usesPerSizeStock(product) || stock <= 15) return stock;
    localStorage.setItem(key, "15");
    return 15;
  }

  let hash = 0;
  for (let index = 0; index < stockCode.length; index += 1) {
    hash = (hash * 31 + stockCode.charCodeAt(index)) % 15;
  }
  const sizeIndex = getProductSizes(product).indexOf(String(size));
  const colorIndex = color === product.color
    ? 0
    : (product.colorOptions ?? []).findIndex((option) => option.name === color) + 1;
  const initialStock = ((hash + Math.max(0, sizeIndex) * 7 + Math.max(0, colorIndex) * 5) % 15) + 1;
  localStorage.setItem(key, String(initialStock));
  return initialStock;
}

export function formatPrice(price) {
  return `${new Intl.NumberFormat("es-CL").format(price)} CLP`;
}
import { useSyncExternalStore } from "react";

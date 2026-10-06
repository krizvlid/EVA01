export const categories = [
  { id: "mujer", name: "Mujer", image: "NoticiaK1.png", description: "Piezas contemporáneas para expresar tu estilo." },
  { id: "hombre", name: "Hombre", image: "taylor-grote-rnH5ITofDAM-unsplash.jpg", description: "Diseño y comodidad para todos los días." },
  { id: "ninos", name: "Niños", image: "edi-libedinsky-1bhp9zBPHVE-unsplash.jpg", description: "Prendas cómodas para cada aventura." },
  { id: "accesorios", name: "Accesorios", image: "trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg", description: "Detalles que completan cada look." },
];

export const products = [
  { id: "vestido-midi", name: "Vestido midi combinado drapeado", category: "mujer", price: 45990, image: "vestiodaudifonos.jpg", images: ["vestiodaudifonos.jpg", "vestiodaudifonos2.jpg"], color: "Marfil", stockName: "VESTIDO MIDI COMBINADO DRAPEADO" },
  { id: "vestido-satinado", name: "Vestido largo satinado", category: "mujer", price: 69990, image: "vestidoestampado3.jpg", images: ["vestidoestampado3.jpg", "vestidoestampado.jpg", "vestidoestampado2.jpg", "mcpeter-5FdfBNJXo3k-unsplash.jpg"], color: "Estampado", sku: "SKU-009", stockName: "VESTIDO LARGO SATINADO", catalogSku: "SKU-013" },
  { id: "camisa-lino", name: "Camisa oversized lino", category: "mujer", price: 29990, image: "camisapuntos.jpg", images: ["camisapuntos.jpg", "camisapuntos2.jpg", "camisapuntos3.jpg"], color: "Azul", sku: "SKU-010", stockName: "CAMISA OVERSIZED LINO" },
  { id: "blusa-bordada", name: "Blusa cuello bobo bordado", category: "mujer", price: 32990, image: "camisanudoderecha.jpg", images: ["camisanudoderecha.jpg", "camisanudo1.jpg", "camisanudoizquierda.jpg", "praja-nugraha-v9A8fYRhrHA-unsplash.jpg"], color: "Blanco", sku: "SKU-011", stockName: "BLUSA CUELLO BOBO BORDADO", catalogSku: "SKU-015", catalogPrice: 45990 },
  { id: "camisa-negra", name: "Camisa regular fit negra", category: "hombre", price: 49990, image: "camisa1.jpg", images: ["camisa1.jpg", "camisa2.jpg", "camisa4.jpg"], color: "Negro", sku: "SKU-001", stockName: "CAMISA REGULAR FIT" },
  { id: "camisa-oxford", name: "Camisa Oxford regular fit", category: "hombre", price: 52990, image: "CamisaB1.webp", images: ["CamisaB1.webp", "CamisaB2.webp", "CamisaB3.webp", "CamisaC3.webp", "CamisaC4.webp"], color: "Blanco", sku: "SKU-002", stockName: "CAMISA ESTRUCTURADA OXFORD" },
  { id: "chaqueta-abrigo", name: "Abrigo mezcla lana", category: "hombre", price: 119990, image: "AbrigoH1.jpg", images: ["AbrigoH1.jpg", "AbrigoH2.jpg", "AbrigoH3.jpg", "AbrigoH4.jpg"], color: "Gris", sku: "SKU-006", stockName: "ABRIGO MEZCLA LANA" },
  { id: "polera-kids", name: "Polera algodón estampada", category: "ninos", price: 19990, image: "PoleraNino1.webp", images: ["PoleraNino1.webp", "PoleraNino2.webp", "PoleraNino3.webp"], color: "Rojo", sku: "SKU-017", stockName: "POLERA ALGODON ESTAMPADA", catalogSku: "SKU-021" },
  { id: "pantalon-kids", name: "Pantalón felpa relaxed fit", category: "ninos", price: 29990, image: "PantalonNino1.jpg", images: ["PantalonNino1.jpg", "PantalonNIno2.jpg"], color: "Gris", sku: "SKU-018", stockName: "PANTALON FELPA RELAXED FIT", sizeType: "pants", catalogSku: "SKU-022" },
  { id: "chaqueta-kids", name: "Chaqueta denim mini", category: "ninos", price: 39990, image: "ChaquetaNino1.jpg", images: ["ChaquetaNino1.jpg", "ChaquetaNino2.jpg"], color: "Denim", sku: "SKU-019", stockName: "CHAQUETA DENIM MINI", catalogSku: "SKU-023" },
  { id: "collares", name: "Pack de collares luna y estrellas", category: "accesorios", price: 29990, image: "collares.jpg", images: ["collares.jpg", "collares2.jpg"], color: "Oro / plata", stockName: "PACK 2 COLLARES COMBINADOS LUNA ESTRELLAS" },
  { id: "bolso", name: "Maleta deportiva multifunción 35L", category: "accesorios", price: 65990, image: "bolsoverded.jpg", images: ["bolsoverded.jpg"], color: "Verde", stockName: "MALETA DEPORTIVA MULTIFUNCIÓN 35L" },
  { id: "guantes", name: "Guantes efecto piel punto", category: "accesorios", price: 23990, image: "guantespuestos.jpg", images: ["guantespuestos.jpg", "guantes.jpg"], color: "Negro", stockName: "GUANTES EFECTO PIEL PUNTO" },
  { id: "perfume", name: "Brûlante Violette Parfum 100ml", category: "accesorios", price: 45990, image: "perfume.jpg", images: ["perfume.jpg"], color: "Violette", stockName: "BRÛLANTE VIOLETTE PARFUM 100ML" },
  { id: "top-estructurado", name: "Top estructurado blanco", category: "mujer", price: 29990, image: "topbodies.jpg", images: ["topbodies.jpg", "topbodies3.jpg", "topboides2.jpg", "dwayne-joe-_6W3BYh6jGc-unsplash.jpg"], color: "Blanco", sku: "SKU-012", stockName: "TOP ESTRUCTURADO BLANCO", catalogSku: "SKU-016", catalogPrice: 34990 },
  { id: "polera-cotton-graphic", name: "Polera cotton graphic", category: "mujer", price: 25990, image: "Polera1.jpg", sourceImage: "04424819250-p.jpg", missingSourceImages: ["Polera3.jpg"], images: ["Polera1.jpg", "Polera2.jpg", "referenciacamisetablanca.jpg"], color: "Blanco", sku: "SKU-013", stockName: "POLERA COTTON GRAPHIC", catalogSku: "SKU-017" },
  { id: "chaqueta-oversized-women", name: "Chaqueta oversized structural", category: "mujer", price: 89990, image: "04391810800-a1.jpg", images: ["04391810800-a1.jpg", "04391810800-p.jpg", "referenciachaquetanegra.jpg"], color: "Negro", sku: "SKU-014", stockName: "CHAQUETA OVERSIZED STRUCTURAL", catalogSku: "SKU-018" },
  { id: "jeans-high-waist", name: "Jeans high waist straight", category: "mujer", price: 54990, image: "02569210400-p.jpg", images: ["02569210400-p.jpg", "02569210400-a1.jpg", "02569210400-a5.jpg", "referenciapantalon.jpg"], color: "Denim", sku: "SKU-015", stockName: "JEANS HIGH WAIST STRAIGHT", sizeType: "pants", catalogSku: "SKU-019" },
  { id: "mocasines-minimal", name: "Mocasines de cuero minimal", category: "mujer", price: 65990, image: "13595610709-p.jpg", images: ["13595610709-p.jpg", "referenciazapato.jpg"], color: "Negro", sku: "SKU-016", stockName: "MOCASINES DE CUERO MINIMAL", sizeType: "shoes", catalogSku: "SKU-020" },
  { id: "heavy-cotton-men", name: "Polera heavy cotton oversized", category: "hombre", price: 29990, image: "Polera1.webp", images: ["Polera1.webp", "Polera2.webp", "Polera3.webp", "Polera4.webp", "Polera5.webp", "Polera6.webp", "Polera7.webp", "Polera8.webp", "Polera9.webp"], color: "Negro", sku: "SKU-003", stockName: "POLERA HEAVY COTTON OVERSIZED", colorOptions: [{ name: "Blanco", images: ["Polera4.webp", "Polera6.webp"] }, { name: "Burdeo", images: ["Polera7.webp", "Polera9.webp"] }] },
  { id: "chaqueta-cazadora", name: "Chaqueta cazadora Oxford", category: "hombre", price: 52990, image: "Chaqueta2.jpg", images: ["Chaqueta2.jpg", "Chaqueta1.jpg", "Chaqueta3.jpg", "Chaqueta4.jpg"], color: "Negro", sku: "SKU-004", stockName: "CHAQUETA CAZADORA OXFORD" },
  { id: "pantalon-chino", name: "Pantalón chino tapered", category: "hombre", price: 54990, image: "Pantalon1.jpg", images: ["Pantalon1.jpg", "Pantalon2.jpg", "Pantalon3.jpg", "Pantalon5.jpg", "Pantalon6.jpg"], color: "Camel claro", sku: "SKU-005", stockName: "PANTALON CHINO TAPERED", sizeType: "pants" },
  { id: "mocasines-derby", name: "Mocasines de cuero Derby", category: "hombre", price: 75990, image: "ZapatosH1.webp", images: ["ZapatosH1.webp", "ZapatosH2.webp", "ZapatosH3L.webp"], color: "Negro", sku: "SKU-007", stockName: "MOCASINES DE CUERO DERBY", sizeType: "shoes" },
  { id: "zapatillas-kids", name: "Zapatillas urbanas kids", category: "ninos", price: 34990, image: "ZapatillaNino1.jpg", images: ["ZapatillaNino1.jpg", "ZapatillaNino2.jpg", "ZapatillaNino3.jpg"], color: "Negro", sku: "SKU-020", stockName: "ZAPATILLAS URBANAS KIDS", sizeType: "kidsShoes" },
  { id: "vestido-boho", name: "Vestido boho chic borlas", category: "mujer", price: 79990, image: "vestidojaponm.jpg", images: ["vestidojaponm.jpg", "mcpeter-5FdfBNJXo3k-unsplash.jpg"], color: "Estampado", sku: "SKU-008", stockName: "VESTIDO BOHO CHIC BORLAS" },
  { id: "camisa-lino-essential", name: "Camisa lino essential", category: "hombre", price: 42990, image: "CamisaB1.webp", sourceImage: "CamisaHombre1.webp", images: ["CamisaB1.webp"], color: "Blanco", catalogSku: "SKU-009" },
  { id: "polera-basica-heavyweight", name: "Polera básica heavyweight", category: "hombre", price: 29990, image: "Polera1.webp", sourceImage: "PoleraNegra1.jpg", images: ["Polera1.webp"], color: "Negro", catalogSku: "SKU-001" },
  { id: "polera-oversized-graphic", name: "Polera oversized graphic", category: "hombre", price: 32990, image: "Polera2.webp", sourceImage: "PoleraBlanca1.jpg", images: ["Polera2.webp"], color: "Blanco", catalogSku: "SKU-002" },
  { id: "pantalon-cargo-tailored", name: "Pantalón cargo tailored", category: "hombre", price: 59990, image: "Pantalon5.jpg", sourceImage: "CargoHombre1.webp", images: ["Pantalon5.jpg", "Pantalon6.jpg"], color: "Camel", catalogSku: "SKU-003", sizeType: "pants" },
  { id: "pantalon-chino-straight", name: "Pantalón chino straight", category: "hombre", price: 49990, image: "Pantalon1.jpg", sourceImage: "PantalonLino1.webp", images: ["Pantalon1.jpg", "Pantalon2.jpg"], color: "Camel", catalogSku: "SKU-004", sizeType: "pants" },
  { id: "chaqueta-denim-vintage", name: "Chaqueta denim vintage wash", category: "hombre", price: 79990, image: "Chaqueta1.jpg", sourceImage: "ChaquetaHombre1.webp", images: ["Chaqueta1.jpg", "Chaqueta2.jpg"], color: "Denim", catalogSku: "SKU-005" },
  { id: "bomber-jacket", name: "Bomber jacket minimal", category: "hombre", price: 89990, image: "Chaqueta2.jpg", sourceImage: "ChaquetaCuero1.webp", images: ["Chaqueta2.jpg", "Chaqueta3.jpg"], color: "Negro", catalogSku: "SKU-006" },
  { id: "hoodie-heavy-cotton", name: "Polerón hoodie heavy cotton", category: "hombre", price: 45990, image: "AbrigoH1.jpg", sourceImage: "PoleronGris1.webp", images: ["AbrigoH1.jpg", "AbrigoH2.jpg"], color: "Gris", catalogSku: "SKU-007" },
  { id: "crewneck-essential", name: "Polerón crewneck essential", category: "hombre", price: 39990, image: "Polera1.webp", sourceImage: "PoleronNegro1.jpg", images: ["Polera1.webp", "Polera2.webp"], color: "Negro", catalogSku: "SKU-008" },
  { id: "zapatillas-leather-urban", name: "Zapatillas leather urban", category: "hombre", price: 69990, image: "ZapatosH1.webp", sourceImage: "ZapatoHombre1.jpg", images: ["ZapatosH1.webp", "ZapatosH3L.webp"], color: "Negro", catalogSku: "SKU-010", sizeType: "shoes" },
  { id: "botas-leather-chelsea", name: "Botas leather Chelsea", category: "hombre", price: 89990, image: "ZapatosH3L.webp", sourceImage: "BotaHombre1.jpg", images: ["ZapatosH3L.webp", "ZapatosH4.png"], color: "Negro", catalogSku: "SKU-011", sizeType: "shoes" },
  { id: "camisa-lino-essential-mujer", name: "Camisa oversized lino essential", category: "mujer", price: 49990, image: "amin-naderloei-Mg2chTCMzhk-unsplash.jpg", images: ["amin-naderloei-Mg2chTCMzhk-unsplash.jpg", "amin-naderloei-aLHw5V2HTUo-unsplash.jpg", "amin-naderloei-hoczaAFmSf4-unsplash.jpg"], color: "Natural", catalogSku: "SKU-014" },
  { id: "bolso-cuero-minimalist", name: "Bolso de cuero minimalist", category: "accesorios", price: 89990, image: "bolsoverded.jpg", sourceImage: "Bolso1.jpg", images: ["bolsoverded.jpg"], color: "Negro", catalogSku: "SKU-025" },
  { id: "collar-plated-gold", name: "Collar plated gold", category: "accesorios", price: 24990, image: "collares.jpg", sourceImage: "Collar1.jpg", images: ["collares.jpg", "collares2.jpg"], color: "Oro", catalogSku: "SKU-026" },
  { id: "gafas-retro-black", name: "Gafas de sol retro black", category: "accesorios", price: 32990, image: "trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg", sourceImage: "Gafas1.jpg", images: ["trung-nhan-tran-BfSTSfEVWfA-unsplash.jpg"], color: "Negro", catalogSku: "SKU-027" },
  { id: "bucket-hat-cotton", name: "Bucket hat cotton", category: "accesorios", price: 18990, image: "guantes.jpg", sourceImage: "Gorro1.jpg", images: ["guantes.jpg"], color: "Negro", catalogSku: "SKU-028" },
];

export const articles = [
  {
    id: "silueta",
    category: "Moda",
    title: "Adidas presenta un adelanto de su colaboración con Jennie",
    summary: "La colaboración reinterpreta la identidad deportiva con una mirada personal y contemporánea.",
    image: "Noticia1.avif",
    paragraphs: [
      "Jennie asume el papel de codiseñadora con una colección que une la funcionalidad deportiva y una estética inspirada en el ballet.",
      "La propuesta incluye prendas y complementos que reinterpretan siluetas clásicas con una energía actual, cuidando los detalles y las proporciones.",
    ],
  },
  {
    id: "texturas",
    category: "Colección",
    title: "Nueva York abraza el renacimiento de sus marcas emblemáticas",
    summary: "La semana de la moda reúne marcas históricas que vuelven a conectar con nuevas generaciones.",
    image: "Noticia2.avif",
    paragraphs: [
      "La Semana de la Moda de Nueva York vuelve a poner en conversación a las casas de tradición estadounidense y a una nueva generación de diseñadores.",
      "Materiales reconocibles, prendas versátiles y una mirada renovada son parte de las claves que mantienen vigente este legado.",
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

export function getProductSizeStock(product, size) {
  const sku = product.sku ?? product.catalogSku ?? generateSku(product.stockName ?? product.name);
  const key = `sake_stock_${sku}_${encodeURIComponent(size)}`;
  const savedStock = localStorage.getItem(key);
  if (savedStock !== null && Number.isInteger(Number(savedStock))) return Number(savedStock);

  const stockKey = `${sku}-${size}`;
  let hash = 0;
  for (let index = 0; index < stockKey.length; index += 1) {
    hash = (hash * 31 + stockKey.charCodeAt(index)) % 15;
  }
  const initialStock = hash + 1;
  localStorage.setItem(key, String(initialStock));
  return initialStock;
}

export function formatPrice(price) {
  return `${new Intl.NumberFormat("es-CL").format(price)} CLP`;
}

// ================= CATÁLOGO DE PRODUCTOS (SEMILLA) =================
export const productosMock = [
  // TECLADOS
  { id: 1, sku: "KB-RAZ-001", partNumber: "RZ03-0339", marca: "Razer", nombre: "Teclado Mecánico Razer Huntsman Mini, Switches Ópticos, 60%", categoria: "Teclados", precioTransferencia: 114990, precioNormal: 121990, precioDescuento: 149990, stockOnline: 12, stockTienda: 5, imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", descripcion: "Teclado para juegos al 60% con interruptores ópticos Razer de última generación." },
  { id: 2, sku: "KB-LOG-002", partNumber: "920-0093", marca: "Logitech G", nombre: "Teclado Logitech G Pro X TKL, Inalámbrico", categoria: "Teclados", precioTransferencia: 189990, precioNormal: 199990, precioDescuento: 229990, stockOnline: 8, stockTienda: 2, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80", descripcion: "Diseñado con profesionales de eSports. Conectividad inalámbrica LIGHTSPEED." },
  { id: 3, sku: "KB-COR-003", partNumber: "CH-912A", marca: "Corsair", nombre: "Teclado Mecánico Corsair K100 RGB, Cherry MX", categoria: "Teclados", precioTransferencia: 239990, precioNormal: 249990, precioDescuento: 289990, stockOnline: 4, stockTienda: 0, imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80", descripcion: "Chasis de aluminio duradero y retroiluminación RGB dinámica por tecla." },
  { id: 4, sku: "KB-STE-004", partNumber: "64626", marca: "SteelSeries", nombre: "Teclado SteelSeries Apex Pro TKL", categoria: "Teclados", precioTransferencia: 209990, precioNormal: 219990, precioDescuento: 259990, stockOnline: 15, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80", descripcion: "Ajusta la distancia de actuación de cada tecla de forma independiente." },

  // MOUSE
  { id: 5, sku: "MS-LOG-001", partNumber: "910-0055", marca: "Logitech G", nombre: "Mouse Gamer Logitech G502 X Plus, Inalámbrico", categoria: "Mouse", precioTransferencia: 139990, precioNormal: 147990, precioDescuento: 169990, stockOnline: 25, stockTienda: 10, imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", descripcion: "Switches óptico-mecánicos LIGHTFORCE y sensor HERO 25K de alta precisión." },
  { id: 6, sku: "MS-RAZ-002", partNumber: "RZ01-0462", marca: "Razer", nombre: "Mouse Razer DeathAdder V3 Pro, Ultra Ligero", categoria: "Mouse", precioTransferencia: 144990, precioNormal: 152990, precioDescuento: 179990, stockOnline: 5, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80", descripcion: "Ergonomía de leyenda en su formato más ligero y competitivo de 63g." },
  { id: 7, sku: "MS-GLO-003", partNumber: "GLO-MS", marca: "Glorious", nombre: "Mouse Glorious Model O Wireless, Matte", categoria: "Mouse", precioTransferencia: 79990, precioNormal: 84990, precioDescuento: 99990, stockOnline: 14, stockTienda: 6, imagen: "https://images.unsplash.com/photo-1593111774616-a90e39da544d?auto=format&fit=crop&w=600&q=80", descripcion: "Diseño honeycomb ultra liviano con conectividad inalámbrica de 2.4 GHz." },
  { id: 8, sku: "MS-STE-004", partNumber: "62551", marca: "SteelSeries", nombre: "Mouse SteelSeries Aerox 3 Wireless", categoria: "Mouse", precioTransferencia: 92990, precioNormal: 97990, precioDescuento: 115990, stockOnline: 11, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1613141692099-1374409ef665?auto=format&fit=crop&w=600&q=80", descripcion: "Diseño optimizado para movimientos rápidos con certificación IP54." },

  // AUDÍFONOS
  { id: 9, sku: "AU-HYP-001", partNumber: "4P5L9AA", marca: "HyperX", nombre: "Audífonos HyperX Cloud II Wireless", categoria: "Audífonos", precioTransferencia: 129990, precioNormal: 136990, precioDescuento: 159990, stockOnline: 30, stockTienda: 12, imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", descripcion: "Comodidad legendaria con libertad inalámbrica de 2.4 GHz y batería de 30h." },
  { id: 10, sku: "AU-LOG-002", partNumber: "981-0009", marca: "Logitech G", nombre: "Audífonos Logitech G Pro X Wireless", categoria: "Audífonos", precioTransferencia: 199990, precioNormal: 209990, precioDescuento: 239990, stockOnline: 9, stockTienda: 3, imagen: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80", descripcion: "Construidos con acero y aluminio. Tecnología Blue VO!CE para la voz." },
  { id: 11, sku: "AU-RAZ-003", partNumber: "RZ04-0322", marca: "Razer", nombre: "Audífonos Razer BlackShark V2 Pro", categoria: "Audífonos", precioTransferencia: 164990, precioNormal: 172990, precioDescuento: 199990, stockOnline: 15, stockTienda: 6, imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80", descripcion: "Drivers de titanio de 50 mm Triforce y cancelación pasiva de ruido." },
  { id: 12, sku: "AU-STE-004", partNumber: "61520", marca: "SteelSeries", nombre: "Audífonos SteelSeries Arctis Nova Pro", categoria: "Audífonos", precioTransferencia: 329990, precioNormal: 349990, precioDescuento: 389990, stockOnline: 4, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80", descripcion: "Sistema de base estacional con dos baterías intercambiables." },

  // MONITORES
  { id: 13, sku: "MO-MSI-001", partNumber: "9S6-3CF8", marca: "MSI", nombre: "Monitor Gamer OLED MSI MAG 27\" 240Hz", categoria: "Monitores", precioTransferencia: 569990, precioNormal: 595640, precioDescuento: 799990, stockOnline: 2, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80", descripcion: "Panel QD-OLED con negros perfectos, 240Hz y tiempo de respuesta de 0.03ms." },
  { id: 14, sku: "MO-SAM-002", partNumber: "LC32G75T", marca: "Samsung", nombre: "Monitor Samsung Odyssey G7 Curvo 32\"", categoria: "Monitores", precioTransferencia: 499990, precioNormal: 524990, precioDescuento: 629990, stockOnline: 6, stockTienda: 3, imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", descripcion: "Curvatura extrema 1000R que iguala el contorno del ojo humano." },
  { id: 15, sku: "MO-ASU-003", partNumber: "PG279QM", marca: "ASUS ROG", nombre: "Monitor ASUS ROG Swift 27\" QHD 240Hz", categoria: "Monitores", precioTransferencia: 649990, precioNormal: 684990, precioDescuento: 749990, stockOnline: 4, stockTienda: 2, imagen: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80", descripcion: "Módulo NVIDIA G-SYNC integrado con Reflex Latency Analyzer." },
  { id: 16, sku: "MO-ALI-004", partNumber: "AW3423DWF", marca: "Alienware", nombre: "Monitor Alienware 34\" Ultrawide OLED", categoria: "Monitores", precioTransferencia: 899990, precioNormal: 949990, precioDescuento: 1099990, stockOnline: 3, stockTienda: 0, imagen: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80", descripcion: "Experiencia cinematográfica ultrapanorámica de contraste infinito." },

  // SILLAS
  { id: 17, sku: "SI-SEC-001", partNumber: "TITAN-22", marca: "Secretlab", nombre: "Silla Gamer Secretlab TITAN Evo 2022", categoria: "Sillas", precioTransferencia: 549990, precioNormal: 579990, precioDescuento: 629990, stockOnline: 4, stockTienda: 2, imagen: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80", descripcion: "El estándar de oro en asientos gaming con soporte lumbar integrado." },
  { id: 18, sku: "SI-COR-002", partNumber: "CF-9010", marca: "Corsair", nombre: "Silla Gamer Corsair TC200, Piel", categoria: "Sillas", precioTransferencia: 319990, precioNormal: 339990, precioDescuento: 389990, stockOnline: 8, stockTienda: 3, imagen: "https://images.unsplash.com/photo-1580481077494-e3299ac25e94?auto=format&fit=crop&w=600&q=80", descripcion: "Diseño inspirado en carreras con mayor anchura y apoyabrazos 4D." },
  { id: 19, sku: "SI-RAZ-003", partNumber: "RZ38-027", marca: "Razer", nombre: "Silla Gamer Razer Iskur, Soporte Lumbar", categoria: "Sillas", precioTransferencia: 429990, precioNormal: 449990, precioDescuento: 499990, stockOnline: 5, stockTienda: 0, imagen: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", descripcion: "Sistema lumbar totalmente ajustable que se adapta a tu columna." },
  { id: 20, sku: "SI-NOB-004", partNumber: "NBL-HRO", marca: "Noblechairs", nombre: "Silla Noblechairs Hero Series Premium", categoria: "Sillas", precioTransferencia: 489990, precioNormal: 519990, precioDescuento: 569990, stockOnline: 2, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80", descripcion: "Estética elegante y superficie de asiento ampliada para largas horas." },

  // LAPTOPS
  { id: 21, sku: "LP-ASU-001", partNumber: "GA402XZ", marca: "ASUS ROG", nombre: "Laptop ASUS ROG Zephyrus G14, RTX 4080", categoria: "Laptops", precioTransferencia: 2199990, precioNormal: 2299990, precioDescuento: 2599990, stockOnline: 3, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80", descripcion: "Pantalla Nebula HDR, refrigeración de metal líquido y gran potencia." },
  { id: 22, sku: "LP-ALI-002", partNumber: "M16-R1", marca: "Alienware", nombre: "Laptop Alienware m16 R1, RTX 4070", categoria: "Laptops", precioTransferencia: 1849990, precioNormal: 1949990, precioDescuento: 2199990, stockOnline: 5, stockTienda: 2, imagen: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80", descripcion: "Chasis Legend 3.0 con tecnología de enfriamiento Cryo-tech." },
  { id: 23, sku: "LP-LEN-003", partNumber: "82XQ008", marca: "Lenovo Legion", nombre: "Notebook Lenovo Legion Pro 5i, RTX 4060", categoria: "Laptops", precioTransferencia: 1349990, precioNormal: 1429990, precioDescuento: 1699990, stockOnline: 12, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", descripcion: "Pantalla WQXGA a 165Hz con chip IA Lenovo LA1 para optimización." },
  { id: 24, sku: "LP-RAZ-004", partNumber: "RZ09-0485", marca: "Razer", nombre: "Laptop Razer Blade 15, RTX 4060", categoria: "Laptops", precioTransferencia: 1999990, precioNormal: 2099990, precioDescuento: 2399990, stockOnline: 2, stockTienda: 0, imagen: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80", descripcion: "Chasis unibody de aluminio CNC fresado, delgado y potente." },

  // AUDIO
  { id: 25, sku: "AD-EDI-001", partNumber: "R1280T", marca: "Edifier", nombre: "Monitores Activos Edifier R1280T", categoria: "Audio", precioTransferencia: 109990, precioNormal: 115990, precioDescuento: 139990, stockOnline: 8, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80", descripcion: "Sonido de estudio. Cajas de madera que minimizan la resonancia." },
  { id: 26, sku: "AD-LOG-002", partNumber: "980-0013", marca: "Logitech G", nombre: "Parlantes Gamer Logitech G560 RGB", categoria: "Audio", precioTransferencia: 219990, precioNormal: 229990, precioDescuento: 259990, stockOnline: 5, stockTienda: 2, imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80", descripcion: "Potencia de 240W de pico y tecnología LIGHTSYNC interactiva." },
  { id: 27, sku: "AD-CRE-003", partNumber: "51MF1700", marca: "Creative", nombre: "Parlantes Creative Pebble V3, USB-C", categoria: "Audio", precioTransferencia: 44990, precioNormal: 47990, precioDescuento: 54990, stockOnline: 15, stockTienda: 6, imagen: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80", descripcion: "Diseño minimalista inclinado a 45° para dirigir el audio a tus oídos." },
  { id: 28, sku: "AD-RAZ-004", partNumber: "RZ05-0475", marca: "Razer", nombre: "Parlantes Razer Nommo V2 Pro", categoria: "Audio", precioTransferencia: 429990, precioNormal: 449990, precioDescuento: 499990, stockOnline: 2, stockTienda: 1, imagen: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=600&q=80", descripcion: "Sistema 2.1 con proyección trasera Chroma RGB y THX Spatial Audio." },

  // COMPONENTES DE PC
  { id: 29, sku: "CP-NVI-001", partNumber: "ROG-STRIX", marca: "ASUS ROG", nombre: "Tarjeta de Video ASUS ROG RTX 4090", categoria: "Componentes de PC", precioTransferencia: 2199990, precioNormal: 2299990, precioDescuento: 2499990, stockOnline: 1, stockTienda: 0, imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80", descripcion: "El monstruo definitivo del rendimiento con arquitectura Ada Lovelace." },
  { id: 30, sku: "CP-AMD-002", partNumber: "100-1000", marca: "AMD", nombre: "Procesador AMD Ryzen 7 7800X3D", categoria: "Componentes de PC", precioTransferencia: 449990, precioNormal: 469990, precioDescuento: 529990, stockOnline: 15, stockTienda: 6, imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80", descripcion: "El mejor procesador para gaming con tecnología 3D V-Cache." },
  { id: 31, sku: "CP-INT-003", partNumber: "BX80715", marca: "Intel", nombre: "Procesador Intel Core i9-14900K", categoria: "Componentes de PC", precioTransferencia: 599990, precioNormal: 629990, precioDescuento: 689990, stockOnline: 10, stockTienda: 3, imagen: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80", descripcion: "Potencia bruta para creadores y jugadores con arquitectura híbrida." },
  { id: 32, sku: "CP-MSI-004", partNumber: "MPG-B650", marca: "MSI", nombre: "Placa Madre MSI MPG B650 Carbon WIFI", categoria: "Componentes de PC", precioTransferencia: 289990, precioNormal: 309990, precioDescuento: 349990, stockOnline: 8, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", descripcion: "Estética en fibra de carbono, grandes disipadores y Wi-Fi 6E." },

  // HOGAR INTELIGENTE
  { id: 33, sku: "HI-AMA-001", partNumber: "B09B8V1N", marca: "Amazon", nombre: "Amazon Echo Dot (5.ª Gen), Alexa", categoria: "Hogar Inteligente", precioTransferencia: 49990, precioNormal: 52990, precioDescuento: 59990, stockOnline: 40, stockTienda: 25, imagen: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80", descripcion: "El Echo Dot con el mejor sonido. Controla tu hogar con tu voz." },
  { id: 34, sku: "HI-GOO-002", partNumber: "GA01331", marca: "Google", nombre: "Google Nest Hub (2.ª Gen)", categoria: "Hogar Inteligente", precioTransferencia: 89990, precioNormal: 94990, precioDescuento: 109990, stockOnline: 12, stockTienda: 8, imagen: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=600&q=80", descripcion: "El centro de control de tu casa. Ve videos y revisa cámaras." },
  { id: 35, sku: "HI-PHI-003", partNumber: "548487", marca: "Philips Hue", nombre: "Ampolleta Inteligente Philips Hue", categoria: "Hogar Inteligente", precioTransferencia: 54990, precioNormal: 57990, precioDescuento: 64990, stockOnline: 50, stockTienda: 30, imagen: "https://images.unsplash.com/photo-1550985616-11b30d314f17?auto=format&fit=crop&w=600&q=80", descripcion: "Suma color a tu hogar con 16 millones de tonos y sincronización." },
  { id: 36, sku: "HI-TPL-004", partNumber: "TAPO-P10", marca: "TP-Link", nombre: "Enchufe Inteligente TP-Link Tapo", categoria: "Hogar Inteligente", precioTransferencia: 12990, precioNormal: 14990, precioDescuento: 17990, stockOnline: 80, stockTienda: 45, imagen: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80", descripcion: "Control remoto de electrodomésticos con función de programación." },

  // STREAMING
  { id: 37, sku: "ST-HYP-001", partNumber: "HMIQ1S", marca: "HyperX", nombre: "Micrófono HyperX QuadCast S, RGB", categoria: "Streaming", precioTransferencia: 149990, precioNormal: 157990, precioDescuento: 179990, stockOnline: 12, stockTienda: 5, imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80", descripcion: "El micrófono favorito de creadores. Soporte antivibración integrado." },
  { id: 38, sku: "ST-ELG-002", partNumber: "10GBA990", marca: "Elgato", nombre: "Elgato Stream Deck MK.2, 15 Teclas", categoria: "Streaming", precioTransferencia: 144990, precioNormal: 152990, precioDescuento: 169990, stockOnline: 15, stockTienda: 6, imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", descripcion: "Controla tu contenido como profesional con feedback visual." },
  { id: 39, sku: "ST-LOG-003", partNumber: "960-0007", marca: "Logitech", nombre: "Cámara Web Logitech C920 HD Pro", categoria: "Streaming", precioTransferencia: 74990, precioNormal: 79990, precioDescuento: 89990, stockOnline: 28, stockTienda: 14, imagen: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80", descripcion: "El estándar de oro para videollamadas con autoenfoque premium." },
  { id: 40, sku: "ST-ELG-004", partNumber: "10GBF990", marca: "Elgato", nombre: "Capturadora Elgato HD60 X, 4K30", categoria: "Streaming", precioTransferencia: 189990, precioNormal: 199990, precioDescuento: 219990, stockOnline: 8, stockTienda: 3, imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80", descripcion: "Juega y captura sin compromisos con paso de señal nativa." },

  // ACCESORIOS
  { id: 41, sku: "AC-RAZ-001", partNumber: "RZ02-0250", marca: "Razer", nombre: "Mousepad Razer Goliathus Chroma", categoria: "Accesorios", precioTransferencia: 54990, precioNormal: 57990, precioDescuento: 64990, stockOnline: 25, stockTienda: 12, imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", descripcion: "Formato extragrande para cubrir todo tu escritorio con luz." },
  { id: 42, sku: "AC-COR-002", partNumber: "CA-901116", marca: "Corsair", nombre: "Soporte para Audífonos Corsair ST100", categoria: "Accesorios", precioTransferencia: 69990, precioNormal: 74990, precioDescuento: 84990, stockOnline: 9, stockTienda: 4, imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80", descripcion: "Estructura de aluminio que integra tarjeta de sonido envolvente 7.1." },
  { id: 43, sku: "AC-ANK-003", partNumber: "A83460A2", marca: "Anker", nombre: "Hub USB-C Anker 7-en-1, 4K HDMI", categoria: "Accesorios", precioTransferencia: 44990, precioNormal: 47990, precioDescuento: 54990, stockOnline: 45, stockTienda: 20, imagen: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80", descripcion: "La solución de conectividad definitiva para laptops modernas." },
  { id: 44, sku: "AC-ZOW-004", partNumber: "9H.N15GB", marca: "BenQ Zowie", nombre: "Bungee para Mouse Zowie Camade II", categoria: "Accesorios", precioTransferencia: 24990, precioNormal: 26990, precioDescuento: 29990, stockOnline: 18, stockTienda: 7, imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", descripcion: "Siente que usas un mouse inalámbrico sin arrastre de cable." }
];


const DB_KEY = 'tecnorosita_productos';

export const getProductos = () => {
  const localData = localStorage.getItem(DB_KEY);
  if (!localData) {
    localStorage.setItem(DB_KEY, JSON.stringify(productosMock));
    return productosMock;
  }
  return JSON.parse(localData);
};

export const getProductoById = (id) => {
  const productos = getProductos();
  return productos.find(p => p.id === parseInt(id));
};

export const crearProducto = (nuevoProducto) => {
  const productos = getProductos();
  const productoConId = { ...nuevoProducto, id: Date.now() };
  productos.push(productoConId);
  localStorage.setItem(DB_KEY, JSON.stringify(productos));
  return productoConId;
};

export const actualizarProducto = (id, dataActualizada) => {
  let productos = getProductos();
  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    productos[index] = { ...productos[index], ...dataActualizada };
    localStorage.setItem(DB_KEY, JSON.stringify(productos));
    return true;
  }
  return false;
};

export const eliminarProducto = (id) => {
  let productos = getProductos();
  productos = productos.filter(p => p.id !== parseInt(id));
  localStorage.setItem(DB_KEY, JSON.stringify(productos));
  return true;
};
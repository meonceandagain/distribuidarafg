import { getStore } from "@netlify/blobs";
export default async function handler(req, context) {
  const headers = { "Content-Type":"application/json","Access-Control-Allow-Origin":"*" };
  try {
    const store = getStore({ name:"fg-dist", consistency:"strong" });
    const config = await store.get("config",{type:"json"}).catch(()=>null);
    return new Response(JSON.stringify(config ?? DEFAULT), {status:200, headers});
  } catch(e) {
    return new Response(JSON.stringify(DEFAULT), {status:200, headers});
  }
}
export const config = { path:"/api/get-data" };

const DEFAULT = {
  hero: {
    titulo1: "FG",
    titulo2: "Distribuidora",
    subtitulo: "Venta mayorista de electrónica y papelería comercial",
    foto_electronica: null,
    foto_papeleria: null
  },
  footer: {
    linea1: "FG Distribuidora · Electrónica y Papelería Mayorista",
    linea2: "Consultas y pedidos por WhatsApp · Envíos a todo el país"
  },
  grupos: [
    { id:"electronica", nombre:"Electrónica",          emoji:"⚡", color:"#2563EB" },
    { id:"papeleria",   nombre:"Papelería Comercial",   emoji:"📦", color:"#7C3AED" }
  ],
  categorias: [
    { id:"cables",     nombre:"Cables",                  emoji:"🔌", color:"#2563EB", grupo:"electronica", activa:true },
    { id:"audio",      nombre:"Auriculares y Parlantes",  emoji:"🎧", color:"#0891B2", grupo:"electronica", activa:true },
    { id:"cargadores", nombre:"Cargadores y Powerbanks",  emoji:"🔋", color:"#0D9488", grupo:"electronica", activa:true },
    { id:"bolsas",     nombre:"Bolsas",                   emoji:"🛍️", color:"#7C3AED", grupo:"papeleria",   activa:true },
    { id:"envases",    nombre:"Envases para Comidas",     emoji:"🥡", color:"#D4006E", grupo:"papeleria",   activa:true },
    { id:"papel",      nombre:"Papel y Cartón",           emoji:"📄", color:"#C47A20", grupo:"papeleria",   activa:true }
  ],
  productos: [
    // ── CABLES ──────────────────────────────────────────────
    { id:"p01", nombre:"Cable USB-C a USB-A 1m",      categoria:"cables",    descripcion:"Carga rápida 3A, nylon trenzado, compatible con todos los dispositivos USB-C",         precio:850,  unidad:"por unidad",     img:null, activo:true },
    { id:"p02", nombre:"Cable USB-C a USB-C 2m",      categoria:"cables",    descripcion:"Carga rápida 65W PD, nylon trenzado reforzado, ideal laptops y celulares",              precio:1400, unidad:"por unidad",     img:null, activo:true },
    { id:"p03", nombre:"Cable Micro USB 1m",           categoria:"cables",    descripcion:"Carga estándar 2A, compatible Android, accesorio universal de distribución",           precio:650,  unidad:"por unidad",     img:null, activo:true },
    { id:"p04", nombre:"Cable HDMI 2m 4K",             categoria:"cables",    descripcion:"Alta definición 4K@60Hz, conectores dorados, compatible TV, monitor, consola",        precio:2100, unidad:"por unidad",     img:null, activo:true },
    // ── AUDIO ───────────────────────────────────────────────
    { id:"p05", nombre:"Auriculares in-ear con cable", categoria:"audio",     descripcion:"Control de volumen integrado, micrófono, jack 3.5mm, compatible universal",           precio:2200, unidad:"por unidad",     img:null, activo:true },
    { id:"p06", nombre:"Auriculares Bluetooth TWS",    categoria:"audio",     descripcion:"Autonomía 6hs + 18hs estuche, Bluetooth 5.3, resistente al sudor IPX5",              precio:5800, unidad:"por unidad",     img:null, activo:true },
    { id:"p07", nombre:"Parlante Bluetooth portátil",  categoria:"audio",     descripcion:"10W RMS, batería 1200mAh, resistente al agua IPX6, radio FM incluida",              precio:7500, unidad:"por unidad",     img:null, activo:true },
    // ── CARGADORES ──────────────────────────────────────────
    { id:"p08", nombre:"Cargador USB-A 12W",           categoria:"cargadores",descripcion:"1 puerto USB-A, entrada 110-220V, carga rápida 2.4A, garantía 6 meses",            precio:1500, unidad:"por unidad",     img:null, activo:true },
    { id:"p09", nombre:"Cargador USB-C 20W PD",        categoria:"cargadores",descripcion:"Carga rápida Power Delivery, compatible iPhone 12+ y Android, cabezal compacto",   precio:2900, unidad:"por unidad",     img:null, activo:true },
    { id:"p10", nombre:"Powerbank 10000mAh",           categoria:"cargadores",descripcion:"Entrada USB-C, 2 salidas USB-A 2.4A, indicador LED batería, bolso incluido",        precio:6200, unidad:"por unidad",     img:null, activo:true },
    { id:"p11", nombre:"Cargador de auto doble USB",   categoria:"cargadores",descripcion:"12V/24V, 2 × 2.4A, indicador LED azul, apto camión y auto",                        precio:1800, unidad:"por unidad",     img:null, activo:true },
    // ── BOLSAS ──────────────────────────────────────────────
    { id:"p12", nombre:"Bolsas camiseta blancas 40×60", categoria:"bolsas",   descripcion:"Material PEAD, apto alimentos, resistente, ideal comercios y supermercados",        precio:14000,unidad:"paquete x100",  img:null, activo:true },
    { id:"p13", nombre:"Bolsas camiseta negras 45×65",  categoria:"bolsas",   descripcion:"Reforzadas, uso intensivo, impresión negra, ideal farmacias y ropa",                precio:18500,unidad:"paquete x100",  img:null, activo:true },
    { id:"p14", nombre:"Bolsas de arranque 30×45cm",    categoria:"bolsas",   descripcion:"Con manija reforzada, cierre superior, apto alimentos, ideal panadería y deli",    precio:12000,unidad:"paquete x50",   img:null, activo:true },
    { id:"p15", nombre:"Bolsas con cierre zip 20×28cm", categoria:"bolsas",   descripcion:"Transparentes, cierre hermético, aptas alimentos, múltiples usos",                 precio:8500, unidad:"paquete x100",  img:null, activo:true },
    // ── ENVASES ─────────────────────────────────────────────
    { id:"p16", nombre:"Caja comida 24×16cm",           categoria:"envases",  descripcion:"Cartón microcorrugado simple faz, apto contacto alimentos, tapa a presión",        precio:9500, unidad:"caja x50",      img:null, activo:true },
    { id:"p17", nombre:"Bandeja aluminio N°4",           categoria:"envases",  descripcion:"Rectangular, apto horno y freezer, con tapa, ideal delivery y catering",           precio:8800, unidad:"bolsa x100",    img:null, activo:true },
    { id:"p18", nombre:"Vaso térmico 12oz con tapa",    categoria:"envases",  descripcion:"Doble pared cartón, tapa plana, apto microondas, logo personalizable",             precio:11000,unidad:"caja x50",      img:null, activo:true },
    { id:"p19", nombre:"Envase bisagra 16×16cm",        categoria:"envases",  descripcion:"Tapa abatible cristal, apto comida fría, ideal hamburguesería y ensaladas",        precio:7500, unidad:"bolsa x50",     img:null, activo:true },
    // ── PAPEL ───────────────────────────────────────────────
    { id:"p20", nombre:"Resma papel A4 75gr",            categoria:"papel",    descripcion:"500 hojas, 75gr, blancura 96%, compatible con todas las impresoras láser e inkjet", precio:5800, unidad:"por resma",     img:null, activo:true },
    { id:"p21", nombre:"Papel kraft marrón 90cm",        categoria:"papel",    descripcion:"Para embalaje, 90cm de ancho, 70gr/m², superficie lisa, rollo de 100 metros",      precio:8500, unidad:"por rollo",     img:null, activo:true },
    { id:"p22", nombre:"Rollo papel térmico 80×80mm",   categoria:"papel",    descripcion:"Para terminales de pago y cajas registradoras, alta sensibilidad, libre de BPA",   precio:12000,unidad:"caja x50",     img:null, activo:true }
  ]
};

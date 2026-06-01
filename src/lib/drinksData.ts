/**
 * Drinks menu, lifted from dranken-kaart-oostkade-def1.pdf.
 *
 * Each drink has an optional region/origin and tasting notes — these mirror
 * the printed menu (cellar name, grape, country/region, and aromas).
 */

export type Drink = {
  name: string;
  origin?: string;
  /** Composition / longer description (e.g. cocktail ingredients). */
  desc?: string;
  notes?: string;
  price: string;
};

export type DrinkSection = {
  title: string;
  /** Optional intro line under the section title. */
  subtitle?: string;
  items: Drink[];
};

export const DRINKS: DrinkSection[] = [
  {
    title: 'Witte wijn',
    subtitle: 'Per glas | per fles',
    items: [
      { name: 'Torre de Vejezate Verdejo', origin: 'Verdejo · Spanje, La Mancha', notes: 'Meloen | citrus | bloemen', price: '5.5 | 27.5' },
      { name: 'Latitude 43 Chardonnay-Vermentino', origin: 'Chardonnay & Vermentino · Frankrijk, Bergerac', notes: 'Tropisch fruit | citrus | pompelmoes', price: '6.5 | 32.5' },
      { name: 'Bodegas Naia K-Naia Blanc', origin: 'Verdejo & Sauvignon · Spanje, Rueda', notes: 'Grapefruit | venkel | gras', price: '6.5 | 32.5' },
      { name: 'Willy Bauer Cellar 99 Grüner Veltliner', origin: 'Grüner Veltliner · Oostenrijk, Weinviertel', notes: 'Citrus | appel | witte peper', price: '7.2 | 35' },
      { name: 'Bolla Pinot Grigio delle Venezie', origin: 'Pinot Grigio · Italië, Veneto', notes: 'Peer | meloen | fris', price: '7.5 | 37.5' },
      { name: 'Cloud Break Chardonnay', origin: 'Chardonnay · USA, Californië', notes: 'Soepel | tropisch fruit | karamel', price: '8.5 | 42.5' },
      { name: 'Bodegas Naia Verdejo', origin: 'Verdejo · Spanje, Rueda', notes: 'Limoen | kiwi | gras', price: '37.5' },
      { name: 'Rapaura Springs Sauvignon Blanc', origin: 'Sauvignon Blanc · Nieuw Zeeland, Marlborough', notes: 'Citrus | groene appel | passievrucht', price: '39.5' },
      { name: 'Monzinger Riesling Trocken', origin: 'Riesling · Duitsland, Nahe', notes: 'Peer | limoen | citroengras | nectarine', price: '43.5' },
      { name: 'St. Michael Eppan Schulthaus Pinot Bianco', origin: 'Pinot Bianco · Italië, Alto Adige', notes: 'Fris | verfijnd | appel | peer', price: '46.5' },
      { name: 'Domaine Vrignaud Chablis', origin: 'Chablis · Frankrijk, Bourgogne', notes: 'Geel steenfruit | rond | mineralig', price: '52.5' },
      { name: 'Fiou Pouilly-Fumé', origin: 'Pouilly-Fumé · Frankrijk, Loire', notes: 'Krachtig | finesse | bloemig', price: '54.5' },
      { name: 'Rapitalà Chardonnay', origin: 'Chardonnay · Italië, Sicilië', notes: 'Perzik | abrikoos | vanille | boter | exotisch fruit', price: '57.5' },
      { name: 'Nino Negri Cabrione Retiche di Sondrio', origin: 'Italië, Lombardije', notes: 'Exotisch fruit | vanille | brioche', price: '65.25' },
      { name: 'Borgogno Derthona DOC Timorasso', origin: 'Timorasso · Italië, Piemonte', notes: 'Appel | peer | honing', price: '85.5' },
      { name: 'Longridge "Ou Steen" Chenin Blanc', origin: 'Chenin Blanc · Zuid-Afrika, Stellenbosch', notes: 'Fris | sinaasappel | grapefruit', price: '99' },
      { name: 'Égis de Vallière Meursault', origin: 'Chardonnay · Frankrijk, Bourgogne', notes: 'Rijk | gedroogd fruit | amandelen', price: '155' },
    ],
  },
  {
    title: 'Rode wijn',
    subtitle: 'Per glas | per fles',
    items: [
      { name: 'Latitude 43 Grenache-Syrah-Merlot', origin: 'Frankrijk, Languedoc', notes: 'Elegant | fruitig rood', price: '5.5 | 27.5' },
      { name: 'Bodegas Borsao Seleccion Tinto', origin: 'Garnacha · Spanje, Campo de Borja', notes: 'Donkerrood fruit | mokka | kruiden', price: '6.5 | 30' },
      { name: 'Feudo Monaci Primitivo', origin: 'Primitivo · Italië, Puglia', notes: 'Fluweelzacht | bessen | kersen', price: '7 | 35' },
      { name: 'Haras de Pirque Reserva de Propiedad', origin: 'Cabernet, Carmenère, Syrah · Chili, Maipo Andes', notes: 'Gebalanceerd | rood fruit | groene kruiden', price: '7.5 | 37.5' },
      { name: 'Melini San Lorenzo Chianti Superiore DOCG', origin: 'Sangiovese · Italië, Chianti', notes: 'Gedroogd fruit | bramen | kersen | cacao', price: '39.5' },
      { name: 'Don Jacobo Reserva', origin: 'Tempranillo & Garnacha · Spanje, Rioja', notes: 'Donker fruit | specerijen | eiken', price: '48.5' },
      { name: 'Santi Solane Ripasso Valpolicella Classico Superiore', origin: 'Corvina & Rondinella · Italië, Veneto', notes: 'Warm | vol | kersenjam | vanille', price: '49.25' },
      { name: 'Le Haut Médoc de Giscours', origin: 'Cabernet Sauvignon & Merlot · Frankrijk, Bordeaux', notes: 'Vanille | kersen | cassis', price: '62.5' },
      { name: 'Dominio de Atauta Ribera del Duero', origin: 'Tempranillo · Spanje, Ribera del Duero', notes: 'Bramen | bessen | specerijen', price: '73' },
      { name: 'Borgogno No Name "Barolo"', origin: 'Italië, Piemonte', notes: 'Gedroogd fruit | vanille | specerijen', price: '75.5' },
      { name: 'Bolla Amarone della Valpolicella DOCG Le Poiane', origin: 'Italië, Veneto', notes: 'Kersen | jam | vanille', price: '80' },
      { name: 'Haute Cabrière Collection Pinot Noir (Ltd. Edition)', origin: 'Zuid-Afrika, Franschhoek', notes: 'Vol donker | rijp fruit | kruiden | chocolade', price: '85' },
      { name: 'Il Pino di Biserno', origin: 'Italië, Toscane', notes: 'Bramen | kersen | kruiden', price: '120' },
    ],
  },
  {
    title: 'Rosé wijn',
    items: [
      { name: 'Latitude 43', origin: 'Cinsault, Grenache, Syrah · Frankrijk, Languedoc', notes: 'Aardbei | frambozen | fris', price: '6.5 | 32.5' },
      { name: "L'Oustalet Luberon Rosé", origin: 'Frankrijk, Rhône', notes: 'Mineralig | bramen | verse granaatappel', price: '7.5 | 37.5' },
      { name: 'Château Miraval Provence', origin: 'Frankrijk, Provence', notes: 'Aardbei | frambozen | bloemen', price: '9.5 | 49.5' },
    ],
  },
  {
    title: 'Champagne',
    items: [
      { name: 'Moët & Chandon Brut Rosé Impérial Mini', price: '36.5' },
      { name: 'Moët & Chandon Ice', price: '90' },
      { name: 'Moët & Chandon Ice Rosé', price: '95' },
      { name: 'Ruinart Brut', price: '90' },
      { name: 'Ruinart Rosé', price: '120' },
      { name: 'Ruinart Blanc de Blancs', price: '130' },
      { name: 'Dom Pérignon Blanc Vintage', price: '350' },
      { name: 'Dom Pérignon Rosé Vintage', price: '550' },
    ],
  },
  {
    title: 'Mousserend',
    items: [
      { name: 'Cava Clos Foreses Reserva Brut', origin: 'Xarello & Parellada · Spanje, Penedès', notes: 'Delicaat | toast | fris', price: '7.5 | 37.5' },
      { name: "Ca' del Bosco Cuvée Prestige Edizione 46", origin: 'Italië, Franciacorta', notes: 'Zuiver | elegant | volfruitig', price: '54.5' },
      { name: 'Vinada Amazing Piccolo Airén Gold Mini (0%)', notes: 'Fris | wit fruit | alcoholvrij', price: '11' },
      { name: 'Vinada Amazing Piccolo Airén Rosé Mini (0%)', notes: 'Fris | rood fruit | alcoholvrij', price: '11' },
    ],
  },
  {
    title: 'Cocktails',
    items: [
      { name: 'Bring Me to Oostkade', desc: 'Vodka | pandan likeur | vanille | aloe vera | Balinese thee | passievrucht', notes: '', origin: '', price: '12' },
      { name: 'Pornstar Martini', desc: 'Vanille vodka | eiwit | passoa | limoensap | passievrucht', price: '12' },
      { name: 'Espresso Martini', desc: 'Shot espresso | kahlua | vanille | vodka', price: '11.5' },
      { name: 'Baileys Tiramisu', desc: 'Espresso | amaretto | cacao | eiwit | slagroom', price: '12' },
      { name: 'Mojito', desc: 'Bacardi | limoen | mint | suikerwater | bruiswater', price: '11' },
      { name: 'Negroni', desc: 'Gin | Campari | Vermouth | sinaasappel', price: '10.5' },
    ],
  },
  {
    title: 'Spritzen',
    items: [
      { name: 'Aperol Spritz', desc: 'Sinaasappel | cava | bruiswater', price: '10.5' },
      { name: 'Limoncello Spritz', desc: 'Huisgemaakte Oostkade limoncello | cava | bruiswater', price: '10.5' },
      { name: 'Floral Spritz', desc: 'Vlierbloesem | rozen | cava | bruiswater', price: '10.5' },
    ],
  },
  {
    title: 'Gin tonics',
    items: [
      { name: 'Oostkade Pink Gin', desc: 'Fever-Tree rose | framboos | bosbes | aardbei', price: '11.5' },
      { name: 'Juniper Bird', desc: 'Fever-Tree mediterranean | basilicum | tijm', price: '11.5' },
      { name: 'Floral Angelica Gin', desc: 'Fever-Tree indian tonic | grapefruit', price: '11' },
      { name: 'Nolet Silver', desc: 'Fever-Tree elderflower | vlierbloesem | framboos', price: '12.5' },
    ],
  },
  {
    title: 'Mocktails 0.0',
    items: [
      { name: 'Nojito', desc: 'Mint | limoensap | suikerwater | bruiswater', price: '8' },
      { name: 'Kade Tiki', desc: 'Limoensap | cranberry | verse ananas | orgeat | ginger beer', price: '8.5' },
      { name: 'Pornstar 0.0', desc: 'Vanille | eiwit | limoensap | passievrucht', price: '8.5' },
      { name: 'Virgin Gin', desc: '0.0 gin | Fentimans rose lemonade | framboos | blauwe bes', price: '9.5' },
    ],
  },
  {
    title: 'Whiskey',
    items: [
      { name: 'Clonakilty Port Cask', notes: 'Abrikoos | perzik | vanille', price: '8.5' },
      { name: 'Ncean Organic Single Malt', notes: 'Rood fruit | rozijn | chocolade', price: '10.5' },
      { name: 'Berry Bros & Rudd', notes: 'Rook | spek | citrus', price: '10.9' },
      { name: 'Sakurao Single Malt', notes: 'Sinaasappel | vanille | toffee', price: '13.5' },
      { name: 'Daftmill 2011 Winter Release', notes: 'Appel | peer | citroen | toffee', price: '25' },
    ],
  },
  {
    title: 'Bier',
    items: [
      { name: 'Heineken (tap)', desc: '0.25L', price: '3.5' },
      { name: 'Heineken (tap)', desc: '0.5L', price: '6.5' },
      { name: 'Affligem Blond', price: '5.5' },
      { name: 'Seizoensbier', price: '6' },
      { name: 'Desperados', price: '5.5' },
      { name: 'Amstel Radler', price: '4' },
      { name: 'Liefmans Fruitesse', price: '5' },
      { name: 'Texels Skuumkoppe', price: '5.8' },
      { name: 'Affligem Dubbel', price: '6' },
      { name: 'Affligem Triple', price: '6' },
      { name: 'Lagunitas IPA', price: '6.5' },
      { name: 'Heineken 0.0%', price: '3.5' },
      { name: 'Affligem Blond 0.0%', price: '5' },
      { name: 'Amstel Radler 0.0%', price: '4' },
      { name: 'Desperados 0.0%', price: '5' },
    ],
  },
  {
    title: 'Soft drinks',
    items: [
      { name: 'Chaudfontaine blauw / rood', price: '3.5' },
      { name: 'Coca Cola / Coca Cola Zero', price: '3.5' },
      { name: 'Fanta / Cassis / Sprite', price: '3.5' },
      { name: 'Lipton Ice Tea / Green Tea', price: '3.5' },
      { name: 'Bitter Lemon / Tonic', price: '3.5' },
      { name: "Appelsap / Chocomel / Fristi", price: '3.5' },
      { name: 'Fentimans Rose Lemonade', price: '5' },
      { name: 'Fever-Tree Ginger Ale', price: '5' },
      { name: 'Fever-Tree Ginger Beer', price: '5' },
      { name: 'Verse jus d’orange', price: '5.7' },
      { name: 'Bruiswater 0.75 / Plat water 0.75', desc: 'Hiermee steunt u VDT Project in Kenia', price: '5.7' },
    ],
  },
  {
    title: 'Hot drinks',
    items: [
      { name: 'Koffie', price: '3.4' },
      { name: 'Thee', price: '3.1' },
    ],
  },
];

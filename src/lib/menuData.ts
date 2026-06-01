/**
 * Real menu data extracted from Oostkade's official PDFs (diner-kaart and
 * lunch-kaart). Edit prices and dishes here when the kitchen updates the menu.
 *
 * Price is a plain string so we can support formats like "12.5 | 22" (two
 * portion sizes) or "200/350GR. 27/39".
 */

export type Dish = {
  name: string;
  desc?: string;
  price: string;
};

export type MenuSection = {
  /** Gold script section title (PDF style). */
  title: string;
  items: Dish[];
  /** When present, renders as a centered callout card instead of a regular section. */
  callout?: {
    title: string;
    body: string;
  };
};

// ------------------------------------------------------------ Dinner -------

export const DINNER: MenuSection[] = [
  {
    title: 'Kick Off',
    items: [
      { name: 'Pata Negra', desc: '50 gram | 100 gram', price: '12.5 | 22' },
      { name: 'Goat Cheese Spring Roll', desc: 'Geitenkaas loempia’s | chili mayonaise', price: '7' },
      { name: 'Gamba Bread', desc: 'Gamba brood | five spices dip', price: '7.5' },
      { name: 'Rustic Bread', desc: 'Rustiek brood | tomatenboter | aioli', price: '6.5' },
      { name: 'Pinsa Chicken Pesto', desc: 'Luchtige pizza | kip | pesto | tomaat | rucola', price: '10' },
      { name: 'Sicilian Olives', desc: 'Siciliaanse groene olijven', price: '4.5' },
    ],
  },
  {
    title: 'Oysters',
    items: [
      { name: 'Natural 2st', desc: 'Oesters naturel | vinaigrette | sjalot | citroen', price: '8' },
      { name: 'Thai Style 2st', desc: 'Oesters Thaise stijl | basilicum | mango', price: '9' },
      { name: 'Sriracha 2st', desc: 'Oesters sriracha schuim', price: '9' },
      { name: 'Pornstar Martini 2st', desc: 'Oesters pornstar martini | passievrucht vinaigrette | rode peper | zeewier kaviaar', price: '9' },
    ],
  },
  {
    title: 'Sushi',
    items: [
      { name: 'Beef Truffle Roll', desc: 'Sushi ossenhaas | komkommer | groene asperge | unagisaus | truffel | rucola', price: '17' },
      { name: 'Tuna Roll', desc: 'Sushi tonijn | sesam | mango | bieslook', price: '17' },
      { name: 'Gamba Roll', desc: 'Sushi gamba | sesam | unagi | tempura | rode peper', price: '18' },
    ],
  },
  {
    title: 'Starters',
    items: [
      { name: 'Salmon Tartare', desc: 'Zalm tartaar | furikake | sesam | rijst kroepoek', price: '15.5' },
      { name: 'Black Angus Carpaccio', desc: 'Carpaccio | krokante filo | ricotta crème | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '16' },
      { name: 'Steam Buns Chicken Caesar', desc: 'Bao bun kip | caesar | little gem | parmezaan', price: '14.5' },
      { name: 'Vitello Tonnato', desc: 'Dungesneden kalfsvlees | tonijn mayonaise | kappertjes | tomaat', price: '15.25' },
      { name: 'Marinated Tomato', desc: 'Gemarineerde tomaat | parmezaan | basilicum | krokante aardappel', price: '13' },
      { name: 'Steak Tartare', desc: 'Steak tartaar | bladerdeeg | zoetzure groenten | basilicum mayonaise', price: '16.5' },
      { name: 'Coconut Lime Soup', desc: 'Kokos limoensoep | lente-ui | rode peper', price: '7.9' },
      { name: 'Baked Eggplant', desc: 'Gepofte aubergine | miso | krokante sjalot | knoflook', price: '14' },
      { name: 'Tuna Tartare', desc: 'Tonijn tartaar | mango | kruidenolie | rode peper', price: '17' },
    ],
  },
  {
    title: "Chef's Menu",
    items: [],
    callout: {
      title: '4- of 5-gangen surprise menu van de chef',
      body: '€53,50 | €59,50 — laat je verrassen door de chef.',
    },
  },
  {
    title: 'Mains',
    items: [
      { name: 'Rigatoni Oxtail Stew', desc: 'Rigatoni pasta | ossenstaart stoof | parmezaan | citroen', price: '20' },
      { name: 'Satay Special', desc: 'Kippendijen saté | atjar | pindasaus | zoetzure komkommer', price: '20.5' },
      { name: 'Pumpkin Risotto', desc: 'Pompoen risotto | spinazie | geitenkaas | pompoenpitten', price: '20' },
      { name: 'Mini Hamburgers', desc: 'Twee kleine hamburgers | brioche | Gruyère | rucola | truffel | spek', price: '17.25' },
      { name: 'Corn Chicken', desc: 'Maiskip | polenta crème | zwarte knoflookjus | gegrilde paprika', price: '22.5' },
      { name: 'Lobster Thermidor', desc: 'Kreeft thermidor | seizoensgroenten', price: '36' },
      { name: 'Baked Salmon', desc: 'Zalm met kruidenkorst | groene asperges | citroen | dille', price: '22.5' },
      { name: 'Codfish', desc: 'Kabeljauw | paarse bloemkool | bagna cauda saus | hazelnoot', price: '23' },
      { name: 'Beef Rump Steak', desc: 'Lendebiefstuk | seizoensgroenten | pepersaus — 200/350 gr.', price: '27 | 39' },
      { name: 'Flank Steak', desc: 'Bavette | chimichurri | gepofte tomaat | gegrilde groenten', price: '26' },
      { name: 'Mushroom Ravioli', desc: 'Paddenstoelen ravioli | ricotta | pecorino | basilicum', price: '18.25' },
    ],
  },
  {
    title: 'On the Side',
    items: [
      { name: 'Fries', desc: 'Verse friet | mayonaise', price: '5.5' },
      { name: 'Mini Caesar Salad', desc: 'Spek | little gem | croutons', price: '7.5' },
      { name: 'Fries Andalouse', desc: 'Verse friet | andalousesaus | mayonaise | krokante ui | lente-ui | rode peper', price: '7' },
      { name: 'Grilled Asparagus', desc: 'Gegrilde groene asperges | parmezaan', price: '8.5' },
      { name: 'Indonesian Style Fries', desc: 'Verse friet | Indonesische verse pindasaus | mayonaise | lente-ui | rempejek', price: '8' },
    ],
  },
];

// ------------------------------------------------------------- Lunch -------

export const LUNCH: MenuSection[] = [
  {
    title: 'Kick Off',
    items: [
      { name: 'Pata Negra', desc: '50 gram | 100 gram', price: '12.5 | 22' },
      { name: 'Goat Cheese Spring Roll', desc: 'Geitenkaas loempia’s | chili mayonaise', price: '7' },
      { name: 'Gamba Bread', desc: 'Gamba brood | five spices dip', price: '7.5' },
      { name: 'Rustic Bread', desc: 'Rustiek brood | tomatenolie | aioli', price: '6.5' },
      { name: 'Pinsa Chicken Pesto', desc: 'Luchtige pizza | kip | pesto | tomaat | rucola', price: '10' },
      { name: 'Sicilian Olives', desc: 'Siciliaanse groene olijven', price: '4.5' },
    ],
  },
  {
    title: 'Oysters',
    items: [
      { name: 'Natural 2st', desc: 'Oesters naturel | vinaigrette | sjalot | citroen', price: '8' },
      { name: 'Thai Style 2st', desc: 'Oesters Thaise stijl | basilicum | mango', price: '9' },
      { name: 'Sriracha 2st', desc: 'Oesters sriracha schuim', price: '9' },
      { name: 'Pornstar Martini 2st', desc: 'Oesters pornstar martini | passievrucht vinaigrette | rode peper | zeewier kaviaar', price: '9' },
    ],
  },
  {
    title: 'Sushi',
    items: [
      { name: 'Beef Truffle Roll', desc: 'Sushi ossenhaas | komkommer | groene asperge | unagisaus | truffel | rucola', price: '17' },
      { name: 'Tuna Roll', desc: 'Sushi tonijn | sesam | mango | bieslook', price: '17' },
      { name: 'Gamba Roll', desc: 'Sushi gamba | sesam | unagi | tempura | rode peper', price: '18' },
    ],
  },
  {
    title: 'Business Lunch',
    items: [],
    callout: {
      title: 'Business lunch menu',
      body: '2 gangen €29 · 3 gangen €38 · 4 gangen €49 — wijnarrangement vanaf €14.',
    },
  },
  {
    title: 'Flatbreads',
    items: [
      { name: 'Chicken Pesto', desc: 'Flatbread | kippendijen | pesto | tomaat | parmezaan', price: '12.5' },
      { name: 'Tuna Salad', desc: 'Flatbread | tonijnsalade | bieslook | tomaat | mesclun', price: '14' },
      { name: 'Spicy Chicken', desc: 'Flatbread | pittige kip | chili | komkommer', price: '12.5' },
      { name: 'Mackerel Americain', desc: 'Flatbread | gerookte makreel americain | sriracha | rode ui | bieslook', price: '13.5' },
      { name: 'Vitello Tonnato', desc: 'Flatbread | dungesneden kalfsrosbief | tonijnmayonaise | kappertjes', price: '13.5' },
    ],
  },
  {
    title: 'Rustic Bread',
    items: [
      { name: 'Croquettes', desc: 'Rustiek brood | keuze uit kaas-, garnaal- of kalfskroketten', price: '11.5 | 15.5 | 12.5' },
      { name: 'Satay Special', desc: 'Rustiek brood | kippendijen saté | pindasaus | zoetzure komkommer | kroepoek', price: '14.5' },
      { name: 'Goat Cheese', desc: 'Rustiek brood | geitenkaas | honing | hazelnoot | pompoenpitten | rucola | balsamico', price: '14.5' },
      { name: 'Uitsmijter, your choice', desc: 'Rustiek brood | drie gebakken eieren | kaas | keuze uit spek of ham', price: '12.5' },
      { name: 'Tosti Pata Negra Truffel', desc: 'Rustiek brood | pata negra | truffel | jonge kaas', price: '12' },
      { name: 'Tosti Goat Cheese', desc: 'Rustiek brood | geitenkaas | tomaat | hazelnoot', price: '11.5' },
      { name: 'Tosti Ham Kaas', desc: 'Rustiek brood | ham | jonge kaas', price: '7.5' },
    ],
  },
  {
    title: 'Salads',
    items: [
      { name: 'Caesar (vega of gamba +4.5)', desc: 'Little gem | kippendijen | ei | croutons | parmezaan', price: '15.25' },
      { name: 'Tuna Salad', desc: 'Gegaarde tonijn | rode ui | tomaat | kappertjes | komkommer', price: '15.5' },
      { name: 'Carpaccio', desc: 'Mesclun | little gem | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '15' },
      { name: 'Goat Cheese', desc: 'Geitenkaas | mesclun | rucola | honing | hazelnoot | pompoenpitten | balsamico', price: '14' },
    ],
  },
  {
    title: 'Starters',
    items: [
      { name: 'Salmon Tartare', desc: 'Zalm tartaar | furikake | sesam | rijst kroepoek', price: '15.5' },
      { name: 'Black Angus Carpaccio', desc: 'Carpaccio | krokante filo | ricotta crème | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '16' },
      { name: 'Steam Buns Chicken Caesar', desc: 'Bao bun kip | caesar | little gem | parmezaan', price: '14.5' },
      { name: 'Vitello Tonnato', desc: 'Dungesneden kalfsvlees | tonijn mayonaise | kappertjes | tomaat', price: '15.25' },
      { name: 'Marinated Tomato', desc: 'Gemarineerde tomaat | parmezaan | basilicum | krokante aardappel', price: '13' },
      { name: 'Steak Tartare', desc: 'Steak tartaar | bladerdeeg | zoetzure groenten | basilicum mayonaise', price: '16.5' },
      { name: 'Coconut Lime Soup', desc: 'Kokos limoensoep | lente-ui | rode peper', price: '7.9' },
      { name: 'Tuna Tartare', desc: 'Tonijn tartaar | mango | kruidenolie | rode peper', price: '17' },
    ],
  },
  {
    title: 'Mains',
    items: [
      { name: 'Rigatoni Oxtail Stew', desc: 'Rigatoni pasta | ossenstaart stoof | parmezaan | citroen', price: '20' },
      { name: 'Satay Special', desc: 'Kippendijen saté | atjar | pindasaus | zoetzure komkommer', price: '20.5' },
      { name: 'Pumpkin Risotto', desc: 'Pompoen risotto | spinazie | geitenkaas | pompoenpitten', price: '20' },
      { name: 'Mini Hamburgers', desc: 'Twee kleine hamburgers | brioche | Gruyère | rucola | truffel | spek', price: '17.25' },
      { name: 'Corn Chicken', desc: 'Maiskip | polenta crème | zwarte knoflookjus | gegrilde paprika', price: '22.5' },
      { name: 'Lobster Thermidor', desc: 'Kreeft thermidor | seizoensgroenten', price: '36' },
      { name: 'Baked Salmon', desc: 'Zalm met kruidenkorst | groene asperges | citroen | dille', price: '22.5' },
      { name: 'Codfish', desc: 'Kabeljauw | paarse bloemkool | bagna cauda saus | hazelnoot', price: '23' },
      { name: 'Beef Rump Steak', desc: 'Lendebiefstuk | seizoensgroenten | pepersaus — 200/350 gr.', price: '27 | 39' },
      { name: 'Flank Steak', desc: 'Bavette | chimichurri | gepofte tomaat | gegrilde groenten', price: '26' },
      { name: 'Mushroom Ravioli', desc: 'Paddenstoelen ravioli | ricotta | pecorino | basilicum', price: '18.25' },
    ],
  },
  {
    title: 'On the Side',
    items: [
      { name: 'Fries', desc: 'Verse friet | mayonaise', price: '5.5' },
      { name: 'Indonesian Style Fries', desc: 'Verse friet | Indonesische verse pindasaus | mayonaise | lente-ui | rempejek', price: '8' },
      { name: 'Fries Andalouse', desc: 'Verse friet | andalousesaus | mayonaise | krokante ui | lente-ui | rode peper', price: '7' },
      { name: 'Grilled Asparagus', desc: 'Gegrilde groene asperges | parmezaan', price: '8.5' },
    ],
  },
];

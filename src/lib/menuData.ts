/**
 * Real menu data extracted from Oostkade's official PDFs (NEW DINNERKAART and
 * NEW LUNCHKAART). Edit prices and dishes here when the kitchen updates the menu.
 *
 * Price is a plain string so we can support formats like "13 | 23" (two
 * portion sizes) or "11.5 | 15.5 | 12.5" (multiple choices).
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
      { name: 'Pata Negra', desc: '50 gram | 100 gram', price: '13 | 23' },
      { name: 'Goat Cheese Spring Roll', desc: 'Geitenkaas loempia’s | chili mayonaise', price: '7' },
      { name: 'Gamba Bread', desc: 'Gamba brood | paprika knoflook dip', price: '7.5' },
      { name: 'Rustic Bread', desc: 'Rustiek brood | tomatenboter | aioli', price: '7.5' },
      { name: 'Pinsa Truffel Salami', desc: 'Luchtige pizza | truffel | salami | parmezaan', price: '10' },
      { name: 'Sicilian Olives', desc: 'Siciliaanse groene olijven', price: '4.5' },
    ],
  },
  {
    title: 'Oysters',
    items: [
      { name: 'Natural 2st', desc: 'Oesters naturel | vinaigrette | sjalot | citroen', price: '8' },
      { name: 'Tipsy Oysters 2st', desc: 'Oesters | cava', price: '9' },
      { name: 'Pornstar Martini 2st', desc: 'Oesters pornstar martini | passievrucht vinaigrette | rode peper | zeewier kaviaar', price: '9' },
    ],
  },
  {
    title: 'Sushi',
    items: [
      { name: 'Beef Truffle Roll', desc: 'Sushi ossenhaas | komkommer | groene asperges | unagisaus | truffel | rucola', price: '18' },
      { name: 'Flamed Salmon', desc: 'Sushi gebrande zalm | krab | terriyaki | komkommer | sesam | bieslook', price: '18' },
      { name: 'Gamba Roll', desc: 'Sushi gamba | sesam | komkommer | krab | unagi | tempura | rode peper', price: '19' },
    ],
  },
  {
    title: 'Starters',
    items: [
      { name: 'Sea Bass', desc: 'Aardbeien | komkommer | zalm kaviaar | basilicum', price: '16' },
      { name: 'Black Angus Carpaccio', desc: 'Carpaccio | krokante filo | ricotta crème | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '17' },
      { name: 'Mosselen N’duja', desc: 'Gewokte mosselen | pittige tomaten saus | n’duja', price: '16.5' },
      { name: 'Beef Tataki', desc: 'Vinaigrette van sambai | shiso leaf | rode peper | lente-ui', price: '15.5' },
      { name: 'Marinated Tomato', desc: 'Gemarineerde tomaat | parmezaan | basilicum | krokante aardappel', price: '13' },
      { name: 'Brioche Steak Tartare 3st', desc: 'Getoaste brioche | truffel | kappertjes | sjalot | cornichon | parmezaan', price: '17.5' },
      { name: 'Creamlobster Soup', desc: 'Room | gamba | bieslook | crostini', price: '10' },
      { name: 'Straciatella di Burrata', desc: 'Gerookte biet | bramen | pistache | aceto', price: '17.5' },
      { name: 'Tostadas', desc: 'Tonijn tartaar | nan jim | geroosterde ananas', price: '17.5' },
    ],
  },
  {
    title: "Chef's Menu",
    items: [],
    callout: {
      title: '4- of 5-gangen surprise menu van de chef',
      body: '4 gangen €53,50 · 5 gangen €59,50. Laat je verrassen door de chef.',
    },
  },
  {
    title: 'Mains',
    items: [
      { name: 'Rigatoni Truffel', desc: 'Rigatoni pasta | truffel | parmezaan | ricotta | peterselie', price: '19' },
      { name: 'Satay Special', desc: 'Kippendijsaté | atjar | pindasaus | zoetzure komkommer', price: '20.5' },
      { name: 'Moussaka (optie vega)', desc: 'Gehakt | aubergine | aardappel | tomaat | bechamelsaus', price: '21' },
      { name: 'Mini Hamburgers', desc: 'Twee kleine hamburgers | brioche | parmezaan | tomaat | little gem | truffel', price: '17' },
      { name: 'Wakadori Chicken', desc: 'Tempura groenten | noodels | terriyaki', price: '22.5' },
      { name: 'Lobster Thermidor', desc: 'Kreeft thermidor | seizoensgroenten', price: '36' },
      { name: 'Macadamia Salmon', desc: 'Macadamia boter | citroen | venkel | hoeksche krieltjes | beurre blanc', price: '23.5' },
      { name: 'Dorade', desc: 'Gerookte cherry tomaten | olijfolie | zoetzure komkommer | kardemom', price: '24.5' },
      { name: 'Oostkade Rump Steak', desc: 'Lendebiefstuk | seizoensgroenten | pepersaus | 200/350 gr.', price: '28 | 39' },
      { name: 'Flank Steak', desc: 'Bavette | cowboy butter saus | aardappelmousseline | gegrilde groente', price: '27' },
      { name: 'Big Gamba’s', desc: 'Grote gamba’s | knoflook peper olie | citroen', price: '23' },
    ],
  },
  {
    title: 'On the Side',
    items: [
      { name: 'Fries', desc: 'Verse friet | mayonaise', price: '5.5' },
      { name: 'Mini Caesar Salad', desc: 'Spek | little gem | croutons', price: '7.5' },
      { name: 'Truffel Parmezaan Fries', desc: 'Verse friet | truffel mayonaise | parmezaan | bieslook', price: '7' },
      { name: 'Hoekse Krieltjes', desc: 'Gebakken aardappeltjes met schil', price: '8.5' },
      { name: 'Indonesian Style Fries', desc: 'Verse friet | Indonesische verse pindasaus | mayonaise | lente-ui | rempejek', price: '8' },
    ],
  },
];

// ------------------------------------------------------------- Lunch -------

export const LUNCH: MenuSection[] = [
  {
    title: 'Kick Off',
    items: [
      { name: 'Pata Negra', desc: '50 gram | 100 gram', price: '13 | 23' },
      { name: 'Goat Cheese Spring Roll', desc: 'Geitenkaas loempia’s | chili mayonaise', price: '7' },
      { name: 'Gamba Bread', desc: 'Gamba brood | paprika knoflook dip', price: '7.5' },
      { name: 'Rustic Bread', desc: 'Rustiek brood | tomatenboter | aioli', price: '7.5' },
      { name: 'Pinsa Truffel Salami', desc: 'Luchtige pizza | truffel | salami | parmezaan', price: '10' },
      { name: 'Sicilian Olives', desc: 'Siciliaanse groene olijven', price: '4.5' },
    ],
  },
  {
    title: 'Oysters',
    items: [
      { name: 'Natural 2st', desc: 'Oesters naturel | vinaigrette | sjalot | citroen', price: '8' },
      { name: 'Tipsy Oysters 2st', desc: 'Oesters | cava', price: '9' },
      { name: 'Pornstar Martini 2st', desc: 'Oesters pornstar martini | passievrucht vinaigrette | rode peper | zeewier kaviaar', price: '9' },
    ],
  },
  {
    title: 'Sushi',
    items: [
      { name: 'Beef Truffle Roll', desc: 'Sushi ossenhaas | komkommer | groene asperges | unagisaus | truffel | rucola', price: '18' },
      { name: 'Flamed Salmon', desc: 'Sushi gebrande zalm | krab | terriyaki | komkommer | sesam | bieslook', price: '18' },
      { name: 'Gamba Roll', desc: 'Sushi gamba | sesam | komkommer | krab | unagi | tempura | rode peper', price: '19' },
    ],
  },
  {
    title: 'Business Lunch',
    items: [],
    callout: {
      title: 'Business lunch menu',
      body: '2 gangen €29 · 3 gangen €38 · 4 gangen €49. Wijnarrangement: 2 gangen €14 · 3 gangen €20 · 4 gangen €26.',
    },
  },
  {
    title: 'Flatbreads',
    items: [
      { name: 'Chicken Pesto', desc: 'Flatbread | kippendijen | pesto | tomaat | parmezaan', price: '12.5' },
      { name: 'Tuna Salad', desc: 'Flatbread | tonijnsalade | bieslook | tomaat | mesclun', price: '14' },
      { name: 'Spicy Chicken', desc: 'Flatbread | pittige kip | chili | komkommer', price: '12.5' },
      { name: 'Mackerel Americain', desc: 'Flatbread | gerookte makreel americain | sriracha | rode ui | bieslook', price: '13.5' },
      { name: 'Truffel Salami', desc: 'Truffel | salami | parmezaan | rucola', price: '12.5' },
    ],
  },
  {
    title: 'Rustic Bread',
    items: [
      { name: 'Black Angus Carpaccio', desc: 'Rustiek brood | ricotta crème | truffel mayonaise | spek | pijnboompitten | parmezaan | rucola', price: '13' },
      { name: 'Croquettes, your choice', desc: 'Rustiek brood | keuze uit kaaskroketten | garnaalkroketten | kalfskroketten', price: '11.5 | 15.5 | 12.5' },
      { name: 'Satay Special', desc: 'Rustiek brood | kippendijen saté | pindasaus | zoetzure komkommer | kroepoek', price: '14.5' },
      { name: 'Goat Cheese', desc: 'Rustiek brood | geitenkaas | honing | hazelnoot | pompoenpitten | rucola | balsamico', price: '13' },
      { name: 'Uitsmijter, your choice', desc: 'Rustiek brood | drie gebakken eieren | kaas | keuze uit spek of ham', price: '12.5' },
      { name: 'Tosti Pata Negra Truffel', desc: 'Rustiek brood | pata negra | truffel | jonge kaas', price: '12' },
      { name: 'Tosti Ham and Cheese', desc: 'Rustiek brood | ham | jonge kaas', price: '7.5' },
    ],
  },
  {
    title: 'Starters',
    items: [
      { name: 'Sea Bass', desc: 'Aardbeien | komkommer | zalm kaviaar | basilicum', price: '16' },
      { name: 'Black Angus Carpaccio', desc: 'Carpaccio | krokante filo | ricotta crème | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '17' },
      { name: 'Mosselen N’duja', desc: 'Gewokte mosselen | pittige tomaten saus | n’duja', price: '16.5' },
      { name: 'Beef Tataki', desc: 'Vinaigrette van sambai | shiso leaf | rode peper | lente-ui', price: '15.5' },
      { name: 'Marinated Tomato', desc: 'Gemarineerde tomaat | parmezaan | basilicum | krokante aardappel', price: '13' },
      { name: 'Creamlobster Soup', desc: 'Room | gamba | bieslook | crostini', price: '10' },
      { name: 'Straciatella di Burrata', desc: 'Gerookte biet | bramen | pistache | aceto', price: '17.5' },
      { name: 'Tostadas', desc: 'Tonijn tartaar | nan jim | geroosterde ananas', price: '17.5' },
    ],
  },
  {
    title: 'Salads',
    items: [
      { name: 'Caesar (optie vega of gamba +4.5)', desc: 'Little gem | kippendijen | ei | croutons | parmezaan', price: '15.25' },
      { name: 'Tuna Salad', desc: 'Gegaarde tonijn | rode ui | tomaat | kappertjes | komkommer', price: '15.5' },
      { name: 'Carpaccio', desc: 'Mesclun | little gem | truffel mayonaise | spek | pijnboompitten | parmezaan', price: '15' },
      { name: 'Goat Cheese', desc: 'Geitenkaas | mesclun | rucola | honing | hazelnoot | pompoenpitten | balsamico', price: '14' },
    ],
  },
  {
    title: 'Mains',
    items: [
      { name: 'Rigatoni Truffel', desc: 'Rigatoni pasta | truffel | parmezaan | ricotta | peterselie', price: '19' },
      { name: 'Satay Special', desc: 'Kippendijsaté | atjar | pindasaus | zoetzure komkommer', price: '20.5' },
      { name: 'Moussaka (optie vega)', desc: 'Gehakt | aubergine | aardappel | tomaat | bechamelsaus', price: '21' },
      { name: 'Mini Hamburgers', desc: 'Twee kleine hamburgers | brioche | parmezaan | tomaat | little gem | truffel', price: '17' },
      { name: 'Wakadori Chicken', desc: 'Tempura groenten | noodels | terriyaki', price: '22.5' },
      { name: 'Lobster Thermidor', desc: 'Kreeft thermidor | seizoensgroenten', price: '36' },
      { name: 'Macadamia Salmon', desc: 'Macadamia boter | citroen | venkel | hoeksche krieltjes | beurre blanc', price: '23.5' },
      { name: 'Dorade', desc: 'Gerookte cherry tomaten | olijfolie | zoetzure komkommer | kardemom', price: '24.5' },
      { name: 'Oostkade Rump Steak', desc: 'Lendebiefstuk | seizoensgroenten | pepersaus | 200/350 gr.', price: '28 | 39' },
      { name: 'Flank Steak', desc: 'Bavette | cowboy butter saus | aardappelmousseline | gegrilde groente', price: '27' },
      { name: 'Big Gamba’s', desc: 'Grote gamba’s | knoflook peper olie | citroen', price: '23' },
    ],
  },
  {
    title: 'On the Side',
    items: [
      { name: 'Fries', desc: 'Verse friet | mayonaise', price: '5.5' },
      { name: 'Mini Caesar Salad', desc: 'Spek | little gem | croutons', price: '7.5' },
      { name: 'Truffel Parmezaan Fries', desc: 'Verse friet | truffel mayonaise | parmezaan | bieslook', price: '7' },
      { name: 'Hoekse Krieltjes', desc: 'Gebakken aardappeltjes met schil', price: '10' },
      { name: 'Indonesian Style Fries', desc: 'Verse friet | Indonesische verse pindasaus | mayonaise | lente-ui | rempejek', price: '8' },
    ],
  },
];

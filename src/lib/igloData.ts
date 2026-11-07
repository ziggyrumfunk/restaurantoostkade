/**
 * Iglo Experience menus (winter 2026-27), from Yorick's menu document.
 * Dishes stay in Dutch in every language, like the regular menu.
 */

export const IGLO_IMAGE = { url: '/iglo/oostkade-iglo-01.webp', width: 1600, height: 900 };

/** First day the igloos can be booked: the widget opens on this date. */
export const IGLO_FIRST_DAY = '2026-12-01';

export type IgloGroup = {
  /** Course number; omitted for the brunch's opening dishes. */
  course?: number;
  /** Message key for the group's label, added after the course number. */
  label?: 'dessert' | 'dessertPlatter' | 'luxuryDessertPlatter';
  dishes: { name: string; desc?: string }[];
};

export type IgloMenu = {
  /** Message key prefix for the menu's title and price. */
  id: 'brunch' | 'dinner4' | 'dinner5';
  groups: IgloGroup[];
};

export const IGLO_MENUS: IgloMenu[] = [
  {
    id: 'brunch',
    groups: [
      {
        dishes: [
          { name: 'Brioche Steak Tartare' },
          { name: 'Kreeftensoep' },
          { name: 'Mini oude kaaskroketjes' },
          { name: 'Eggs Benedict' },
          { name: 'Truffeltosti' },
          { name: 'Truffelfriet met Parmezaan' },
        ],
      },
      {
        label: 'dessert',
        dishes: [
          { name: 'Crème brûlée' },
          { name: 'Hot Chocolate Lava Cake' },
          { name: 'Karamelkoek' },
          { name: 'Brownie' },
          { name: 'Rood fruit' },
        ],
      },
    ],
  },
  {
    id: 'dinner4',
    groups: [
      {
        course: 1,
        dishes: [
          { name: 'Black Angus Carpaccio', desc: 'Krokante filo | truffelmayonaise | Parmezaan | pijnboompitten' },
          { name: 'Flamed Salmon Sushi', desc: 'Gebrande zalm | krab | teriyaki' },
          { name: 'Stracciatella di Burrata', desc: 'Gerookte biet | bramen | pistache' },
        ],
      },
      {
        course: 2,
        dishes: [
          { name: 'Coquilles', desc: 'Prei | citroen | spek' },
          { name: 'Brioche Steak Tartare', desc: 'Truffel | kappertjes | Parmezaan' },
          { name: 'Tuna Taco', desc: 'Ananas | lente-ui' },
        ],
      },
      {
        course: 3,
        dishes: [
          { name: 'Flank Steak', desc: 'Bavette | cowboy butter' },
          { name: 'Macadamia Salmon', desc: 'Zalm | macadamiaboter' },
          { name: 'Truffel-Parmezaanfriet en seizoensgroenten' },
        ],
      },
      {
        course: 4,
        label: 'dessertPlatter',
        dishes: [
          { name: 'Huisgemaakt ijs' },
          { name: 'Crème brûlée' },
          { name: 'Karamelkoek' },
          { name: 'Brownie' },
        ],
      },
    ],
  },
  {
    id: 'dinner5',
    groups: [
      {
        course: 1,
        dishes: [
          { name: 'Black Angus Carpaccio', desc: 'Krokante filo | truffelmayonaise | Parmezaan | pijnboompitten' },
          { name: 'Beef Tataki', desc: 'Sambai | lente-ui' },
          { name: 'Stracciatella di Burrata', desc: 'Gerookte biet | bramen' },
        ],
      },
      {
        course: 2,
        dishes: [
          { name: 'Flamed Salmon Roll', desc: 'Krab | teriyaki | sesam' },
          { name: 'Gamba Roll', desc: 'Komkommer | spicy mayonaise | unagi' },
        ],
      },
      {
        course: 3,
        dishes: [
          { name: 'Steak Tartare', desc: 'Parmezaanschuim' },
          { name: 'Coquilles', desc: 'Prei | citroen | spek' },
          { name: 'Gyoza Chicken', desc: 'Kimchi | rode peper' },
        ],
      },
      {
        course: 4,
        dishes: [
          { name: 'Oostkade Rump Steak', desc: 'Pepersaus' },
          { name: 'Zalmfilet', desc: 'Kreeftensaus' },
          { name: 'Big Gamba’s', desc: 'Rode peper en knoflookolie' },
          { name: 'Indonesian Style Fries' },
        ],
      },
      {
        course: 5,
        label: 'luxuryDessertPlatter',
        dishes: [
          { name: 'Crème brûlée' },
          { name: 'Hot Chocolate Lava Cake' },
          { name: 'Sundae Caramel' },
          { name: 'Brownie' },
          { name: 'Rood fruit' },
        ],
      },
    ],
  },
];

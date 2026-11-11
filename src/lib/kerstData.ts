/**
 * Christmas menu 2026, from Yorick's document "kerst menu 2026 3 ISV".
 * Dishes stay in Dutch in every language, like the regular menu.
 * Remove this page (and its route, sitemap entry and links) after Christmas.
 */

export type KerstCourse = {
  /** Course number; omitted for the amuse, which isn't one of the six. */
  course?: number;
  /** One dish, or several to choose from. */
  dishes: { name: string; desc?: string }[];
};

export const KERST_MENU: KerstCourse[] = [
  { dishes: [{ name: 'Amuse' }] },
  {
    course: 1,
    dishes: [{ name: 'Aardappelschuim', desc: 'Truffel | krokante prei | kaantjes' }],
  },
  {
    course: 2,
    dishes: [
      { name: 'Tonijn Sashimi', desc: 'Krokant filodeeg | ricotta crème | wasabi mayonaise | bieslook | sesam' },
      { name: 'Carpaccio', desc: 'Krokant filodeeg | ricotta crème | truffel mayonaise | krokante spekjes | Parmezaanse kaas' },
    ],
  },
  {
    course: 3,
    dishes: [
      { name: 'Franse Uiensoep', desc: 'Langzaam gegaarde ui | gegratineerde Gruyère crouton' },
      { name: 'Romige Kreeftensoep', desc: 'Kreeftenbisque | gamba’s | room | bieslook' },
    ],
  },
  {
    course: 4,
    dishes: [
      { name: 'Gegratineerde Coquilles', desc: 'Spinazie | ponzu | Parmezaanse kaas | broodkruim' },
      { name: 'Eendenborst', desc: 'Sinaasappeljus | crème van pastinaak | gekaramelliseerde appel' },
    ],
  },
  {
    course: 5,
    dishes: [
      { name: 'Herten Biefstuk', desc: 'Rode wijn wildjus | stoofpeer | zoete aardappelcrème | groene groenten | aardappelgratin' },
      { name: 'Kabeljauw', desc: 'Saffraan beurre blanc | knolselderij crème | groene asperge | aardappelgratin | kruidenolie' },
      { name: 'Pompoen Risotto', desc: 'Burrata | pistache | Parmezaanse kaas | salie | kruidenolie' },
    ],
  },
  {
    course: 6,
    dishes: [{ name: 'Millefeuille', desc: 'Krokant bladerdeeg | vanille crème pâtissière | rood fruit | witte chocolade-ijs' }],
  },
];

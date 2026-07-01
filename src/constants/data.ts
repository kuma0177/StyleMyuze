export const formTypeTitles = [
  {
    index: 0,
    title: `Let's Get to Know You`,
    subTitle: `Please complete your try-on information`,
  },
  {
    index: 1,
    title: `Help Us Find Your Fit`,
    subTitle: `Please complete your try-on information`,
  },
  {
    index: 2,
    title: `What's Your Style?`,
    subTitle: `Select up to 3 styles — AI will suggest outfits that match.`,
  },
  {
    index: 3,
    title: `What's Your Body Shape?`,
    subTitle: `AI will recommend outfits based on your selection.`,
  },
];

export const maleStyleData = [
  {
    imageUrl: require('../assets/images/maleModels/Model1.png'),
    value: 'Casual/Streetwear',
    desc: 'Hoodies, graphic tees, joggers, sneakers; laid-back, sporty, and influenced by urban culture.',
  },
  {
    imageUrl: require('../assets/images/maleModels/Model2.png'),
    value: 'Business/Smart Casual',
    desc: 'Chinos, button-downs, blazers; polished but relaxed outfits for work or dinner dates.',
  },
  {
    imageUrl: require('../assets/images/maleModels/Model3.png'),
    value: 'Classic/Traditional',
    desc: 'Well-fitted jeans, polo shirts, leather shoes; timeless pieces that never go out of style.',
  },
  {
    imageUrl: require('../assets/images/maleModels/Model4.png'),
    value: 'Athleisure/Sporty',
    desc: 'Performance fabrics, track jackets, branded trainers; athletic looks worn beyond the gym.',
  },
  {
    imageUrl: require('../assets/images/maleModels/Model5.png'),
    value: 'Minimalist/Modern',
    desc: 'Neutral colors, slim cuts, simple layering; clean and understated for a sophisticated vibe.',
  },
  {
    imageUrl: require('../assets/images/maleModels/Model6.png'),
    value: 'Edgy/Rocker',
    desc: 'Leather jackets, black jeans, combat boots; dark, rebellious, and inspired by punk or metal scenes.',
  },
];

export const femaleStyleData = [
  {
    imageUrl: require('../assets/images/femaleModels/Model1.png'),
    value: 'Casual/Streetwear',
    desc: 'Think jeans, oversized shirts, leggings, sneakers; comfort-driven looks with trendy, urban twists.',
  },
  {
    imageUrl: require('../assets/images/femaleModels/Model2.png'),
    value: 'Business/Smart Casual',
    desc: 'Tailored pants, blazers, blouses; professional but not stuffy, for office or networking.',
  },
  {
    imageUrl: require('../assets/images/femaleModels/Model3.png'),
    value: 'Minimalist/Modern Classic',
    desc: 'Clean lines, neutral colors, quality basics; timeless pieces that don’t scream for attention.',
  },
  {
    imageUrl: require('../assets/images/femaleModels/Model4.png'),
    value: 'Bohemian (Boho)',
    desc: 'Flowy dresses, earthy tones, ethnic prints; carefree, artsy, and often layered.',
  },
  {
    imageUrl: require('../assets/images/femaleModels/Model5.png'),
    value: 'Romantic/Feminine',
    desc: 'Ruffles, lace, pastel dresses; soft, delicate silhouettes for a girly vibe.',
  },
  {
    imageUrl: require('../assets/images/femaleModels/Model6.png'),
    value: 'Edgy/Rocker ',
    desc: 'Leather jackets, ripped jeans, bold boots; dark, rebellious outfits with attitude.',
  },
];


export const maleBodyTypes = [
  {
    value: 'Rectangle',
    desc: 'Shoulders and hips are roughly the same width; torso goes straight down with little taper at the waist. Think tall, lean frames.',
  },
  {
    value: 'Triangle',
    desc: 'Hips and waist are wider than the shoulders, giving a bottom-heavy appearance. Often seen in men who carry weight in the belly or lower body.',
  },
  {
    value: 'Inverted Triangle',
    desc: 'Broad shoulders and chest, narrowing dramatically to a slim waist and hips. Classic “V-shape” many bodybuilders chase.',
  },
  {
    value: 'Oval (or Round)',
    desc: 'Midsection is wider than shoulders and hips, with more weight carried around the belly area.',
  },
  {
    value: 'Trapezoid',
    desc: 'Widest at the shoulders, slightly narrower at the waist and hips, but not as exaggerated as the inverted triangle. Often considered the “ideal” male shape in fashion.',
  },
];

export const femaleBodyTypes = [
  {
    value: 'Hourglass',
    desc: 'Shoulders and hips about the same width, with a clearly defined, narrower waist. Balanced curves.',
  },
  {
    value: 'Pear (Triangle)',
    desc: 'Hips are wider than shoulders; lower body is more prominent than upper body.',
  },
  {
    value: 'Apple (Round/Oval) ',
    desc: 'Carries more weight around the midsection; waist is wider with slimmer legs/arms.',
  },
  {
    value: 'Rectangle (Straight/Athletic) ',
    desc: 'Shoulders, waist, and hips are roughly the same width, with little waist definition.',
  },
  {
    value: 'Inverted Triangle',
    desc: 'Shoulders or bust are broader than hips, giving a “top-heavy” appearance.',
  },
];
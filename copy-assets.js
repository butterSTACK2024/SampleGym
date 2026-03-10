const fs = require('fs');
const path = require('path');

const src = 'C:/Users/nitya/.gemini/antigravity/brain/5d685145-920a-4955-a908-62f3eeff2221/';
const dst = 'c:/Users/nitya/.gemini/antigravity/scratch/gym-website/src/assets/';

const map = {
  'hero_gym_1773084925778': 'hero',
  'about_gym_1773084944509': 'about',
  'trainer1_portrait_1773084962119': 'trainer1',
  'trainer2_portrait_1773084976215': 'trainer2',
  'trainer3_portrait_1773084995073': 'trainer3',
  'class1_hiit_1773085021007': 'class1',
  'class2_yoga_1773085036505': 'class2',
  'class3_boxing_1773085053797': 'class3',
  'gallery1_interior_1773085071184': 'gallery1',
  'gallery2_weights_1773085088496': 'gallery2',
  'gallery3_cardio_1773085113305': 'gallery3',
  'gallery4_locker_1773085133582': 'gallery4',
};

Object.entries(map).forEach(([s, d]) => {
  try {
    fs.copyFileSync(src + s + '.png', dst + d + '.png');
    console.log('Copied ' + d + '.png');
  } catch (e) {
    console.error('Failed to copy ' + d + ': ' + e.message);
  }
});

console.log('DONE');

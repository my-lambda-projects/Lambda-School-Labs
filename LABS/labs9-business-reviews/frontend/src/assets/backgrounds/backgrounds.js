import bg1 from './artmuseum.jpeg';
import bg2 from './bar.jpeg';
import bg3 from './bowling.jpeg';
import bg4 from './butcher.jpeg';
import bg5 from './diner.jpeg';
import bg6 from './donuts.jpeg';
import bg7 from './kitchen.jpeg';
import bg8 from './movietheater.jpeg';
import bg9 from './produce.jpeg';
import bg10 from './recordshop.jpeg';
import bg11 from './suits.jpeg';

let backgrounds = [ bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11 ];
export const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
import { AnimatorDom, m8 } from 'anim8js-dom';

let el: Element = document.createElement('DIV');
let an: AnimatorDom = m8(el);

an.tween('opacity', 0, '+43');

an.play({
  keyframe: {
    '0': {
      angle: 0
    },
    '100':{ 
      angle: 45
    }
  }
});

an
.defer('once', 'finished')
  .play('wiggle')
  .defer('once', 'finished')
    .stop('opacity')
  .undefer()
.undefer();
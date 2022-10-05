'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandamImage();

      this.stop = document.createElement('div');
      this.stop.classList.add('stop');
      this.stop.textContent = 'Stop';
      this.stop.addEventListener('click', () => {
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);
        
        leftpanels--;
        if (leftpanels === 0) {
          spin.classList.remove('inactive');
          checkresult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandamImage() {
      const images = [
        'img/20220326_084305_p_o_7412.avif',
        'img/gallery_visual_08.jpeg',
        'img/y_623e6fd504f2d.jpeg',
      ];
     return images[Math.floor(Math.random() * images.length)];
    }

    Spin() {
      this.img.src = this.getRandamImage();
      this.timeoutId = setTimeout(() => {
        this.Spin();
      }, 100);
    }

    unmatch() {
      this.img.classList.add('unmatch');
    }

    isunmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    activate() {
      this.stop.classList.remove('inactive');
      this.img.classList.remove('unmatch');
    }
  }

  function checkresult() {
    if (panels[0].isunmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isunmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isunmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let timeoutId;
  let leftpanels = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    leftpanels = 3;
    spin.classList.remove('unmatch');
    panels.forEach(panel => {
      panel.activate();
      panel.Spin();
    });
  });
}


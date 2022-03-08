import { createCanvas, loadImage, PNGStream } from 'canvas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanvasService {
  constructor() {}

  async createBadge(point, total, streak): Promise<PNGStream> {

    if(!point) point = 0;
    if(!total) total = 0;
    if(!streak) streak = 0;

    const canvas = createCanvas(450, 450)
    const ctx = canvas.getContext('2d')


    // Background
    await loadImage('static/img/point-badge/p_back.jpeg').then((image) => {
      ctx.drawImage(image, 0, 0, 450, 450)
    });



    // Write "Awesome!"
    ctx.font = '104px Arial'
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText(point, 250, 210, 220)
    
    // flare
    await loadImage('static/img/point-badge/p_flare1.png').then((image) => {
      ctx.drawImage(image, 0, 0, 450, 294)
    });//*/

    return canvas.createPNGStream();
  }

}

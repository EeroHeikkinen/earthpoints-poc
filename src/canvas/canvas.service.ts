import { createCanvas, loadImage, PNGStream, registerFont } from 'canvas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanvasService {
  constructor() {}

  async createBadge(point, total, streak): Promise<PNGStream> {

    registerFont('static/font/Montserrat/Montserrat-Bold.ttf',{family: 'Montserrat',weight: 'bold'});
    registerFont('static/font/Montserrat/Montserrat-Medium.ttf',{family: 'Montserrat',weight: 'normal'});

    if(!point) point = 0;
    if(!total) total = 0;

    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext('2d');


    // Background
    await loadImage('static/img/point-badge/EB1.png').then((image) => {
      ctx.drawImage(image, 0, 0, 300, 300)
    });


    // Point
    ctx.font = 'bold 72px Montserrat'
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(point, 90, 120);

    // Total
    ctx.font = 'bold 40px Montserrat'
    ctx.fillStyle = '#051498';
    ctx.textAlign = 'center';
    ctx.fillText(total, 195, 220);

    
    if(streak && streak != '0')
    {
      // Streak
      ctx.translate(150, 150);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.translate(-150, -150);
      ctx.font = 'normal 14px Montserrat'
      ctx.fillStyle = '#051498';
      ctx.textAlign = 'center';
      ctx.fillText('STREAK', 110, 280);

      //Streak Count
      ctx.font = 'bold 28px Montserrat'
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(streak, 145, 282);

      // Days
      var streak_text = ctx.measureText(streak)
      ctx.font = 'normal 14px Montserrat'
      ctx.fillStyle = '#051498';
      ctx.textAlign = 'center';
      ctx.fillText((streak == '1' ? 'DAY' : 'DAYS'), 145 + streak_text.width + 25, 280);
    }
    

    return canvas.createPNGStream();
  }

}

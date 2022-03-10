import { createCanvas, loadImage, PNGStream, registerFont } from 'canvas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CanvasService {
  constructor() {}

  async createStatusBadge(point, total, streak, theme,confetti): Promise<PNGStream> {

    registerFont('static/font/Montserrat/Montserrat-Bold.ttf',{family: 'Montserrat',weight: 'bold'});
    registerFont('static/font/Montserrat/Montserrat-Medium.ttf',{family: 'Montserrat',weight: 'normal'});

    if(!point) point = 0;
    if(!total) total = 0;

    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext('2d');


    // Background
    let background_image;
    let offset = 0;
    switch(theme){
      case 'blue_bottom':
      case 'bluered_bottom':
      case 'greenred_bottom':
      case 'green_bottom':
        offset = 40;
      case 'bluegreen_top':
      case 'blue_top':
      case 'greenblue_top':
      case 'green_top':
        background_image = `EB${theme}`;
        break;
      default:
        background_image = 'EBgreen_top';
        break;
    }
    await loadImage(`static/img/point-badge/${background_image}.png`).then((image) => {
      ctx.drawImage(image, 0, 0, 300, 300)
    });

    
    //Confetti
    await this.drawConfetti(ctx,confetti);

    let color2;
    switch(theme){
      case 'bluegreen_top':
      case 'greenred_bottom':
      case 'greenblue_top':
        color2 = 'white';
        break;
      case 'bluered_bottom':
      case 'blue_top':
      case 'blue_bottom':
        color2 = '#76B54B';//green
        break;
      case 'green_top':
      case 'green_bottom':
      default:
        color2 = '#051498';//blue
        break;
        '#76B54B'
    }


    // Point
    ctx.font = 'bold 72px Montserrat'
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(point, 90, 120+offset);

    // Total
    ctx.font = 'bold 40px Montserrat'
    ctx.fillStyle = color2;
    ctx.textAlign = 'center';
    ctx.fillText(total, 195, 220+offset);

    
    if(streak && streak != '0')
    {
      // Streak
      ctx.translate(150, 150);
      ctx.rotate(-90 * Math.PI / 180);
      ctx.translate(-150, -150);
      ctx.font = 'normal 14px Montserrat'
      ctx.fillStyle = color2;
      ctx.textAlign = 'center';
      ctx.fillText('STREAK', 110+offset*-1, 280);

      //Streak Count
      ctx.font = 'bold 28px Montserrat'
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(streak, 145+offset*-1, 282);

      // Days
      var streak_text = ctx.measureText(streak)
      ctx.font = 'normal 14px Montserrat'
      ctx.fillStyle = color2;
      ctx.textAlign = 'center';
      ctx.fillText((streak == '1' ? 'DAY' : 'DAYS'), 145 + streak_text.width + 25 + offset*-1, 280);
    }
    

    return canvas.createPNGStream();
  }

  async createPointBadge(point,theme,confetti): Promise<PNGStream> {

    registerFont('static/font/Montserrat/Montserrat-Bold.ttf',{family: 'Montserrat',weight: 'bold'});

    if(!point) point = 0;

    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext('2d');


    // Background
    let background_image;
    switch(theme){
      case 'blue':
      case 'green':
        background_image = `EB${theme}`;
        break;
      default:
        background_image = 'EBgreen';
        break;
    }
    await loadImage(`static/img/point-badge/${background_image}_center.png`).then((image) => {
      ctx.drawImage(image, 0, 0, 300, 300)
    });


    // Point
    ctx.font = 'bold 78px Montserrat'
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(point, 90, 145);

    //Confetti
    await this.drawConfetti(ctx,confetti);


    return canvas.createPNGStream();
  }

  async drawConfetti(ctx,confetti) {
    let confetti_image;
    switch(confetti){
      case '7':
      case '6':
      case '5':
      case '4':
      case '3':
      case '2':
      case '1':
        confetti_image = `C${confetti}`;
        break;
      default:
        confetti_image = 'C1';
        break;
    }  
    await loadImage(`static/img/point-badge/${confetti_image}.png`).then((image) => {
      ctx.drawImage(image, 0, 0, 300, 300)
    });
  }


}

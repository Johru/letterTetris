import * as PIXI from 'pixi.js';
import { Game } from './index';

export class Letter {
  public sprite: PIXI.Text;
  public letter: string;

  constructor(letter: string, game: Game) {
    this.letter = letter;
    this.sprite = new PIXI.Text(letter, {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center',
    });
    this.sprite.x = Math.random() * game.app.screen.width;
    this.sprite.y = 0;
    game.app.stage.addChild(this.sprite);
  }

  remove(app: PIXI.Application) {
    app.stage.removeChild(this.sprite);
  }

  update(delta: number) {
    this.sprite.y += game.speed * delta;
  }
}

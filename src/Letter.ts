import * as PIXI from 'pixi.js';
import { Color } from 'pixi.js';
import { Game } from './index';
// import { hslToHex } from './hslToHex';

export class Letter {
  public letter: string;
  private letterSprite: PIXI.Text;
  private square: PIXI.Graphics;
  private letterSize: number;
  private squareSize: number;

  constructor(letter: string, game: Game, x: number, size: number) {
    this.letter = letter;
    this.squareSize = size;
    this.letterSize = Math.max(
      this.squareSize * (Math.random() * 0.7 + 0.1),
      25
    );

    this.square = new PIXI.Graphics();

    const hue = Math.random() * 360;
    const color = new Color(`hsl(${hue}, 100%, 20%, 100%)`).toArray();
    this.square.beginFill(color);
    this.square.lineStyle(1, 0xffffff);
    this.square.drawRect(0, 0, this.squareSize, this.squareSize);
    this.square.x = x;
    this.square.y = 0;
    game.app.stage.addChild(this.square);

    this.letterSprite = new PIXI.Text(letter, {
      fontFamily: 'Arial',
      fontSize: this.letterSize,
      fill: 0xffffff,
      align: 'center',
    });

    this.letterSprite.anchor.set(0.5);
    this.letterSprite.position.set(this.squareSize / 2, this.squareSize / 2);
    this.square.addChild(this.letterSprite);
  }

  remove(app: PIXI.Application) {
    app.stage.removeChild(this.square);
  }

  update(delta: number, speed: number, game: Game) {
    this.square.y += (speed / 120) * delta;
    if (this.square.y + this.squareSize >= game.app.screen.height) {
      game.endGame();
    }
  }

  get bounds() {
    return this.square.getBounds();
  }
}

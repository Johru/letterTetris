import * as PIXI from "pixi.js";

class Game {
  private app: PIXI.Application<HTMLCanvasElement>;
  private letter: PIXI.Text;
  private square: PIXI.Graphics;
  private letterSize: number;
  private squareSize: number;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(this.app.view);

    // Generate a random letter from A to Z
    const letterChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Generate a random size for the square
    this.squareSize = Math.random() * 100 + 50; // Random size between 50 and 150

    // Make the letter size a random percentage of the square size, between 10% and 95%
    this.letterSize = this.squareSize * (Math.random() * 0.85 + 0.1);

    const letterStyle = new PIXI.TextStyle({
      fontSize: this.letterSize,
      fill: "white",
    });

    this.letter = new PIXI.Text(letterChar, letterStyle);
    this.letter.anchor.set(0.5);

    // Create a square with a border
    this.square = new PIXI.Graphics();
    this.square.lineStyle(5, 0xffffff); // White border
    this.square.drawRect(0, 0, this.squareSize, this.squareSize);
    this.square.x = Math.random() * (this.app.screen.width - this.squareSize);

    // Make sure the letter is centered in the square
    this.letter.position.set(this.squareSize / 2, this.squareSize / 2);

    this.square.addChild(this.letter);
    this.app.stage.addChild(this.square);

    this.app.ticker.add((delta) => this.gameLoop(delta));
  }

  gameLoop(delta: number) {
    this.square.y += 1 * delta;

    if (this.square.y > this.app.screen.height) {
      this.square.y = 0;
      this.square.x = Math.random() * (this.app.screen.width - this.squareSize);
    }
  }
}

const game = new Game();
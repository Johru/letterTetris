// import * as PIXI from "pixi.js";
// import { launchPlaceholder } from "./placeholder";

// let app = new PIXI.Application<HTMLCanvasElement>({ width: 640, height: 360 });
// document.body.appendChild(app.view);

// let sprite = PIXI.Sprite.from("images/sample.png");

// app.stage.addChild(sprite);
// launchPlaceholder();

// let elapsed = 0.0;
// app.ticker.add((delta) => {
//   elapsed += delta;
//   sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
// });

import * as PIXI from "pixi.js";

class Game {
  private app: PIXI.Application<HTMLCanvasElement>;
  private letter: PIXI.Text;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(this.app.view);

    // Set up the letter
    const letterStyle = new PIXI.TextStyle({
      fontSize: 36,
      fill: "white",
    });

    this.letter = new PIXI.Text("D", letterStyle);
    this.letter.x = Math.random() * this.app.screen.width; // Random x position
    this.letter.y = 0; // Start at the top of the screen

    this.app.stage.addChild(this.letter);

    // Start the game loop
    this.app.ticker.add((delta) => this.gameLoop(delta));
  }

  gameLoop(delta: number) {
    // Move the letter down
    this.letter.y += 1 * delta;

    // Check if the letter is off the bottom of the screen
    if (this.letter.y > this.app.screen.height) {
      // Reset the letter to the top of the screen and give it a new x position
      this.letter.y = 0;
      this.letter.x = Math.random() * this.app.screen.width;
    }
  }
}

// Create a new game instance
const game = new Game();

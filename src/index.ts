import * as PIXI from "pixi.js";
import { Letter } from "./Letter";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  private letters: Letter[];
  private isGameOngoing: Boolean = true;
  private timeElapsed: number = 0;
  private alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  public readonly speed = 60;
  private score = 0;
  private pauseButton = document.getElementById("pause");
  private plusButton = document.getElementById("plus");
  private scoreElement;

  constructor() {
    this.app = new PIXI.Application<HTMLCanvasElement>({
      width: 800,
      height: 600,
    });
    document.body.appendChild(this.app.view);
    const container = document.getElementById("pixi-container");
    container?.appendChild(this.app.view);
    this.letters = [];
    this.score = 0;
    this.scoreElement = document.getElementById("score");

    const keydown = window.addEventListener("keydown", (event) => {
      let key = event.key.toLowerCase();
      if (key === " ") {
        this.isGameOngoing = !this.isGameOngoing;
      }
      this.letters = this.letters.filter((letterInstance) => {
        if (letterInstance.letter === key) {
          letterInstance.remove(this.app);
          return false;
        } else {
          return true;
        }
      });
    });

    if (this.pauseButton)
      this.pauseButton.addEventListener(
        "click",
        () => (this.isGameOngoing = !this.isGameOngoing)
      );

    if (this.plusButton)
      this.plusButton.addEventListener("click", () => this.incrementScore());

    this.app.ticker.add((delta: number) => this.gameLoop(delta));
  }

  gameLoop(delta: number) {
    if (this.isGameOngoing) {
      this.timeElapsed += delta;

      for (let letter of this.letters) {
        letter.update(delta, this.speed);
      }

      if (this.timeElapsed >= 600 / this.speed) {
        this.timeElapsed = 0;
        this.createLetter();
      }
    }
  }

  createLetter() {
    let randomLetter =
      this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    let size = Math.max(Math.random() * 100 + 3, 30);
    let y = 0;

    // Generate an array of all possible x positions and shuffle it
    let positions = this.generatePositions(size);
    this.shuffleArray(positions);

    let x;
    for (let pos of positions) {
      if (!this.doesCollide(pos, y, size)) {
        x = pos;
        break;
      }
    }

    // If a suitable position was found, create the square
    if (x !== undefined) {
      let letterInstance = new Letter(randomLetter, this, x, size);
      this.letters.push(letterInstance);
    }
  }

  // Returns an array of all possible x positions for a square of the given size
  generatePositions(size: number): number[] {
    let positions = [];
    for (let x = 0; x <= this.app.screen.width - size; x += size) {
      positions.push(x);
    }
    return positions;
  }

  // Shuffles an array in-place using the Fisher-Yates algorithm
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  doesCollide(x: number, y: number, size: number): boolean {
    const newSquare = new PIXI.Rectangle(x, y, size, size);
    for (let letter of this.letters) {
      if (newSquare.intersects(letter.bounds)) {
        return true;
      }
    }
    return false;
  }

  incrementScore() {
    this.score++;
    if (this.scoreElement)
      this.scoreElement.textContent = `Score: ${this.score}`;
  }
  decrementScore() {
    this.score -= 2;
    if (this.scoreElement)
      this.scoreElement.textContent = `Score: ${this.score}`;
  }
}
new Game();

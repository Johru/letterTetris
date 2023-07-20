import * as PIXI from "pixi.js";
import { Letter } from "./Letter";

export class Game {
  public readonly app: PIXI.Application<HTMLCanvasElement>;
  private letters: Letter[];
  private isGameOngoing: Boolean = true;
  private timeElapsed: number = 0;
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  private initialSpeed = 20;
  public speed = this.initialSpeed;
  private speedIncrement = 5;
  private score = 0;
  private pauseButton = document.getElementById("pause");
  private scoreElement = document.getElementById("score");
  private speedElement = document.getElementById("speed");
  private keydownListener: (event: KeyboardEvent) => void;
  private pauseListener: (event: MouseEvent) => void;

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

    this.keydownListener = (event: KeyboardEvent): void => {
      let key = event.key.toUpperCase();
      if (key === " ") {
        this.isGameOngoing = !this.isGameOngoing;
        return;
      }

      let matchCount = 0;

      this.letters = this.letters.reduce((remainingLetters, letterInstance) => {
        if (letterInstance.letter === key) {
          matchCount++;
          letterInstance.remove(this.app);
        } else {
          remainingLetters.push(letterInstance);
        }
        return remainingLetters;
      }, [] as Letter[]);

      if (matchCount >= 2) {
        this.incrementScore();
      } else {
        this.decrementScore();
      }
    };

    window.addEventListener("keydown", this.keydownListener);

    this.pauseListener = () => (this.isGameOngoing = !this.isGameOngoing);

    if (this.pauseButton)
      this.pauseButton.addEventListener("click", this.pauseListener);

    this.app.ticker.add(this.gameLoop.bind(this));
    this.updateSpeed();
  }

  gameLoop(delta: number) {
    if (this.isGameOngoing) {
      this.timeElapsed += delta;

      for (let letter of this.letters) {
        letter.update(delta, this.speed, this);
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
    let x = Math.random() * (this.app.screen.width - size);

    let letterInstance = new Letter(randomLetter, this, x, size);
    this.letters.push(letterInstance);
  }

  incrementScore() {
    this.score++;
    if (this.score >= 50) this.endGame();
    this.updateSpeed();
    if (this.scoreElement)
      this.scoreElement.textContent = `Score: ${this.score}`;
  }
  decrementScore() {
    this.score -= 2;
    if (this.score < 0) this.score = 0;
    this.updateSpeed();

    if (this.scoreElement)
      this.scoreElement.textContent = `Score: ${this.score}`;
  }
  updateSpeed() {
    this.speed = this.initialSpeed + this.speedIncrement * this.score;
    if (this.speedElement)
      this.speedElement.textContent = `Speed: ${this.speed}`;
  }

  endGame() {
    this.isGameOngoing = false;
    window.removeEventListener("keydown", this.keydownListener);
    this.pauseButton?.removeEventListener("click", this.pauseListener);
  }
}
new Game();

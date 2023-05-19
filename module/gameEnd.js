import { board } from '../index.js';

export default function gameEnd(text) {
    const result = document.querySelector('.result');
    result.textContent = text;
    document.querySelector('.play-again').classList.add('reveal');
    result.classList.add('reveal');
    board.stop();
}

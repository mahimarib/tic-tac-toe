import Board from './module/Board.js';
import checkDraw from './module/checkDraw.js';
import checkWin from './module/checkWin.js';
import gameEnd from './module/gameEnd.js';

export const board = new Board();

board.setOnClickHook(shape => {
    if (checkWin(shape)) {
        gameEnd(`${shape == 'cross' ? 'X' : 'O'} wins!`);
    } else if (checkDraw()) {
        gameEnd("It's a Draw!");
    }
});

document.querySelector('button').addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('fixed', 'circle', 'cross', 'highlight');
        cell.innerHTML = ``;
    });

    document.querySelector('.play-again').classList.remove('reveal');
    document.querySelector('.result').classList.remove('reveal');
    board.enable();
});

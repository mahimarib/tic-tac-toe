import Board from './module/Board.js';
import checkDraw from './module/checkDraw.js';
import checkWin from './module/checkWin.js';

const board = new Board();

board.setOnClickHook(shape => {
    const result = document.querySelector('.result');
    if (checkWin(shape)) {
        result.textContent = `${shape == 'cross' ? 'X' : 'O'} wins!`;
        document.querySelector('.play-again').classList.add('reveal');
        result.classList.add('reveal');
        board.stop();
    } else if (checkDraw()) {
        result.textContent = `it's a draw!`;
        document.querySelector('.play-again').classList.add('reveal');
        result.classList.add('reveal');
        board.stop();
    }
});

document.querySelector('button').addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('fixed', 'circle', 'cross', 'highlight');
        cell.innerHTML = ``;
    });
    document.querySelector('.play-again').classList.remove('reveal');
    const result = document.querySelector('.result');
    result.classList.remove('reveal');
    board.enable();
});

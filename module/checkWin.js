import winningPos from './winningPos.js';

export default function checkWin(shape) {
    const cells = Array.from(document.querySelectorAll('.cell'));
    return winningPos.some(comb => {
        if (comb.every(index => cells[index].classList.contains(shape))) {
            comb.forEach(i => cells[i].classList.add('highlight'));
            return true;
        }
        return false;
    });
}

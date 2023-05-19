import removeHover from './removeHover.js';

export default function Board() {
    const boardElement = document.getElementById('board');
    let onClickHook;

    const createCircle = cellID => {
        const html = `
        <svg class="circle" viewBox="0 0 100 100" width="100%">
            <circle
                cx="50"
                cy="50"
                r="35"
            ></circle>
        </svg>
        `;
        document.getElementById(cellID).innerHTML = html;
    };

    const createCross = cellID => {
        const html = `
        <svg class="cross" viewBox="0 0 100 100" width="100%">
            <line x1=20 y1=20 x2=80 y2=80 class="first-line"></line>
            <line x1=80 y1=20 x2=20 y2=80 class="second-line"></line>
        </svg>
        `;
        document.getElementById(cellID).innerHTML = html;
    };

    let currentPlayer = createCross;

    const mouseOver = ({ target }) => {
        let cell;
        if (target.id == 'board') removeHover();
        if (target.classList.contains('cell')) {
            cell = target.id;
            removeHover(cell);
            currentPlayer(cell);
            return;
        }
        cell = checkForCell(target);
        cell && removeHover(cell.id);
    };

    const checkForCell = target => {
        let parent = null;
        if (target.nodeName == 'svg') {
            parent = target.parentNode;
        }
        if (target.nodeName == 'line' || target.nodeName == 'circle') {
            parent = target.parentNode.parentNode;
        }
        return parent;
    };

    const isCellEmpty = element =>
        element.classList.contains('cell') &&
        !element.classList.contains('fixed');

    const handleClick = ({ target }) => {
        if (target.id == 'board') return;

        let cell;

        cell = isCellEmpty(target) ? target : null;

        let parent = checkForCell(target);

        cell = parent && isCellEmpty(parent) ? parent : cell;

        if (!cell) return;

        const shape = currentPlayer == createCircle ? 'circle' : 'cross';
        cell.classList.add(shape, 'fixed');

        currentPlayer(cell.id);

        currentPlayer =
            currentPlayer == createCircle ? createCross : createCircle;

        onClickHook && onClickHook(shape);
    };

    this.setOnClickHook = func => (onClickHook = func);

    this.enable = () => {
        currentPlayer = createCross;
        boardElement.addEventListener('click', handleClick);
        boardElement.addEventListener('touchend', handleClick);
        boardElement.addEventListener('mouseover', mouseOver);
    };

    this.stop = () => {
        boardElement.removeEventListener('click', handleClick);
        boardElement.removeEventListener('touchend', handleClick);
        boardElement.removeEventListener('mouseover', mouseOver);
    };

    this.enable();

    boardElement.addEventListener('mouseover', mouseOver);

    document.getElementById('main').addEventListener('mouseover', e => {
        if (e.target.id == 'main') removeHover();
    });

    document
        .querySelector('.result')
        .addEventListener('mouseover', () => removeHover());

    document
        .querySelector('.play-again')
        .addEventListener('mouseover', () => removeHover());
}

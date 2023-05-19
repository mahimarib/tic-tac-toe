import removeHover from './removeHover.js';

export default function Board() {
    const boardElement = document.getElementById('board');
    let onClickHook;

    const createCircle = cellID => {
        const html = `
        <svg class="circle" viewBox="0 0 100 100">
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
        <svg class="cross" viewBox="0 0 100 100">
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
        let parent;
        if (target.nodeName == 'svg') {
            parent = target.parentNode;
        }
        if (target.nodeName == 'line' || target.nodeName == 'circle') {
            parent = target.parentNode.parentNode;
        }
        return parent;
    };

    const handleClick = ({ target }) => {
        if (target.id == 'board') return;

        const parent = checkForCell(target);

        if (parent && parent.classList.contains('fixed')) return;

        const shape = currentPlayer == createCross ? 'cross' : 'circle';

        parent && parent.classList.add('fixed', `${shape}`);

        currentPlayer =
            currentPlayer == createCross ? createCircle : createCross;

        onClickHook && onClickHook(shape);
    };

    this.setOnClickHook = func => (onClickHook = func);

    this.enable = () => {
        currentPlayer = createCross;
        boardElement.addEventListener('click', handleClick);
        boardElement.addEventListener('mouseover', mouseOver);
    };

    this.stop = () => {
        boardElement.removeEventListener('click', handleClick);
        boardElement.removeEventListener('mouseover', mouseOver);
    };

    boardElement.addEventListener('mouseover', mouseOver);

    this.enable();

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

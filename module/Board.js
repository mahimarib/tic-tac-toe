export default function Board() {
    const boardElement = document.getElementById('board');
    let currentHover;
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

    const removeInner = id => {
        if (!id) return;
        const element = document.getElementById(id);
        if (!element.classList.contains('fixed')) element.innerHTML = '';
    };

    const mouseOver = ({ target }) => {
        console.log(target);
        if (target.id == 'board') removeInner(currentHover);
        if (target.classList.contains('cell')) {
            const hover = target.id;
            if (hover != currentHover) removeInner(currentHover);
            currentPlayer(target.id);
            currentHover = hover;
        }
    };

    const handleClick = ({ target }) => {
        if (target.id == 'board') return;
        let parent;
        if (target.nodeName == 'svg') {
            parent = target.parentNode;
        }
        if (target.nodeName == 'path' || target.nodeName == 'circle') {
            parent = target.parentNode.parentNode;
        }
        if (parent.classList.contains('fixed')) return;

        parent.classList.add(
            'fixed',
            `${currentPlayer == createCross ? 'cross' : 'circle'}`
        );

        currentPlayer =
            currentPlayer == createCross ? createCircle : createCross;

        onClickHook && onClickHook();
    };

    this.setOnClickHook = func => (onClickHook = func);

    boardElement.addEventListener('mouseover', mouseOver);
    boardElement.addEventListener('click', handleClick);

    document.getElementById('main').addEventListener('mouseover', e => {
        if (e.target.id == 'main') removeInner(currentHover);
    });
}

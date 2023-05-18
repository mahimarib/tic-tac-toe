export default function removeHover(exclude = '') {
    const cellsSVG = document.querySelectorAll('.cell:not(.fixed)');
    Array.from(cellsSVG)
        .filter(c => c.id != exclude)
        .forEach(c => (c.innerHTML = ''));
}

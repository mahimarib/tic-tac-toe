export default function removeHover(exclude = '') {
    const cells = document.querySelectorAll('.cell:not(.fixed)');
    Array.from(cells)
        .filter(c => c.id != exclude)
        .forEach(c => (c.innerHTML = ''));
}

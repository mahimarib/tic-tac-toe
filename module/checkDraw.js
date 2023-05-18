export default function checkDraw() {
    return Array.from(document.querySelectorAll('.cell')).every(c =>
        c.classList.contains('fixed')
    );
}

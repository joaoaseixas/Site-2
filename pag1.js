const colors = ['red', 'white', 'pink', 'cyan'];
let index = 0;

function changeColor() {
    index = (index + 1) % colors.length;
    document.querySelectorAll('.bottom-triangle, .circle').forEach(el => {
        el.style.backgroundColor = colors[index];
    });
}

setInterval(changeColor, 2000); // Mudança de cor mais lenta

document.getElementById('nextPage').addEventListener('click', function() {
    window.location.href = 'pag2.html'; // Agora leva para pag2.html
});

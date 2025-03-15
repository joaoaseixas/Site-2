const events = {
    "2024-09-07": {
        title: "Primeiro dia que te vi",
        images: ["/imagens/abelha.png"],
        description: "Primeiro dia em que eu te vi, e ja fiquei apaixonado por você!"
    },
    "2024-11-15": {
        title: "Dia que começei a rezar por você.",
        images: ["/imagens/santissimo.png"],
        description: "Dia que finalmente te achei e começei a rezar por ti!"
    },
    "2024-12-15": {
        title: "Primeira tentativa de conversa",
        images: ["/imagens/Gurapari.png"],
        description: "Guarapari ou Copacabana?? eis a questão"
    },
    "2024-12-25": {
        title: "Tentativa 2",
        images: ["/imagens/papainoel.png"],
        description: "Ainda bem que nunca desisti,sempre soube que era você! "
    },

    // ano novo

    "2025-01-02": {
        title: "Tentativa 3",
        images: ["/imagens/maria.png"],
        description: "O nivel que chegou? eu falando de cruzeiro..."
    },
    "2025-02-15": {
        title: "Tudo ou nada",
        images: ["/imagens/tardeesporte.png"],
        description: "Ou era hoje, ou hoje... ainda bem que existe uber kkkkk."
    },
    "2025-02-24": {
        title: "A reza funcionou",
        images: ["/imagens/amor.png"],
        description: "Você me chamando de amor? aqui eu vi que o que eu rezei, estava acontecendo."
    },
    "2025-03-02": {
        title: "Primeira saida",
        images: ["/imagens/primeiramissa.png","/imagens/primeiraftjuntos.png"],
        description: "Saimos juntos pela primeria vez!!!"
    },
    "2025-03-05": {
        title: "Denovo??",
        images: ["/imagens/segundamissa.png","/imagens/segudaft.png","/imagens/segundamissa02.png"],
        description: "E aqui ja pela segunda vez!!."
    },
    "2025-03-15": {
        title: "Aqui estamos hoje!",
        images: ["imagens/jantar.jpg"],
        description: "Dia que você conheceu minha mãe! (ainda sem foto pq nao tiramos ou nao coloquei ainda)"
    },
    "2025-03-16": {
        title: "Amanhã",
        images: ["imagens/jantar.jpg"],
        description: "E amanhã é o dia de volta, dia que eu vou conhecer sua mamãe.(sem foto pq nao estamos no futuro)"
    },
    
};

let currentDate = new Date();

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const monthYearElement = document.getElementById('monthYear');
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthYearElement.textContent = `${months[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const totalDaysInMonth = lastDayOfMonth.getDate();

    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';

    let currentDay = 1;
    let totalCells = firstDayWeekday + totalDaysInMonth;
    let rows = Math.ceil(totalCells / 7);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 7; col++) {
            let cellIndex = row * 7 + col;
            let dayCell = document.createElement('div');
            dayCell.classList.add('day');

            if (cellIndex < firstDayWeekday) {
                dayCell.classList.add('empty');
            } else if (currentDay <= totalDaysInMonth) {
                dayCell.textContent = currentDay;
                const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

                if (events[dayString]) {
                    dayCell.classList.add('event');
                    dayCell.addEventListener('click', () => expandirDia(dayString));
                }

                currentDay++;
            } else {
                dayCell.classList.add('empty');
            }

            daysContainer.appendChild(dayCell);
        }
    }
}

function expandirDia(date) {
    const evento = events[date];

    if (evento) {
        document.getElementById('eventTitle').textContent = evento.title;
        document.getElementById('eventImage').src = evento.image;
        document.getElementById('eventDescription').textContent = evento.description;

        document.getElementById('expandedEvent').style.display = 'block';
    }
}

function fecharEvento() {
    document.getElementById('expandedEvent').style.display = 'none';
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

let currentImageIndex = 0;

function expandirDia(date) {
    const evento = events[date];

    if (evento) {
        document.getElementById('eventTitle').textContent = evento.title;
        document.getElementById('eventDescription').textContent = evento.description;

        // Resetando o índice para a primeira imagem
        currentImageIndex = 0;
        atualizarImagem(evento);

        document.getElementById('expandedEvent').style.display = 'block';
        
        // Configurar eventos dos botões de navegação
        document.getElementById('prevImage').onclick = () => trocarImagem(-1, evento);
        document.getElementById('nextImage').onclick = () => trocarImagem(1, evento);
    }
}

function trocarImagem(direction, evento) {
    currentImageIndex += direction;

    // Garantir que o índice fique dentro dos limites
    if (currentImageIndex < 0) {
        currentImageIndex = evento.images.length - 1;
    } else if (currentImageIndex >= evento.images.length) {
        currentImageIndex = 0;
    }

    atualizarImagem(evento);
}

function atualizarImagem(evento) {
    document.getElementById('eventImage').src = evento.images[currentImageIndex];
}

function fecharEvento() {
    document.getElementById('expandedEvent').style.display = 'none';
}

// Inicializa o calendário
generateCalendar(currentDate);

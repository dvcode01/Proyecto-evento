// selectores y variables
const formulario = document.querySelector('form')
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDay');
const btnAdd = document.querySelector('#btnAdd');
const eventsContainer = document.querySelector('.event-container');

// aqui van los eventos que se agreguen
let events = [];

let arr = []; //carga la informacion

let json = load();

try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}

events = arr ? [...arr] : [];
renderEvents();

eventsListener();
function eventsListener(){
    formulario.addEventListener('submit', e => {
        e.preventDefault();
        addEvent();
    });
    btnAdd.addEventListener('click', e => {
        e.preventDefault();
        addEvent();
    });
}


function addEvent(){
    if(eventName.value === '' || eventDate.value === ''){
        return;
    }

    if(dateDiff(eventDate.value) < 0){
        return; 
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    };

    events.unshift(newEvent);
    save(JSON.stringify(events));

    eventName.value = '';

    renderEvents();
}

// esta funcion sirve para cuando ya se paso la fecha del evento
function dateDiff(d){
    const targetDate = new Date(d);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24)); 
    return days;
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-texts">días</span>
                </div>
                <div class="event-name">${event.name}</div>
                <div class="event-day">${event.date}</div>
                <div class="actions">
                    <button class="btn-delete" data-id="${event.id}">Eliminar</button>
                </div>
            </div>
        
        `;
    });

    eventsContainer.innerHTML = eventsHTML.join('');
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = btn.getAttribute('data-id');
            events = events.filter(event => event.id != id);
            save(JSON.stringify(events));
            renderEvents();
        });
    });
}

function save(data){
    localStorage.setItem('evento', data);
}

function load(){
    return localStorage.getItem('evento');
}



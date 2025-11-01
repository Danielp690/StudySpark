function seedFromDate(dateStr){
    let h=0; 
    for(let i=0;i<dateStr.length;i++) h=(h<<5)-h+dateStr.charCodeAt(i); 
    return Math.abs(h);
}

function getDailySet(offset=0){
    const today=new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    const dayKey = `${yyyy}-${mm}-${dd}`;
    const seed = seedFromDate(dayKey) + offset;
    const results = [];
    const used = new Set();
    for(let i=0;i<3;i++){
        let idx = (seed + i*37) % QUOTES.length;
        while(used.has(idx)) idx = (idx+1) % QUOTES.length;
        used.add(idx);
        results.push(QUOTES[idx]);
    }
    return results;
}

const cardsEl = document.getElementById('cards'); 
let currentOffset = 0;

function render(){
    cardsEl.innerHTML='';
    const set = getDailySet(currentOffset);
    set.forEach((q,i)=>{
        const card = document.createElement('article');
        card.className='card';
        card.innerHTML = `<div><div class="quote">“${q[0]}”</div><div class="author">${q[1]}</div></div>`;
        cardsEl.appendChild(card);
    });
}

document.getElementById('refreshBtn').addEventListener('click',()=>{
    currentOffset++;
    render();
});

render();

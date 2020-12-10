//night mode...

const modColor = document.querySelector('#night');
const boxColor = document.querySelector('#backgroud');
const imgColor = document.querySelector('#imgNight');
const root     = document.documentElement ;

// variabili

modColor.addEventListener('click', darckBtn);
boxColor.addEventListener('click', darckBtn);

function darckBtn (e) {
        
    if (boxColor.id === 'offDarck' || boxColor.id !== 'onDarck') {

        //animazione bottone
        boxColor.setAttribute('id','onDarck');
        modColor.setAttribute('id','onDarckDiv');
        boxColor.checked= true;

        //stile immagine
        imgColor.style.backgroundImage = "url('src/img/moon.png')";

        //colori variabili
        root.style.setProperty('--bg','#242424')
        root.style.setProperty('--bg1','#1C5EB4')
        root.style.setProperty('--bg1-1','#1C2EB4')
        root.style.setProperty('--bg2','#9CC219')
        root.style.setProperty('--text','#fcfcfc')
    } 
    else {
        //animazioni bottone
        boxColor.setAttribute('id','offDarck');
        modColor.setAttribute('id','offDarckDiv');
        boxColor.checked = false;  

        //stile immagine
        imgColor.style.backgroundImage = "url('src/img/sun.png')";

        //colori variabili
        root.style.setProperty('--bg','#fcfcfc')
        root.style.setProperty('--bg1','#0073CE')
        root.style.setProperty('--bg1-1','#00579e')
        root.style.setProperty('--bg2','#84b524')
        root.style.setProperty('--text','#242424')
    }
    
    
    e.stopPropagation()
    
}
//modalita night fine....

//calcolo watt...

const btnwatt = document.querySelector('#inWatt');
const form    = document.querySelector('form');

form.addEventListener('submit',(event) => event.preventDefault());


btnwatt.addEventListener('click' , calcoloWatt);

function calcoloWatt () {
    let fieldset = document.querySelector('fieldset')
    let volt = document.watt.A.value;
    let ampere = document.watt.V.value;

    if (fieldset.lastChild.nodeName !== 'BUTTON') {fieldset.removeChild(fieldset.lastChild)}
    
    if (!isNaN(volt) && !isNaN(ampere)) {
        document.watt.valoreW.value = volt * ampere;

        let p = document.createElement('p');
        p.textContent = `il risultato è ${volt * ampere} w`;
        p.style.fontWeight = 'bold';
        p.setAttribute('class', 'risultatow');
        fieldset.appendChild(p);

        volt.value = null;
        ampere.value = null;
    }

    if (isNaN(volt) || isNaN(ampere)) {

        let p = document.createElement('p');
        p.textContent = `inserire solo numeri!`;
        p.style.fontWeight = 'bold';
        p.setAttribute('class', 'risultatow');
        fieldset.appendChild(p);

        volt.value = null;
        ampere.value = null;

    }

    btnwatt.blur();
}

//calcolo watt fine...

//calcolo prezzo...
const btncosto = document.querySelector('#inConsumo');

btncosto.addEventListener('click', costo);

function costo () {

    let wat = document.watt.valoreW.value;
    let unitaWat = document.watt.unitaWatt.value;

    let tempo = document.watt.valoreT.value;
    let unitaT = document.watt.unitaTempo.value;

    let costo = document.watt.costo.value;

    let fieldset = document.querySelector('fieldset + h3 + fieldset');

    if (fieldset.lastChild.nodeName !== 'BUTTON') {fieldset.removeChild(fieldset.lastChild)};

    if (!isNaN(wat) && !isNaN(tempo) && !isNaN(costo)) {

        if (unitaWat ==='W') {wat /= 1000; };

        if (unitaT === 'm' && parseInt(tempo) > 1440) {

            let p = document.createElement('p');
            p.textContent = `attenzoione i minuti in un giorno sono massimo 1440!`;
            p.style.fontWeight = 'bold';
            p.setAttribute('class', 'risultatow');
            fieldset.appendChild(p);

            return ;

        }

        if (unitaT ==='m') {tempo = (Math.floor(tempo / 60)) + ((tempo %=60)/100);};

        /*superamento ore*/ 
        if (unitaT === 'h' &&  parseInt(tempo) > 24) {

            let p = document.createElement('p');
            p.textContent = `attenzoione le ore in un giorno sono massimo 24!`;
            p.style.fontWeight = 'bold';
            p.setAttribute('class', 'risultatow');
            fieldset.appendChild(p);

            return ;
        }

        /*superamento minuti*/ 
    
            /*creazione tabella*/ 
            let table    = document.createElement('table');
            let title    = document.createElement('tr');
            let value    = document.createElement('tr');

            let giorno   = document.createElement('th');
            let settimana= document.createElement('th');
            let anno     = document.createElement('th');

            let Ngiorno   = document.createElement('td');
            let Nsettimana= document.createElement('td');
            let Nanno     = document.createElement('td');


            /*contenuto*/
    
            giorno.textContent = 'giorno';
            settimana.textContent= 'settimana';
            anno.textContent= 'anno';
    
            let c = wat * tempo * costo;

            Ngiorno.textContent    = arotondo(c) + ' €';
            Nsettimana.textContent = arotondo(c * 7) +  ' €';
            Nanno.textContent      = arotondo(c * 365) + ' €';



            /*appendchild*/
    
            fieldset.appendChild(table);
            table.appendChild(title);
            table.appendChild(value);

            title.appendChild(giorno);
            title.appendChild(settimana);
            title.appendChild(anno);

            value.appendChild(Ngiorno);
            value.appendChild(Nsettimana);
            value.appendChild(Nanno);
 
    }

    if (isNaN(wat) || isNaN(tempo) || isNaN(costo)) {

        let p = document.createElement('p');
        p.textContent = `inserire solo numeri!`;
        p.style.fontWeight = 'bold';
        p.setAttribute('class', 'risultatow');
        fieldset.appendChild(p);

        return;
    }
    
    wat.value = null;
    tempo.value = null;
    costo.value = null;

    btncosto.blur()
}

function arotondo (numero) {

    let num = numero.toString();

    if (num.indexOf('.') !== '-1') {

        decimo = (num.indexOf('.')+3);

        numDec= num.substr(0,decimo)
        
        return numDec;
    } else {return num;}
}


const input = document.querySelectorAll('input');
const select= document.querySelectorAll('select');

for (i=0 ; i< input.length ; i++)  {
    input[i].addEventListener('change', function () {this.blur()})
}

for (i=0 ; i< select.length ; i++)  {
    select[i].addEventListener('change', function () {this.blur()})
}


 

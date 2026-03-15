document.getElementById('data').innerText = new Date().toISOString();

const btnLt = document.getElementById('btn-lt');
const btnEn = document.getElementById('btn-en');
let dabartineKalba = 'lt'; 

btnEn.addEventListener('click', () => {
    document.body.classList.add('angliskai');
    btnEn.classList.add('aktyvus');
    btnLt.classList.remove('aktyvus');
    dabartineKalba = 'en';
});

btnLt.addEventListener('click', () => {
    document.body.classList.remove('angliskai');
    btnLt.classList.add('aktyvus');
    btnEn.classList.remove('aktyvus');
    dabartineKalba = 'lt';
});

const LINUX_ISLEIDIMAS = new Date("September 17, 1991 00:00:00").getTime();
const FEDORA_PRADZIA = new Date("August 1, 2025 00:00:00").getTime();

function atnaujintiLaikmacius() {
    const dabar = new Date().getTime();

    const dienosZodis = dabartineKalba === 'lt' ? 'd' : 'd';
    const valZodis = dabartineKalba === 'lt' ? 'val' : 'h';
    const minZodis = dabartineKalba === 'lt' ? 'min' : 'm';
    const sekZodis = dabartineKalba === 'lt' ? 's' : 's';

    const dabartiniaiMetai = new Date().getFullYear();
    const metuPabaiga = new Date(`December 31, ${dabartiniaiMetai} 23:59:59`).getTime();
    const likoMetuPab = metuPabaiga - dabar;

    const mgDienos = Math.floor(likoMetuPab / (1000 * 60 * 60 * 24));
    const mgValandos = Math.floor((likoMetuPab % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mgMinutes = Math.floor((likoMetuPab % (1000 * 60 * 60)) / (1000 * 60));
    const mgSekundes = Math.floor((likoMetuPab % (1000 * 60)) / 1000);
    
    document.getElementById('metu-galas').innerText = `${mgDienos}${dienosZodis} ${mgValandos}${valZodis} ${mgMinutes}${minZodis} ${mgSekundes}${sekZodis}`;

    // 2. Nuo Linux išleidimo
    const praejoLinux = dabar - LINUX_ISLEIDIMAS;
    const linDienos = Math.floor(praejoLinux / (1000 * 60 * 60 * 24));
    const linValandos = Math.floor((praejoLinux % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const linMinutes = Math.floor((praejoLinux % (1000 * 60 * 60)) / (1000 * 60));
    const linSekundes = Math.floor((praejoLinux % (1000 * 60)) / 1000);

    document.getElementById('linux-amzius').innerText = `${linDienos.toLocaleString()}${dienosZodis} ${linValandos}${valZodis} ${linMinutes}${minZodis} ${linSekundes}${sekZodis}`;

    const praejoFedora = dabar - FEDORA_PRADZIA;
    const fedDienos = Math.floor(praejoFedora / (1000 * 60 * 60 * 24));
    const fedValandos = Math.floor((praejoFedora % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const fedMinutes = Math.floor((praejoFedora % (1000 * 60 * 60)) / (1000 * 60));
    const fedSekundes = Math.floor((praejoFedora % (1000 * 60)) / 1000);

    if (praejoFedora < 0) {
        document.getElementById('fedora-patirtis').innerText = dabartineKalba === 'lt' ? 'Dar neprasidėjo...' : 'Has not started...';
    } else {
        document.getElementById('fedora-patirtis').innerText = `${fedDienos}${dienosZodis} ${fedValandos}${valZodis} ${fedMinutes}${minZodis} ${fedSekundes}${sekZodis}`;
    }
}

setInterval(atnaujintiLaikmacius, 1000);
atnaujintiLaikmacius();
async function getVisitorCity() {
    const welcomeElement = document.getElementById('welcome-msg');
    welcomeElement.innerText = ""; // Išvalome pradinį tekstą

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const fullText = `Welcome user from ${data.city}! (IP: ${data.ip})`;
        
        // Rašymo efektas
        let i = 0;
        function typeWriter() {
            if (i < fullText.length) {
                welcomeElement.innerText += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Greitis (50ms tarp raidžių)
            }
        }
        typeWriter();

    } catch (error) {
        welcomeElement.innerText = "Welcome, guest!";
    }
}

getVisitorCity();

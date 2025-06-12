const questionsEl = document.querySelector('.questions');
const pseudoForm = document.querySelector('.pseudoForm');
let pseudoInput = document.querySelector('.pseudo');
let passEl = document.querySelector('.pass');
let submitButton = document.querySelector('.submit');
let geekBestScore = localStorage.getItem('geekBestScore');
const accessEl = document.querySelector('.access');
let geekPseudo = localStorage.getItem('geekPseudo');

async function loadQuestions(language) {
    if (!language) return;
    try {
        const response = await fetch(`/data/${language}.json`);
        if (!response.ok) {
            throw new Error('Fichier non trouvé !')
        };
        const questons = await response.json();
        for (let queston of questons) {
            const quest = document.createElement("div");
            quest.innerHTML += queston.question;
            questionsEl.appendChild(quest)
        }
        console.log("Questions récupérés avec succès :", questons)
    } catch (error) {
        console.log("Erreur lors de la récupération des questions :", error.message)
    }
}


function logGeek() {
    if (geekPseudo) {
        accessEl.innerHTML = "[ ACCÈS APPROUVE ✅ ]";
        pseudoInput.classList = "hidden";
        passEl.innerHTML = "> Appuiez sur 'Commencer' pour continuer";
        submitButton.innerHTML = "Continuer"

    }
    pseudoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pseudoForm = e.currentTarget;
        const data = new FormData(pseudoForm);
        let pseudo = data.get('pseudo');
        console.log(pseudo);
        localStorage.setItem('geekPseudo', pseudo.trim());
        localStorage.setItem('geekIsLogged', true);
        localStorage.setItem('geekBestScore', 0);

        if (geekPseudo) {
            document.body.innerHTML = `
    <div style="background-image: url(/public/images/noise-bg.jpg); mix-blend-mode: overlay;" class="min-h-screen w-full absolute -top-5 noise"></div>
    
    <div style="background-image: url(/public/images/noise-bg.jpg); mix-blend-mode: overlay;" class="min-h-screen w-full absolute top-72 noise"></div>
    <div style="margin-left: 5px" class="w-[90%] h-[95vh] border overflow-hidden overflow-y-auto fade transform-gpu">
        <div class="border w-full h-[80px] sticky top-0 bg-neutral-600">
            <div class=" h-full">
                <img class="w-[150px] h-full" src="public/images/logo.png" alt="">
            </div>

            
        </div>

        <div class="flex h-full">
            <div style="padding: 5px" class="flex flex-col border-r gap-5 w-[200px] h-full text-[#00ff00] p-5">
                <li style="padding: 5px" class="border h-[60px] flex items-center justify-between cursor-pointer hover:scale-95">
                    <h3>HTML</h3>
                    <img class="w-[30px]" src="/public/images/keyboard.svg" alt="">
                </li>
                <li style="padding: 5px" class="border h-[60px] flex items-center justify-between cursor-pointer hover:scale-95">
                    <h3>CSS</h3>
                    <img class="w-[40px]" src="/public/images/keyboard.svg" alt="">
                </li>
                <li style="padding: 5px" class="border h-[60px] flex items-center justify-between cursor-pointer hover:scale-95">
                    <h3>JavaScript</h3>
                    <img class="w-[40px]" src="/public/images/keyboard.svg" alt="">
                </li>
                <li style="padding: 5px" class="border h-[60px] flex items-center justify-between cursor-pointer hover:scale-95">
                    <h3>ReactJs</h3>
                    <img class="w-[40px]" src="/public/images/keyboard.svg" alt="">
                </li>
            </div>
        </div>
    </div>`
            localStorage.setItem('geekPseudo', geekPseudo);
            localStorage.setItem('geekBestScore', geekBestScore);
        }
    });
}


const keySound = new Audio('/public/key-press.mp3');

keySound.preload = "auto";


window.addEventListener('keydown', () => {
  keySound.currentTime = 0;
  keySound.play();
});

logGeek();
loadQuestions("js");
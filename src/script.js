const questionsEl = document.querySelector('.questions');
async function loadQuestions(language){
    if (!language) return;
    try {
        const response = await fetch(`/data/${language}.json`);
        if (!response.ok) {
            throw new Error('Fichier non trouvé !')
        };
        const questons = await response.json();
        for (let queston of questons){
            const quest = document.createElement("div");
            quest.innerHTML += queston.question;
            questionsEl.appendChild(quest)
        }
        console.log("Questions récupérés avec succès :",questons)
    } catch (error) {
        console.log("Erreur lors de la récupération des questions :", error.message)
    }
}

loadQuestions("js");
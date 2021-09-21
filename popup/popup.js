const launcher = document.querySelector('.launch-btn');
const iconBtn = document.querySelector('.icon-btn');
let isRecording = "false";

// verifica no chrome storage se está ou não gravando e então muda o texto do botão para "Record" ou "Stop" 
chrome.storage.sync.get("recording", ({ recording }) => {
    isRecording = recording;

    if (isRecording === "true") {
        launcher.innerText = "Stop";
    } else {
        launcher.innerHTML = `Record`;
    }
});

// adiciona um evento de click no botão, onde ao clicar vai verificar se está ou não gravando com base no chrome storage , mudando o texto do botão e o valor no chrome storage
launcher.addEventListener('click', (event) => {
    event.preventDefault();

    if (isRecording === "true") {  // quando estiver gravando(true) vai cair aqui ao clicar, parando de gravar
        launcher.innerText = "Record";
        iconBtn.classList.remove("fas", "fa-stop");
        launcher.classList.remove("stop-btn");
        launcher.classList.add("launch-btn");
        iconBtn.classList.add("fas", "fa-play", "fa-xs");
        isRecording = "false";
        chrome.storage.sync.set({ recording: "false" });

        chrome.storage.sync.get("recording", ({ recording }) => {
            isRecording = recording;
        });

        console.log(isRecording);

    } else {  // começa sem gravar e cai aqui para gravar após clicar em record
        chrome.storage.sync.set({ eventsTeste: [] });
        launcher.innerText = "Stop";
        iconBtn.classList.remove("launch-btn");
        launcher.classList.remove("fas", "fa-play", "fa-xs");
        launcher.classList.add("stop-btn");
        iconBtn.classList.add("fas", "fa-stop");
        isRecording = "true";
        chrome.storage.sync.set({ recording: "true" });

        chrome.storage.sync.get("recording", ({ recording }) => {
            isRecording = recording;
        });

        console.log(isRecording);
    }
});
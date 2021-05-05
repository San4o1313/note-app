
const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => addCard());

let cardLS = JSON.parse(window.localStorage.getItem("cards"));
if(cardLS) {
    cardLS.forEach(txt => addCard(txt));
}

function addCard(txt = '') {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
            <div class="manu">
                <i class="fas fa-window-close"></i>

            </div>  
    `
    document.getElementById("container").append(newCard);

    let main = document.createElement("div");
    main.classList.add("main");
    main.innerHTML = marked(txt);
    main.notMarked = txt;
    newCard.append(main);
    main.addEventListener("click",() => inputMode(main));
    let close = Array.from(document.getElementsByClassName("fa-window-close")).reverse()[0];
    close.addEventListener("click", () => newCard.remove())
}


function inputMode(main) {
    let textArea = document.createElement("textArea");
    textArea.classList.add("main");
    textArea.classList.add("textArea");
    textArea.value = main.notMarked || "";
    main.before(textArea);
    textArea.focus();
    main.remove();

    textArea.addEventListener("focusout", () => {
        main.innerHTML = marked(textArea.value);
        main.notMarked = textArea.value;
        textArea.before(main);
        textArea.remove();
    });
}

window.onbeforeunload = () => {
    let inMemory = [];
    document.querySelectorAll(".main").forEach(elem => inMemory.push(elem.notMarked))
    window.localStorage.setItem("cards", JSON.stringify(inMemory.filter((a)=>a)))
}
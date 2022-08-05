// let defBtns = document.querySelectorAll(".defence-btn")
// defBtns = [...defBtns]

// let attBtns = document.querySelectorAll(".attack-btn")
// attBtns = [...attBtns]

// let cards = document.querySelectorAll(".hero")
// cards = [...cards]

// let enemyCards = []
// let teamCards = []

// for (let i = 0; i < 3; i++) {
//     enemyCards[i] = cards[i]
//     cards.shift()
// }

// enemyCards - враги, cards - союзники

// let enemyAtt = []
// let enemyDef = []


// enemy def - вражеская защита кнопка, def Btns - защита союзников
// enemy att = атака врага, att Btns - атака союзников

// for (let i = 0; i < 3; i++) {
//     enemyDef[i] = defBtns[i]
//     defBtns.shift()
// }

// for (let i = 0; i < 3; i++) {
//     enemyAtt[i] = attBtns[i]
//     attBtns.shift()
// }

// function startGame() {
//     let round = 1
//     enemyCards.map((unit) => {
//         unit.style.opacity = 1
//     })
// }


// startGame()
let modal = document.getElementById("myModal");
let fifa = document.getElementsByClassName("close")[0];
let deathsEnemies = []
let deathsTeammates = []

let target = document.querySelector(".mission")

let enemyCards = document.querySelectorAll(".enemy")
let teamCards = document.querySelectorAll(".teammate")
const enemies = Array.from(enemyCards);
const teammates = Array.from(teamCards);

function randomDamage(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min ; 
}
const audio = document.querySelector("audio")

function setMusic () {
    if (audio.volume == 0) {
        audio.volume = 0.5
    } else {
        audio.volume = 0
    }
}

audio.volume = 0.5

function changeVolume(num) {
    audio.volume = num / 100
}

function hitSound(heroNum) {
    const audio = document.createElement('audio');
    audio.setAttribute("autoplay","true");
    if (heroNum === 0) {
        audio.innerHTML = "<source src=\"audio/archer_sound.mp3\" type=\"audio/mpeg\">"
    } else if (heroNum === 1) {
        audio.innerHTML = "<source src=\"audio/knight_sound.mp3\" type=\"audio/mpeg\">"
    } else {
        audio.innerHTML = "<source src=\"audio/cavalry_sound.mp3\" type=\"audio/mpeg\">"
    }
    document.body.appendChild(audio);
}

function startGame() {
    teammates[0].setAttribute("onclick", "hitHero(`archer`)")
    teammates[1].setAttribute("onclick", "hitHero(`knight`)")
    teammates[2].setAttribute("onclick", "hitHero(`cavalry`)")
    teammates.map((unit) => {
        unit.style.opacity = 1
        unit.classList.add("hero-selection")
    })
}

let damage = 0

function hitHero (hero) {
    if (hero === "archer") {
        const damageArr = [50, 75, 0, 0]
        damage = damageArr[randomDamage(0, 4)]
    } else if (hero === "knight") {
        const damageArr = [25, 50]
        damage = damageArr[randomDamage(0, 2)]
    } else {
        const damageArr = [35, 70, 0]
        damage = damageArr[randomDamage(0, 3)]
    }
    teammates.map((unit) => {
        unit.style.opacity = 0.4
        unit.classList.remove("hero-selection")
    })
    enemies.map((unit) => {
        unit.style.opacity = 1
        unit.style.cursor = "pointer"
        unit.classList.add("hero-selection")
    })
    target.innerHTML = "YOUR TEAM! SELECT TARGET"
    enemies[0].setAttribute("onclick", "hitTarget(0); hitSound(0)")
    enemies[1].setAttribute("onclick", "hitTarget(1); hitSound(1)")
    enemies[2].setAttribute("onclick", "hitTarget(2); hitSound(2)")
}

function hitTarget(person) {
    if (person === 0) {
        let hp = document.querySelector("#enemyArchHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            enemies[0].style.display = "none"
            deathsEnemies.push("archer died")
        }
    } else if (person === 1) {
        let hp = document.querySelector("#enemyKnightHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            enemies[1].style.display = "none"
            deathsEnemies.push("knight died")
        }
    } else {
        let hp = document.querySelector("#enemyCavalHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            enemies[2].style.display = "none"
            deathsEnemies.push("cavalry died")
        }
    }
    teammates.map((unit) => {
        unit.style.opacity = .4
        unit.removeAttribute("onclick")
    })

    enemies.map((unit) => {
        unit.style.cursor = "pointer"
        unit.removeAttribute("onclick")
        unit.classList.remove("hero-selection")
    })
    target.innerHTML = "ENEMY TEAM! SELECT HERO"
    setTimeout(startSecondGame, 100); 
}


function startSecondGame() {
    enemies[0].setAttribute("onclick", "hitHeroSecond(`archer`)")
    enemies[1].setAttribute("onclick", "hitHeroSecond(`knight`)")
    enemies[2].setAttribute("onclick", "hitHeroSecond(`cavalry`)")
    enemies.map((unit) => {
        unit.style.opacity = 1
        unit.style.cursor = "pointer"
        unit.classList.add("hero-selection")
})
    if (deathsEnemies.length === 3) {
        modal.style.display = "flex"
        fifa.onclick = function() {
        modal.style.display = "none"
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none"
            }
        }
    }
}

function hitHeroSecond(hero) {
    if (hero === "archer") {
        const damageArr = [50, 100, 0, 0]
        damage = damageArr[randomDamage(0, 4)]
    } else if (hero === "knight") {
        const damageArr = [25, 50]
        damage = damageArr[randomDamage(0, 2)]
    } else {
        const damageArr = [35, 70, 0]
        damage = damageArr[randomDamage(0, 3)]
    }
    enemies.map((unit) => {
        unit.style.opacity = 0.4
        unit.style.cursor = "default"
        unit.classList.remove("hero-selection")
    })
    teammates.map((unit) => {
        unit.style.opacity = 1
        unit.style.cursor = "pointer"
        unit.classList.add("hero-selection")
    })
    target.innerHTML = "ENEMY TEAM! SELECT TARGET"
    teammates[0].setAttribute("onclick", "hitTargetSecond(0); hitSound(0)")
    teammates[1].setAttribute("onclick", "hitTargetSecond(1); hitSound(1)")
    teammates[2].setAttribute("onclick", "hitTargetSecond(2); hitSound(2)")
}

function hitTargetSecond(person) {
    if (person === 0) {
        let hp = document.querySelector("#teamArchHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            teammates[0].style.display = "none"
            deathsTeammates.push("archer died")
        }
    } else if (person === 1) {
        let hp = document.querySelector("#teamKnightHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            teammates[1].style.display = "none"
            deathsTeammates.push("knight died")
        }
    } else {
        let hp = document.querySelector("#teamCavalHp")
        hp.innerHTML = Number(hp.innerHTML) - damage
        if (hp.innerHTML <= 0 ) {
            hp.innerHTML = 0
            teammates[2].style.display = "none"
            deathsTeammates.push("cavalry died")
        }
    }
    enemies.map((unit) => {
        unit.style.opacity = .4
        unit.style.cursor = "default"
        unit.removeAttribute("onclick")
    })

    teammates.map((unit) => {
        unit.style.cursor = "pointer"
        unit.removeAttribute("onclick")
        unit.classList.remove("hero-selection")
    })
    target.innerHTML = "YOUR TEAM! SELECT HERO"
    if (deathsTeammates.length === 3) {
        modal.style.display = "flex"
        let text = document.getElementById("warning")
        text.innerHTML = "You Lose!"
        fifa.onclick = function() {
        modal.style.display = "none"
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none"
            }
        }
    }
    setTimeout(startGame, 100); 
}


startGame()
let randomColor = document.getElementById("textRandom")
let nametext = document.getElementById("textName")
let arr = ["yellow", "green", "blue", "red", "black", "white", "brown", "purple", "pink"]
let backgroundS = document.querySelector("body")


setInterval(function randomizer() {
        let colorran = (Math.floor(Math.random()*10))
        randomColor.style.color = arr[colorran]
    }, 1500)


    function ranranColor() {
        let colorCode = "";
        let alphabet = "ABCDEF0123456789";
        for (let i = 0; i < 5; i++) {
            colorCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            backgroundS.style.backgroundColor = "#" + colorCode
        }
        let lastname = "The hex code of color is #" + colorCode
        nametext.innerHTML = lastname
}

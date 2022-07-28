hangman = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var word;
    var guess;
    var guesses = [];
    var lives;
    var counter;
    var winorlose = document.getElementById("game");
    var hangscore = document.getElementById("hangsessionscore");
    var hangwinsloses = document.getElementById("gameswonlost");
    var en = 1;
    var aux2 = document.getElementById("hideconfirm");
    var aux = document.getElementById("formtohide");

    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'middle';
            list = document.createElement('button');
            list.setAttribute("type", "button");
            list.setAttribute("class", "btn btn-secondary");
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    };

    result = function () {
        wordHolder = document.getElementById('wordtoguess');
        correct = document.createElement('p');
        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'hiddenword');
            guess = document.createElement('hiddenword');
            guess.setAttribute('class', 'text-success');
            guess.innerHTML = "_";
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    };

    message = function () {
        if (!sessionStorage.getItem("score"))
            sessionStorage.setItem("score", Number(0));
            winorlose.innerHTML = "";
            if (lives < 1) {
                winorlose.setAttribute('class', 'text-danger')
                localStorage.setItem("Loses", Number(Number(localStorage.getItem("Loses")) + 1));
                if (en)
                    winorlose.innerHTML = "Game Over";
                else
                    winorlose.innerHTML = "Ati pierdut";
            }
        if (counter === guesses.length) {
                sessionStorage.setItem("score", Number(Number(sessionStorage.getItem("score")) + 1));
                localStorage.setItem("Wins", Number(Number(localStorage.getItem("Wins")) + 1));
                winorlose.setAttribute('class', 'text-success');
                score();
                if (en)
                    winorlose.innerHTML = "You Win!";
                else
                    winorlose.innerHTML = "Ati castigat !";
            }
        
    };

    var animate = function () {
        var drawMe = lives;
        drawArray[drawMe]();
    };

    canvas = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#FF0000";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    draw = function (pathFromx, pathFromy, pathTox, pathToy) {

        context.moveTo(pathFromx, pathFromy);
        context.lineTo(pathTox, pathToy);
        context.stroke();
    };

    frame = function () {
        draw(0, 150, 150, 150);
        draw(10, 0, 10, 600);
        draw(0, 5, 70, 5);
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head];

    check = function () {
        list.onclick = function () {
            var lettertoguess = this.innerHTML;
            this.setAttribute("class", "btn btn-outline-secondary");
            this.onclick = null;
            if (lives > 0) {
                var j = word.indexOf(lettertoguess);
                if (j === -1) {
                    lives -= 1;
                    message();
                    animate();
                } else {
                    for (var i = 0; i < word.length; i++) {
                        if (word[i] === lettertoguess) {
                            guesses[i].innerHTML = lettertoguess;
                            counter += 1;
                        }
                    }
                    message();
                }
            }
        };
    };

    play = function () {
        if (!localStorage.getItem("Wins"))
            localStorage.setItem("Wins", Number(0));
        if (!localStorage.getItem("Loses"))
            localStorage.setItem("Loses", Number(0));
        if (window.location.href == "file:///Start.html")
            words = ["couple", "corruption", "pest", "ignorant", "appoint", "flex", "clash", "missile", "possible", "seller", "glow", "automatic", "spin", "node", "sail", "transmission", "fair", "finger", "scholar", "convert"];
        else {
            words = ["cuplu", "coruptie", "daunator", "ignorant", "desemna", "contracta", "ciocnire", "racheta", "posibil", "vanzator", "stralucire", "automat", "rotire", "nod", "naviga", "transmisie", "corect", "deget", "savant", "convertit"];
            en = 0;
        }
        word = words[Math.floor(Math.random() * words.length)];
        if (window.location.href == "file:///2man.html") {
            word = document.getElementById("enteredword").value;
            aux.style.visibility = "hidden";
            aux2.style.visibility = "hidden";
        }
        console.log(word);
        buttons();
        guesses = [];
        lives = 6;
        counter = 0;
        result();
        message();
        score();
        canvas();
        frame();
    };

    score = function () {
        hangscore.innerHTML = "Your score in this session is : " + Number(sessionStorage.getItem("score"));
        hangwinsloses.innerHTML = "Wins/Losses overall : " + Number(localStorage.getItem("Wins")) + "/" + Number(localStorage.getItem("Loses"));
    }

    play();

    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        context.clearRect(0, 0, 400, 400);
        if (window.location.href == "file:///2man.html") {
            aux.style.visibility = "visible";
            aux2.style.visibility = "visible";
        } else {
            play();
        }
    };
};

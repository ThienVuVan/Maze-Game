"use strict";
function toggleWinner(winner, mode) {
    if (mode === 1) {
        document.getElementById('one_win').style.display = 'none';
        document.getElementById('two_win').style.display = 'none';
    }
    if (mode === 2) {
        if (winner === 1) {
            document.getElementById('one_win').style.display = 'block';
            document.getElementById('two_win').style.display = 'none';
        }
        if (winner === 2) {
            document.getElementById('one_win').style.display = 'none';
            document.getElementById('two_win').style.display = 'block';
        }
    }
}

window.onload = function () {
    let winner = parseInt(localStorage.getItem('winner'));
    let mode = parseInt(localStorage.getItem('mode'));
    document.querySelector("#menu_over").addEventListener('click', event => {
        window.location.href = "../../html/menu.html";
    });

    document.querySelector("#exit_over").addEventListener('click', event => {
        alert("Thì tự tắt của sổ đi má!");
    });
    toggleWinner(winner, mode);
}


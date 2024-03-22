"use strict";
window.onload = function () {
    document.querySelector("#button_menu").addEventListener('click', event => {
        window.location.href = "../../html/menu.html";
    });
    document.querySelector("#button_exit").addEventListener('click', event => {
        alert("Thì tự tắt của sổ đi má!");
    });
}


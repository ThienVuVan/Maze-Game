"use strict";
window.onload = function () {
    // choose map
    document.querySelector("#button_normal").addEventListener('click', event => {
        localStorage.setItem('initial_max_grid_size', '21');
        localStorage.setItem('level', '1');
        document.querySelector("#button_normal").classList.add("choosed");
        document.querySelector("#button_medium").classList.remove("choosed");
        document.querySelector("#button_hard").classList.remove("choosed");
    });
    document.querySelector("#button_medium").addEventListener('click', event => {
        localStorage.setItem('initial_max_grid_size', '33');
        localStorage.setItem('level', '2');
        document.querySelector("#button_normal").classList.remove("choosed");
        document.querySelector("#button_medium").classList.add("choosed");
        document.querySelector("#button_hard").classList.remove("choosed");
    });
    document.querySelector("#button_hard").addEventListener('click', event => {
        localStorage.setItem('initial_max_grid_size', '51');
        localStorage.setItem('level', '3');
        document.querySelector("#button_normal").classList.remove("choosed");
        document.querySelector("#button_medium").classList.remove("choosed");
        document.querySelector("#button_hard").classList.add("choosed");
    });

    // choose mode
    document.querySelector("#one_person").addEventListener('click', event => {
        localStorage.setItem('mode', '1');
        document.querySelector("#one_person").classList.add("choosed_mode");
        document.querySelector("#two_person").classList.remove("choosed_mode");
    });
    document.querySelector("#two_person").addEventListener('click', event => {
        localStorage.setItem('mode', '2');
        document.querySelector("#one_person").classList.remove("choosed_mode");
        document.querySelector("#two_person").classList.add("choosed_mode");
    });

    // chosse play/back
    document.querySelector("#button_back").addEventListener('click', event => {
        swal("Oops!", "Thì Tắt Broswer Đi Má!", "warning");
    });

    document.querySelector("#button_play").addEventListener('click', event => {
        window.location.href = "../../html/play.html";
    });
}


"use strict";

function init_css_properties_before() {
	document.querySelector("#bar").style.width = menu_width.toString(10) + "px";
	document.querySelector("#visualizer").style.width = (window.innerWidth - menu_width).toString(10) + "px";
	document.querySelector("#visualizer").style.left = menu_width.toString(10) + "px";
}

function init_css_properties_after() {
	document.querySelector("#grid").style.width = (cell_size * grid_size_x).toString(10) + "px";
	document.querySelector("#grid").style.height = (cell_size * grid_size_y).toString(10) + "px";
}

function toggleMode() {
	if (mode === 1) {
		document.getElementById('one_person').style.display = 'block';
		document.getElementById('two_person').style.display = 'none';
	} else if (mode === 2) {
		document.getElementById('one_person').style.display = 'none';
		document.getElementById('two_person').style.display = 'block';
	}
}

function toggleLevel() {
	if (level === 1) {
		document.getElementById('normal').style.display = 'block';
		document.getElementById('medium').style.display = 'none';
		document.getElementById('hard').style.display = 'none';
	} else if (level === 2) {
		document.getElementById('normal').style.display = 'none';
		document.getElementById('medium').style.display = 'block';
		document.getElementById('hard').style.display = 'none';
	} else {
		document.getElementById('normal').style.display = 'none';
		document.getElementById('medium').style.display = 'none';
		document.getElementById('hard').style.display = 'block';
	}
}

function toggleSusgestion() {
	if (mode === 1) {
		document.getElementById('suggestion_one').style.display = 'block';
		document.getElementById('suggestion_two').style.display = 'none';
	}
	if (mode === 2) {
		document.getElementById('suggestion_one').style.display = 'block';
		document.getElementById('suggestion_two').style.display = 'block';
	}
}

function checkSuggestionIsChecked() {
	if (suggestionOneClickedOne == false) {
		document.getElementById('suggestion_one').classList.add("checked");
	}
}

function countdownTimer(duration) {
	let timer = duration * 60;
	let minutes, seconds;

	let interval = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		document.getElementById('time_display').textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			clearInterval(interval);
			// Swal thông báo khi hết thời gian
			tog_end("Time's up! You Lose", "warning")
		}
	}, 1000);
}


window.onload = function () {
	initial_max_grid_size = parseInt(localStorage.getItem('initial_max_grid_size'));
	mode = parseInt(localStorage.getItem('mode'));
	level = parseInt(localStorage.getItem('level'));

	toggleMode();
	toggleLevel();
	toggleSusgestion();

	init_css_properties_before();
	generate_grid();
	init_css_properties_after();

	visualizer_event_listeners();
	maze_generators();

	if (mode === 2) {
		if (start_pos_one[0] == start_pos_two[0] && start_pos_one[1] == start_pos_two[1]) {
			let currentSameCell = place_to_cell(start_pos_two[0], start_pos_two[1]);
			currentSameCell.classList.add("start-same");
		} else {
			let currentSameCell = document.querySelector(".start-same");
			if (currentSameCell) {
				currentSameCell.classList.remove("start-same");
			}
		}
	}

	if (mode === 1) {
		swal("Notices! Thắng Bại Tại Kỹ Năng", "Dùng phím A-S-D-W để di chuyển đến đích, bạn có 3 lượt gợi ý, chú ý thời gian nhé, good luck!", "warning").then(() => {
			if (level === 1) countdownTimer(0.5);
			if (level === 2) countdownTimer(1);
			if (level === 3) countdownTimer(1.5);
		});
	}
	if (mode === 2) {
		swal("Notices! Thắng Bại Tại Kỹ Năng", "Người chơi thứ nhất có màu xanh, người chơi thứ hai có màu đỏ, ban đầu hai bạn đang đứng cùng vị trí xuất phát nên có màu vàng, hãy di chuyển để xem màu của bạn, mỗi bạn có 3 lượt gợi ý, chú ý thời gian nhé, good luck!", "warning").then(() => {
			if (level === 1) countdownTimer(0.5);
			if (level === 2) countdownTimer(1);
			if (level === 3) countdownTimer(1.5);
		});
	}

	document.querySelector("#hider").style.visibility = "hidden";
}
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

	document.querySelector("#hider").style.visibility = "hidden";
}
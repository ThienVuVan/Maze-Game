"use strict";

function set_grid_properties() {
	let ratio = (window.innerWidth - menu_width) / window.innerHeight;

	if (ratio > 1) {
		grid_size_x = initial_max_grid_size;
		grid_size_y = Math.floor(initial_max_grid_size / ratio);

		if (grid_size_y % 2 == 0)
			grid_size_y += 1;

		cell_size = Math.floor((window.innerWidth - menu_width) / initial_max_grid_size);
	}

	else {
		grid_size_x = Math.floor(initial_max_grid_size * ratio);
		grid_size_y = initial_max_grid_size;

		if (grid_size_x % 2 == 0)
			grid_size_x += 1;

		cell_size = Math.floor(window.innerHeight / initial_max_grid_size);
	}
}

function delete_old_grid() {
	let old_grid = document.querySelector("#my_table");
	if (old_grid) {
		old_grid.remove();
	}
}

function generate_grid() {
	delete_old_grid(); // Xóa bảng lưới cũ trước khi tạo mới
	set_grid_properties();

	let table = document.createElement("table");
	table.id = "my_table";

	for (let i = 0; i < grid_size_y; i++) {
		let row = document.createElement("tr");

		for (let j = 0; j < grid_size_x; j++) {
			let cell = document.createElement("td");
			let class_name = "";

			if ((i + j) % 2 == 0)
				class_name = "cell cell_1";
			else
				class_name = "cell cell_2";

			class_name += " x_" + j.toString(10) + " y_" + i.toString(10);
			cell.className = class_name;
			row.appendChild(cell);
		}

		table.appendChild(row);
	}

	document.querySelector("#grid").appendChild(table);
	grid = new Array(grid_size_x).fill(0).map(() => new Array(grid_size_y).fill(0));


	if (mode == 1) {
		start_pos_one = [1, 1]; // Cập nhật vị trí bắt đầu
		target_pos = [grid_size_x - 2, grid_size_y - 2]; // Cập nhật vị trí kết thúc

		// Xác định lại class 'start' và 'target' cho ô bắt đầu và kết thúc
		place_to_cell(1, 1).classList.add("start-one");
		place_to_cell(grid_size_x - 2, grid_size_y - 2).classList.add("target");
	}
	if (mode == 2) {
		start_pos_one = [1, 1]; // Cập nhật vị trí bắt đầu
		start_pos_two = [1, 1];
		target_pos = [grid_size_x - 2, grid_size_y - 2]; // Cập nhật vị trí kết thúc

		// Xác định lại class 'start' và 'target' cho ô bắt đầu và kết thúc
		place_to_cell(1, 1).classList.add("start-one");
		place_to_cell(1, 1).classList.add("start-two");
		place_to_cell(grid_size_x - 2, grid_size_y - 2).classList.add("target");
	}
}

function delete_grid() {
	document.querySelector("#my_table").remove();
}

function cell_to_place(cell) {
	let text_x = cell.classList[2];
	let text_y = cell.classList[3];

	text_x = text_x.split("x_")[1];
	text_y = text_y.split("y_")[1];

	return [parseInt(text_x, 10), parseInt(text_y, 10)];
}

function place_to_cell(x, y) {
	return document.querySelector(".x_" + x.toString(10) + ".y_" + y.toString(10));
}

function add_wall(x, y) {
	let cell = place_to_cell(x, y);

	if (!cell.classList.contains("start") && !cell.classList.contains("target")) {
		grid[x][y] = -1;
		cell.classList.add("cell_wall");
	}
}

function remove_wall(x, y) {
	grid[x][y] = 0;
	place_to_cell(x, y).classList.remove("cell_wall");
}

function clear_grid() {
	if (!grid_clean) {
		for (let i = 0; i < timeouts.length; i++)
			clearTimeout(timeouts[i]);

		timeouts = [];
		clearInterval(my_interval);

		for (let i = 0; i < grid.length; i++)
			for (let j = 0; j < grid[0].length; j++) {
				if (grid[i][j] > -1) {
					remove_wall(i, j);
					place_to_cell(i, j).classList.remove("cell_algo");
					place_to_cell(i, j).classList.remove("cell_path");
				}

				else if (grid[i][j] < -1)
					add_wall(i, j);

				place_to_cell(i, j).classList.remove("visited_cell");
			}

		grid_clean = true;
	}
}

function get_node(x, y) {
	if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length)
		return grid[x][y];

	return -2;
}

function tog_end(text_view, text_icon) {
	swal({
		title: "Game end!",
		text: text_view,
		icon: text_icon,
		buttons: {
			menu: {
				text: "Back To Menu",
				value: "menu",
			},
			again: {
				text: "Play Again",
				value: "again",
			},
			again_harder: {
				text: "Play Harder",
				value: "again_harder",
			}
		},
	})
		.then((value) => {
			switch (value) {
				case "menu":
					window.location.href = "menu.html";
					break;
				case "again":
					window.location.href = "index.html";
					break;
				case "again_harder":
					initial_max_grid_size = parseInt(localStorage.getItem('initial_max_grid_size'));
					level = parseInt(localStorage.getItem('level'));
					if (level === 1) {
						localStorage.setItem('initial_max_grid_size', '33');
						localStorage.setItem('level', '2');
						window.location.href = "index.html";
					}
					if (level === 2) {
						localStorage.setItem('initial_max_grid_size', '51');
						localStorage.setItem('level', '3');
						window.location.href = "index.html";
					}
					if (level === 3) {
						swal("Oops!", "Má chơi mức khó nhất rồi! Có chơi lại thì chơi, không thì mình chia tay!", "warning")
					}
				default:
					break;
			}
		});
}


function event_mode_one(keyCode, mode) {
	let newXone = start_pos_one[0];
	let newYone = start_pos_one[1];

	// Cập nhật vị trí mới của start_pos dựa trên phím asdw
	if (keyCode === 65) { // Nút a
		newXone = Math.max(1, newXone - 1);
	} else if (keyCode === 87) { // Nút w
		newYone = Math.max(1, newYone - 1);
	} else if (keyCode === 68) { // Nút d
		newXone = Math.min(grid_size_x - 2, newXone + 1);
	} else if (keyCode === 83) { // Nút s
		newYone = Math.min(grid_size_y - 2, newYone + 1);
	}

	// Kiểm tra xem vị trí mới có phải là ô tường không
	if (grid[newXone][newYone] !== -1) {
		// Xóa lớp 'start' khỏi ô cũ
		let currentStartCell = place_to_cell(start_pos_one[0], start_pos_one[1]);
		currentStartCell.classList.remove("start-one");

		// Cập nhật start_pos
		start_pos_one = [newXone, newYone];

		// Di chuyển lớp 'start' sang vị trí mới
		let newStartCell = place_to_cell(newXone, newYone);
		newStartCell.classList.add("start-one");

		// Kiểm tra nếu start trùng với target
		if (start_pos_one[0] === target_pos[0] && start_pos_one[1] === target_pos[1]) {
			isWin = true;
			winner = 1;
			localStorage.setItem('winner', '1');
			if (mode == 1) tog_end("You win", "success")
			if (mode == 2) tog_end("Winner is number one", "success");
		}
	}
}

function event_mode_two(keyCode, mode) {
	let newXtwo = start_pos_two[0];
	let newYtwo = start_pos_two[1];

	// Cập nhật vị trí mới của start_pos_two dựa trên phím mũi tên
	if (keyCode === 37) { // Mũi tên trái
		newXtwo = Math.max(1, newXtwo - 1);
	} else if (keyCode === 38) { // Mũi tên lên
		newYtwo = Math.max(1, newYtwo - 1);
	} else if (keyCode === 39) { // Mũi tên phải
		newXtwo = Math.min(grid_size_x - 2, newXtwo + 1);
	} else if (keyCode === 40) { // Mũi tên xuống
		newYtwo = Math.min(grid_size_y - 2, newYtwo + 1);
	}

	// Kiểm tra xem vị trí mới có phải là ô tường không
	if (grid[newXtwo][newYtwo] !== -1) {
		// Xóa lớp 'start' khỏi ô cũ
		let currentStartCell = place_to_cell(start_pos_two[0], start_pos_two[1]);
		currentStartCell.classList.remove("start-two");

		// Cập nhật start_pos_two
		start_pos_two = [newXtwo, newYtwo];

		// Di chuyển lớp 'start' sang vị trí mới
		let newStartCell = place_to_cell(newXtwo, newYtwo);
		newStartCell.classList.add("start-two");

		// Kiểm tra nếu start trùng với target
		if (start_pos_two[0] === target_pos[0] && start_pos_two[1] === target_pos[1]) {
			isWin = true;
			winner = 2;
			localStorage.setItem('winner', '2');
			tog_end("Winner is number two", "success")
		}
	}
}

function event_suggestion_mode_one() {
	document.querySelector("#suggestion_one_one").addEventListener('click', event => {
		if (suggestionOneClickedOne == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return; // Dừng hàm ngay tại đây nếu gợi ý đã được sử dụng
		}
		localStorage.setItem('person_button', '1');
		localStorage.setItem('person_button_number', '1');
		suggestionOneClickedOne = true;
		// change colour
		document.querySelector("#suggestion_one_one").classList.remove("not_chosse");
		document.querySelector("#suggestion_one_one").classList.add("choosed");

		maze_solvers();
	});
	document.querySelector("#suggestion_one_two").addEventListener('click', event => {
		if (suggestionOneClickedTwo == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return; // Dừng hàm ngay tại đây nếu gợi ý đã được sử dụng
		}
		localStorage.setItem('person_button', '1');
		localStorage.setItem('person_button_number', '2');
		if (suggestionOneClickedOne) {
			suggestionOneClickedTwo = true;
			// change colour
			document.querySelector("#suggestion_one_two").classList.remove("not_chosse");
			document.querySelector("#suggestion_one_two").classList.add("choosed");
			maze_solvers();
		} else {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Phải chọn cái gợi ý đầu tiên trước :))", "warning");
		}

	});
	document.querySelector("#suggestion_one_three").addEventListener('click', event => {
		if (suggestionOneClickedThree == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return; // Dừng hàm ngay tại đây nếu gợi ý đã được sử dụng
		}
		localStorage.setItem('person_button', '1');
		localStorage.setItem('person_button_number', '3');
		if (suggestionOneClickedOne && suggestionOneClickedTwo) {
			suggestionOneClickedThree = true;
			// change colour
			document.querySelector("#suggestion_one_three").classList.remove("not_chosse");
			document.querySelector("#suggestion_one_three").classList.add("choosed");
			maze_solvers();
		} else {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Phải chọn cái gợi ý thứ hai trước :))", "warning");
		}
	});
}

function event_suggestion_mode_two() {
	document.querySelector("#suggestion_two_one").addEventListener('click', event => {
		if (suggestionTwoClickedOne == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return;
		}
		localStorage.setItem('person_button', '2');
		localStorage.setItem('person_button_number', '1');
		suggestionTwoClickedOne = true;
		// change colour
		document.querySelector("#suggestion_two_one").classList.remove("not_chosse_two");
		document.querySelector("#suggestion_two_one").classList.add("choosed");
		maze_solvers();
	});
	document.querySelector("#suggestion_two_two").addEventListener('click', event => {
		if (suggestionTwoClickedTwo == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return;
		}
		localStorage.setItem('person_button', '2');
		localStorage.setItem('person_button_number', '2');
		if (suggestionTwoClickedOne) {
			suggestionTwoClickedTwo = true;
			// change colour
			document.querySelector("#suggestion_two_two").classList.remove("not_chosse_two");
			document.querySelector("#suggestion_two_two").classList.add("choosed");
			maze_solvers();
		} else {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Phải chọn cái gợi ý đầu tiên trước :))", "warning");
		}
	});
	document.querySelector("#suggestion_two_three").addEventListener('click', event => {
		if (suggestionTwoClickedThree == true) {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Cái này dùng rồi :))", "warning");
			return;
		}
		localStorage.setItem('person_button', '2');
		localStorage.setItem('person_button_number', '3');
		if (suggestionTwoClickedOne && suggestionTwoClickedTwo) {
			suggestionTwoClickedThree = true;
			// change colour
			document.querySelector("#suggestion_two_three").classList.remove("not_chosse_two");
			document.querySelector("#suggestion_two_three").classList.add("choosed");
			maze_solvers();
		} else {
			swal("Thắng Bại Tại Kỹ Năng", "Má ơi! Phải chọn cái gợi ý thứ hai trước :))", "warning");
		}
	});
}

function visualizer_event_listeners() {

	// listen suggestions
	if (mode == 1) {
		event_suggestion_mode_one();
	}
	if (mode == 2) {
		event_suggestion_mode_one();
		event_suggestion_mode_two();
	}

	// Di chuyển start_pos khi bấm các phím mũi tên
	document.addEventListener('keydown', function (event) {
		let keyCode = event.keyCode;

		if (mode == 1) {
			event_mode_one(keyCode, mode);
		}
		if (mode == 2) {
			event_mode_one(keyCode, mode);
			event_mode_two(keyCode, mode);
		}

		if (start_pos_one[0] == start_pos_two[0] && start_pos_one[1] == start_pos_two[1]) {
			let currentSameCell = place_to_cell(start_pos_two[0], start_pos_two[1]);
			currentSameCell.classList.add("start-same");
		} else {
			let currentSameCell = document.querySelector(".start-same");
			if (currentSameCell) {
				currentSameCell.classList.remove("start-same");
			}
		}
	});
}
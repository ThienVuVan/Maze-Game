"use strict";

function distance(point_1, point_2) {
	return Math.sqrt(Math.pow(point_2[0] - point_1[0], 2) + Math.pow(point_2[1] - point_1[1], 2));
}

function maze_solvers_interval(person_button, person_button_number) {
	my_interval = window.setInterval(function () {
		if (!path) {
			place_to_cell(node_list[node_list_index][0], node_list[node_list_index][1]).classList.add("cell_algo");
			node_list_index++;

			if (node_list_index == node_list.length) {
				if (!found)
					clearInterval(my_interval);

				else {
					path = true;
					if (person_button == 1) {
						place_to_cell(start_pos_one[0], start_pos_one[1]).classList.add("cell_path");
					}
					if (person_button == 2) {
						place_to_cell(start_pos_two[0], start_pos_two[1]).classList.add("cell_path");
					}

				}
			}
		}

		else {
			if (path_list_index == path_list.length) {
				place_to_cell(target_pos[0], target_pos[1]).classList.add("cell_path");
				clearInterval(my_interval);
				return;
			}

			if (person_button_number == 1) {
				// Chỉ hiển thị 1/3 ô đầu tiên
				if (path_list_index < Math.ceil(path_list.length / 3)) {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.add("cell_path");
				} else {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.remove("cell_algo");
				}

				path_list_index++;
			}
			if (person_button_number == 2) {
				// Chỉ hiển thị 1/2 ô đầu tiên
				if (path_list_index < Math.ceil(path_list.length / 2)) {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.add("cell_path");
				} else {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.remove("cell_algo");
				}

				path_list_index++;
			}
			if (person_button_number == 3) {
				// Chỉ hiển thị 1/2 ô đầu tiên
				if (path_list_index < Math.ceil(path_list.length / 1)) {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.add("cell_path");
				} else {
					place_to_cell(path_list[path_list_index][0], path_list[path_list_index][1]).classList.remove("cell_algo");
				}

				path_list_index++;
			}
		}
	}, 10);
}

function a_star(person_button, person_button_number) {
	node_list = [];
	node_list_index = 0;
	path_list = [];
	path_list_index = 0;
	found = false;
	path = false;
	let frontier;
	if (person_button == 1) {
		frontier = [start_pos_one];
	}
	if (person_button == 2) {
		frontier = [start_pos_two];
	}
	let cost_grid = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));

	if (person_button == 1) {
		grid[start_pos_one[0]][start_pos_one[1]] = 1;
	}
	if (person_button == 2) {
		grid[start_pos_two[0]][start_pos_two[1]] = 1;
	}

	do {
		frontier.sort(function (a, b) {
			let a_value = cost_grid[a[0]][a[1]] + distance(a, target_pos) * Math.sqrt(2);
			let b_value = cost_grid[b[0]][b[1]] + distance(b, target_pos) * Math.sqrt(2);
			return a_value - b_value;
		});

		let current_cell = frontier[0];
		let list = get_neighbours(current_cell, 1);
		frontier.splice(0, 1);

		for (let i = 0; i < list.length; i++)
			if (get_node(list[i][0], list[i][1]) == 0) {
				frontier.push(list[i]);
				grid[list[i][0]][list[i][1]] = i + 1;
				cost_grid[list[i][0]][list[i][1]] = cost_grid[current_cell[0]][current_cell[1]] + 1;

				if (list[i][0] == target_pos[0] && list[i][1] == target_pos[1]) {
					found = true;
					break;
				}

				node_list.push(list[i]);
			}
	}
	while (frontier.length > 0 && !found)

	if (found) {
		let current_node = target_pos;

		// check
		if (person_button == 1) {
			while (current_node[0] != start_pos_one[0] || current_node[1] != start_pos_one[1]) {
				switch (grid[current_node[0]][current_node[1]]) {
					case 1: current_node = [current_node[0], current_node[1] + 1]; break;
					case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
					case 3: current_node = [current_node[0], current_node[1] - 1]; break;
					case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
					default: break;
				}

				path_list.push(current_node);
			}
		}

		if (person_button == 2) {
			while (current_node[0] != start_pos_two[0] || current_node[1] != start_pos_two[1]) {
				switch (grid[current_node[0]][current_node[1]]) {
					case 1: current_node = [current_node[0], current_node[1] + 1]; break;
					case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
					case 3: current_node = [current_node[0], current_node[1] - 1]; break;
					case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
					default: break;
				}

				path_list.push(current_node);
			}
		}
		path_list.pop();
		path_list.reverse();
	}

	maze_solvers_interval(person_button, person_button_number);
}

function calculateSteps(start, target) {
	return Math.abs(target[0] - start[0]) + Math.abs(target[1] - start[1]);
}

function removePathAndAlgoClasses() {
	let cells = document.querySelectorAll('.cell_path, .cell_algo');
	cells.forEach(cell => {
		cell.classList.remove('cell_path', 'cell_algo');
	});
}

function maze_solvers() {
	clear_grid();
	grid_clean = false;
	let person_button = parseInt(localStorage.getItem('person_button'));
	let person_button_number = parseInt(localStorage.getItem('person_button_number'));
	// for person one
	if (person_button == 1) {
		if ((Math.abs(start_pos_one[0] - target_pos[0]) == 0 && Math.abs(start_pos_one[1] - target_pos[1]) == 1) ||
			(Math.abs(start_pos_one[0] - target_pos[0]) == 1 && Math.abs(start_pos_one[1] - target_pos[1]) == 0)) {
			place_to_cell(start_pos_one[0], start_pos_one[1]).classList.add("cell_path");
			place_to_cell(target_pos[0], target_pos[1]).classList.add("cell_path");
		}
		else {
			a_star(person_button, person_button_number);
		}
	}
	// for person two
	if (person_button == 2) {
		if ((Math.abs(start_pos_two[0] - target_pos[0]) == 0 && Math.abs(start_pos_two[1] - target_pos[1]) == 1) ||
			(Math.abs(start_pos_two[0] - target_pos[0]) == 1 && Math.abs(start_pos_two[1] - target_pos[1]) == 0)) {
			place_to_cell(start_pos_two[0], start_pos_two[1]).classList.add("cell_path");
			place_to_cell(target_pos[0], target_pos[1]).classList.add("cell_path");
		}
		else {
			a_star(person_button, person_button_number);
		}
	}
	// Remove classes after 5 seconds
	setTimeout(removePathAndAlgoClasses, 4000);
}

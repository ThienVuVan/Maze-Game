"use strict";

function get_neighbours(cell, distance) {
	let up = [cell[0], cell[1] - distance];
	let right = [cell[0] + distance, cell[1]];
	let down = [cell[0], cell[1] + distance];
	let left = [cell[0] - distance, cell[1]];
	return [up, right, down, left];
}

function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function fill() {
	for (let i = 0; i < grid.length; i++)
		for (let j = 0; j < grid[0].length; j++)
			add_wall(i, j);
}

function fill_walls() {
	for (let i = 0; i < grid.length; i++)
		for (let j = 0; j < grid[0].length; j++)
			if (i % 2 == 0 || j % 2 == 0)
				add_wall(i, j);
}

function enclose() {
	for (let i = 0; i < grid.length; i++) {
		add_wall(i, 0);
		add_wall(i, grid[0].length - 1);
	}

	for (let j = 0; j < grid[0].length; j++) {
		add_wall(0, j);
		add_wall(grid.length - 1, j);
	}
}

function prim_algorithm() {
	fill();
	let first_cell = [1, 1];
	remove_wall(first_cell[0], first_cell[1]);
	place_to_cell(first_cell[0], first_cell[1]).classList.add("visited_cell");
	grid[first_cell[0]][first_cell[1]] = 1;
	let wall_list = [];
	let list = get_neighbours(first_cell, 1);

	for (let i = 0; i < list.length; i++)
		if (list[i][0] > 0 && list[i][0] < grid.length - 1 && list[i][1] > 0 && list[i][1] < grid[0].length - 1)
			wall_list.push(list[i]);

	my_interval = window.setInterval(function () {
		while (true) {
			if (wall_list.length == 0) {
				clearInterval(my_interval);
				clear_grid();
				generating = false;
				return;
			}

			let index = random_int(0, wall_list.length);
			let wall = wall_list[index];
			wall_list.splice(index, 1);
			let cell_pair;

			if (wall[0] % 2 == 0)
				cell_pair = [[wall[0] - 1, wall[1]], [wall[0] + 1, wall[1]]];
			else
				cell_pair = [[wall[0], wall[1] - 1], [wall[0], wall[1] + 1]];

			let new_cell;
			let valid = false;

			if (grid[cell_pair[0][0]][cell_pair[0][1]] < 1) {
				new_cell = cell_pair[0];
				valid = true;
			}

			else if (grid[cell_pair[1][0]][cell_pair[1][1]] < 1) {
				new_cell = cell_pair[1];
				valid = true;
			}

			if (valid) {
				remove_wall(wall[0], wall[1]);
				remove_wall(new_cell[0], new_cell[1]);
				place_to_cell(wall[0], wall[1]).classList.add("visited_cell");
				place_to_cell(new_cell[0], new_cell[1]).classList.add("visited_cell");
				grid[new_cell[0]][new_cell[1]] = 1;
				let list = get_neighbours(new_cell, 1);

				for (let i = 0; i < list.length; i++)
					if (list[i][0] > 0 && list[i][0] < grid.length - 1 && list[i][1] > 0 && list[i][1] < grid[0].length - 1)
						wall_list.push(list[i]);

				return;
			}
		}
	}, 28);
}


function maze_generators() {
	generating = true;
	grid_clean = false;
	prim_algorithm();
}


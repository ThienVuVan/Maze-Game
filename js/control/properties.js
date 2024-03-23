"use strict";

// const initial_max_grid_size = 47;
let initial_max_grid_size = 21;
const menu_width = 323;

let cell_size;
let grid_size_x;
let grid_size_y;
let grid;
let clicking = false;
let moving_start = false;
let moving_target = false;
let start_pos_one
let start_pos_two
let target_pos
let grid_clean = true;
let my_interval;

let node_list;
let node_list_index;
let path_list;
let path_list_index;
let found = false;
let path = false;

let generating = false;
let timeouts = [];

let mode = 1;
let level = 1;

let winner = 1;

let suggestionOneClickedOne = false;
let suggestionOneClickedTwo = false;
let suggestionOneClickedThree = false;

let suggestionTwoClickedOne = false;
let suggestionTwoClickedTwo = false;
let suggestionTwoClickedThree = false;


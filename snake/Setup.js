
const canvas = document.getElementById("Graphics");
const width = canvas.width = 1080;
const height = canvas.height = 720;
const context = canvas.getContext("2d");
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);

const dim = 30;
const size = new Vec2(width / dim, height / dim);

// Title change
var title = document.createElement("Title");
title.innerText = "slange";
document.body.appendChild(title);

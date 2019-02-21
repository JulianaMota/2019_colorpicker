"use strict";
let img;
let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let imageData;
let x;
let y;
//img.addEventListener("load", function() {}, false);

//console.log(img);

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");
  console.log(hex);

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}
init();

function init() {
  img = new Image();
  img.src = "cat.jpg";
  console.log(img);
  img.addEventListener("load", draw);
}

function draw() {
  console.log(img);
  ctx.drawImage(img, 0, 0);
  getImageData();
  canvas.addEventListener("mousemove", mouseMoved);
}

function getImageData() {
  const w = canvas.width;
  const h = canvas.height;
  imageData = ctx.getImageData(0, 0, w, h);
  console.log(imageData);
}

function mouseMoved(event) {
  console.log(event);
  x = event.offsetX;
  y = event.offsetY;

  ctx.putImageData(imageData, 0, 0);

  ctx.strokeRect(x - 5, y - 5, 10, 10);
  ctx.strokeStyle = "green";

  //console.log(x, y);
  getpixel(x, y);
}

function getpixel(x, y) {
  console.log(x, y);
}

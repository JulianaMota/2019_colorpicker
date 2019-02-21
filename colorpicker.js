"use strict";
let img;
let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let canvasZoom = document.getElementById("zoomCanvas");
let ctxZoom = canvasZoom.getContext("2d");
let imageData = null;
let zoomData = null;
let x;
let y;
const w = canvas.width;
let data;
let rgb;
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
  //console.log(hex);

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}

init();

function init() {
  img = new Image();
  img.src = "cat.jpg";
  //console.log(img);
  img.addEventListener("load", draw);
}

function draw() {
  //console.log(img);
  ctx.drawImage(img, 0, 0);
  getImageData();
  canvas.addEventListener("mousemove", mouseMoved);
}

function drawzoom() {}

function getImageData() {
  const h = canvas.height;
  imageData = ctx.getImageData(0, 0, w, h);
  data = imageData.data;
  zoomData = ctx.getImageData(0, 0, 10, 10);
  console.log(zoomData);
  //console.log(data);
}

function mouseMoved(event) {
  //console.log(event);
  x = event.offsetX;
  y = event.offsetY;

  ctx.putImageData(imageData, 0, 0);

  ctx.strokeRect(x - 5, y - 5, 10, 10);
  ctx.strokeStyle = "green";

  //console.log(x, y);
  getpixel(x, y);
}

function getpixel(x, y) {
  //console.log(x, y);
  const pixelIndex = 4 * (x + y * w);
  //console.log(pixelIndex);
  let r = data[pixelIndex];
  let g = data[pixelIndex + 1];
  let b = data[pixelIndex + 2];
  //console.log(r, g, b);
  rgb = { r, g, b };
  //console.log(rgb);
  showColorInfo(rgb);
}

"use strict";
let img;
let canvas = document.getElementById("imageCanvas"); // use query selector instead of by id be consistent
let canvasZoom = document.getElementById("zoomCanvas");
let ctxZoom = null;
const ctx = canvas.getContext("2d"); // use const
let imageData = null;
let zoomData = null;
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
  imageData = getImageData(); // change in class
  canvas.addEventListener("mousemove", mouseMoved);
}

function drawzoom() {}

function getImageData() {
  const h = canvas.height;
  imageData = ctx.getImageData(0, 0, w, h);
  data = imageData.data;
  createZoomData();

  return ctx.getImageData(0, 0, w, h);
}

function createZoomData() {
  ctxZoom = canvasZoom.getContext("2d");
  zoomData = ctxZoom.createImageData(10, 10);
  console.log(zoomData);
}

function showZoomData() {
  ctxZoom.putImageData(zoomData, 0, 0);
  console.log(zoomData);
}

function mouseMoved(event) {
  //console.log(event);
  const x = event.offsetX; // console log all event objet to see whet is the best to use
  const y = event.offsetY;

  ctx.putImageData(imageData, 0, 0);

  ctx.strokeRect(x - 5, y - 5, 10, 10);
  ctx.strokeStyle = "green";

  //console.log(x, y);
  getpixel(x, y);
  showZoomData();
  copyPixels(x, y);
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

function copyPixels(startX, startY) {
  console.log(ctx);
  const w = ctxZoom.canvas.width;
  const imageW = ctx.canvas.width;

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const pixelIndex = (x + y * w) * 4;

      const imageX = startX + x;
      const imageY = startY + y;

      const imageIndex = (imageX + imageY * imageW) * 4;

      zoomData.data[pixelIndex + 0] = imageData.data[imageIndex + 0];
      zoomData.data[pixelIndex + 1] = imageData.data[imageIndex + 1];
      zoomData.data[pixelIndex + 2] = imageData.data[imageIndex + 2];
      zoomData.data[pixelIndex + 3] = imageData.data[imageIndex + 3];
    }
  }
}

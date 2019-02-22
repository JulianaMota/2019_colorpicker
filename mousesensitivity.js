"use strict";
let img;
let canvasI = document.getElementById("imageCanvas"); // use query selector instead of by id be consistent
const ctx = canvasI.getContext("2d"); // use const
let imageData = null;
const w = canvasI.width;
const h = canvasI.height;
let maxMOVEMENT = 10;

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
  canvasI.addEventListener("mousemove", mouseMoved);
}

function getImageData() {
  const h = canvasI.height;
  imageData = ctx.getImageData(0, 0, w, h);
  //data = imageData.data;
  //createZoomData();
  console.log(imageData);
  return ctx.getImageData(0, 0, w, h);
}

function mouseMoved(event) {
  //console.log(event);
  ctx.clearRect(0, 0, 500, 600);
  const x = event.offsetX; // console log all event objet to see whet is the best to use
  const y = event.offsetY;

  ctx.putImageData(imageData, 0, 0);

  ctx.strokeStyle = "green";
  const mouseXratio = (x / w) * 2 - 1;
  const mouseYratio = (y / h) * 2 - 1;
  //console.log(mouseXratio, mouseYratio);
  //console.log(x, y);

  let displacementX = maxMOVEMENT * mouseXratio;
  let displacementY = maxMOVEMENT * mouseYratio;
  ctx.strokeRect(
    displacementX,
    displacementY,
    w - maxMOVEMENT,
    h - maxMOVEMENT
  );

  //console.log(displacementX, displacementY);
}

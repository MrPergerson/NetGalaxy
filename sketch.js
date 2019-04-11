

var character;

function preLoad()
{

}

function setup() {
	// make canvas full screen
	createCanvas(windowWidth, windowHeight+300);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight+300);
}


function draw() {
	// adding clear() to the draw loop will clear each frame, erasing object trails
	clear();

	fill(210, 180, 140)
	ellipse(mouseX, mouseY, 100);
}

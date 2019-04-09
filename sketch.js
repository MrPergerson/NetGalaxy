

var character;

function preLoad()
{

}

function setup() {
	// make canvas full screen
	createCanvas(windowWidth, windowHeight);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
	// adding clear() to the draw loop will clear each frame, erasing object trails
	clear();

	fill(210, 180, 140)
	ellipse(mouseX, mouseY, 100);
}


const string = [ "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E" ]
const rows = 6;
const cols = 23;
const grid = [];
let notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const neckGrid = document.getElementById("neck-grid")
const ctx = neckGrid.getContext('2d')
neckGrid.width = 1590;
neckGrid.height = 180;
// Define the width of each fret
const fretWidths = [140,120, 120, 116, 113, 110, 107, 103.5, 100.5, 98, 96, 93, 90.5, 88, 86, 83.5, 81.5, 79.5, 77.5, 75.6, 74, 72.2, 70.5]; 
const cellHeight = neckGrid.height / rows
let newNotes = [];
const fontSize = 18;
const padding = 6;
const borderRadius = 15;
let noteHight;
let noteWidth;
// PRESSING BUTTONS

// get buttons
const buttons = document.querySelectorAll('.setting');

// toggle pressed class
function togglePress(button){
    button.classList.toggle("pressed")
    button.disabled = true;
   
}
// unpress all other buttons
function unpressOther(button){
    button.classList.remove("pressed")
    button.disabled = false;
    
   
}
// use functions for each button
buttons.forEach(button => {
    button.addEventListener('click', (e) =>{
        // remove class from others first  
        buttons.forEach(button =>{
             if(button.classList.contains("pressed")){
                unpressOther(button)
            }
        })  
           
        // press the button
        togglePress(button) 
        
        newNotes = getNotes(button)
        drawScale();
    
    })
})


// SCALE ARRAYS



// Return a selected key array of notes (no flat keys)
function getNotes(button){
   
    //check for flat keys
    if (button.innerHTML.includes('b')){
        notes = [ "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb"]
    } 
    // get value of button and find its position in notes array
    const buttonString = button.innerHTML
    const startingPosition =  notes.indexOf(buttonString)
    // return appropriate newNotes array
     return newNotes =  [
        notes[startingPosition],
        notes[(startingPosition + 2) % notes.length],
        notes[(startingPosition + 4) % notes.length],
        notes[(startingPosition + 5) % notes.length],
        notes[(startingPosition + 7) % notes.length],
        notes[(startingPosition + 9) % notes.length],
        notes[(startingPosition + 11) % notes.length],
    ]
}



const neckNotes = [ ["F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#"],
                    ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#"],
                    ["G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","E","F","F#","G"],
                    ["D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#"],
                    ["A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","G","G#","A"],
                    ["F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#"]]





for(let i = 0; i < rows; i ++){
    grid[i] = neckNotes[i];
    for(let j = 0; j < cols; j++){
        ctx.font = fontSize + 'px Arial'; 
                noteHight = cellHeight * i
                noteWidth = fretWidths[j] * j
                if(j <= 4){
                        noteHight += 22
                        noteWidth += 50
                    } else if( j > 4 && j <= 9) {
                        noteHight += 22
                        noteWidth += 35
                    } else if( j > 9 && j <= 12) {
                        noteHight += 20
                        noteWidth += 20
                    } else if( j > 12 && j <= 16) {
                        noteHight += 20
                        noteWidth += 20
                    }  else if( j > 16 && j <= 19) {
                        noteHight += 20
                        noteWidth += 15
                    } else if( j > 19) {
                        noteHight += 20
                        noteWidth += 10
                    }
    }
    
}

function drawNotes(ctx, text, x, y) {


    // Set font and measure text
    ctx.font = 'bold' + fontSize + 'px Arial'; 
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize; // Approximate height based on font size

    // Calculate the rounded background dimensions
    const bgWidth = textWidth + padding * 2;
    const bgHeight = textHeight + padding * 2;
    const bgX = x - padding;
    const bgY = y - textHeight - padding / 2;

    // Draw the rounded background
   ctx.fillStyle = 'black'
   // Background color
    ctx.beginPath();
    ctx.moveTo(bgX + borderRadius, bgY);
    ctx.lineTo(bgX + bgWidth - borderRadius, bgY);
    ctx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + borderRadius);
    ctx.lineTo(bgX + bgWidth, bgY + bgHeight - borderRadius);
    ctx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - borderRadius, bgY + bgHeight);
    ctx.lineTo(bgX + borderRadius, bgY + bgHeight);
    ctx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - borderRadius);
    ctx.lineTo(bgX, bgY + borderRadius);
    ctx.quadraticCurveTo(bgX, bgY, bgX + borderRadius, bgY);
    ctx.closePath();
    ctx.fill();

    // Draw the text
    ctx.fillStyle = "white"; // Text color
    ctx.fillText(text, x, y);
   
   

}



function drawScale() {
    ctx.clearRect(0, 0, neckGrid.width, neckGrid.height);
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            noteHight = cellHeight * i + (j <= 4 ? 22 : j <= 9 ? 22 : j <= 12 ? 20 : j <= 16 ? 20 : j <= 19 ? 20 : 20);
            noteWidth = fretWidths[j] * j + (j <= 4 ? 50 : j <= 9 ? 35 : j <= 12 ? 20 : j <= 16 ? 20 : j <= 19 ? 15 : 10);

            if (newNotes.includes(grid[i][j])) {
                drawNotes(ctx, grid[i][j], noteWidth, noteHight);
            }
        }
    }}




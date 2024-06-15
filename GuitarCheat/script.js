
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
        getNotes(button)
        
        test(newNotes)
       
    })
})


// SCALE ARRAYS

let notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

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

// Define notes on a neck

const string = [ "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E" ]

const rows = 6;
const cols = 23;

const grid = [];

for(let i = 0; i < rows; i++){
    grid[i] = []
    // E String
    if( i == 0 || i ==5){
        for(let j = 0; j <= cols; j++){
            grid[i][j] = string[j % string.length]
        }
    }// B String
        else if( i == 1){
        for(let j = 0; j <= cols; j++){
            grid[i][j] = string[(j + 7) % string.length]
        }
    }// G String
        else if( i == 2){
        for(let j = 0; j <= cols; j++){
            grid[i][j] = string[(j + 3) % string.length]
        }
    }// D String
        else if( i == 3){
        for(let j = 0; j <= cols; j++){
            grid[i][j] = string[(j + 10) % string.length]
        }
    }// A String
        else if( i == 4){
        for(let j = 0; j <= cols; j++){
            grid[i][j] = string[(j + 5) % string.length]
        }
    }
}


const neckGrid = document.getElementById("neck-grid")
const ctx = neckGrid.getContext('2d')

neckGrid.width = 1590;
neckGrid.height = 180;

// Define the width of each fret
const fretWidths = [140,120, 120, 116, 113, 110, 107, 103.5, 100.5, 98, 96, 93, 90.5, 88, 86, 83.5, 81.5, 79.5, 77.5, 75.6, 74, 72.2, 70.5]; 

const cellHeight = neckGrid.height / rows


function test(){  
    
    ctx.clearRect(0, 0, neckGrid.width, neckGrid.height);
    for(let i = 0; i < rows; i++){
        
    for(let j = 0; j < cols; j++){
        const fontSize = 18;
        // Set the font size for the canvas context
        ctx.font = fontSize + 'px Arial'; 
        let noteHight = cellHeight * i
        let noteWidth = fretWidths[j] * j
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
        if(newNotes.includes(grid[i][j])){
             drawNotes(ctx, grid[i][j], noteWidth, noteHight);   
        }
        // zrobic to samo co wyzej, tylko zeby wykrywal b keys.
             
        }   
    }
}

function drawNotes(ctx, text, x, y) {
    const fontSize = 18
    ctx.font = fontSize + 'px Arial'; 
    ctx.fillText(text, x, y);
    
}


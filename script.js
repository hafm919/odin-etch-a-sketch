const grid=document.querySelector('.grid');
const GRID_DIMENSIONS=500;
const DEFAULT_GRID_SIZE=16;
const DEFAULT_COLOR='black';
const DEFAULT_MODE='color';
const CANVAS_COLOR='white';
let gridBoxDimensions=GRID_DIMENSIONS/DEFAULT_GRID_SIZE;
let penColor=DEFAULT_COLOR;
let mode=DEFAULT_MODE;


let mouseDown=false;
document.body.onmousedown=()=>{mouseDown=true};
document.body.onmouseup=()=>{mouseDown=false};

const buttons=document.querySelectorAll('button');
buttons.forEach((button)=>{button.addEventListener('click',changeMode);})


const colorPicker=document.querySelector(".color-picker");
const colorPickerWrapper=document.querySelector(".color-picker-wrapper");
colorPickerWrapper.style.backgroundColor=colorPicker.value;

colorPicker.addEventListener('input',()=>{
    colorPickerWrapper.style.backgroundColor=colorPicker.value;
    penColor=colorPicker.value;
})

const slider=document.querySelector('.slider');
const sliderDisplay=document.querySelector('.grid-size-display');
slider.value=DEFAULT_GRID_SIZE;
sliderDisplay.textContent=`${slider.value} x ${slider.value}`;

slider.addEventListener('input',()=>{
    sliderDisplay.textContent=`${slider.value} x ${slider.value}`;
});

slider.addEventListener('change',()=>{
    setGridSize(slider.value);
});


function setupGrid(size){
    for(let i=0;i<size*size;i++){
        const gridBox=document.createElement('div');
        // gridSquare.style.border='red 1px solid';
        gridBox.style.width=`${gridBoxDimensions}px`;
        gridBox.style.height=`${gridBoxDimensions}px`;
        gridBox.setAttribute('id',`${i}`);
        gridBox.addEventListener('mouseover',changeBoxColour);
        gridBox.addEventListener('mousedown', changeBoxColour);
        grid.append(gridBox);
    }

}

function setGridSize(newSize){
    gridBoxDimensions=GRID_DIMENSIONS/newSize
    grid.innerHTML='';
    setupGrid(newSize)
}

function changeBoxColour(e){
    if (e.type === 'mouseover' && !mouseDown) return;
    switch(mode){
        case 'eraser':
            console.log('eraser');
            e.target.style.backgroundColor=CANVAS_COLOR;
            break;
        case 'color':
            console.log('color');
            e.target.style.backgroundColor=penColor;
            break;
        case 'rainbow':
            console.log('rainbow');
            let red=Math.ceil(Math.random()*255);
            let green=Math.ceil(Math.random()*255);
            let blue=Math.ceil(Math.random()*255);
            e.target.style.backgroundColor=`rgb(${red},${blue},${green})`;

    }
    console.log(e.target.id);
    

}

function changeMode(e){
    buttons.forEach((button)=>{
        button.classList.remove('active');
    })
    e.target.classList.add('active');
    mode=e.target.id;
}


window.onload= ()=>{
    setupGrid(DEFAULT_GRID_SIZE);
}


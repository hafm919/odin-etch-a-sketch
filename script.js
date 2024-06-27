const grid=document.querySelector('.grid');
const GRID_DIMENSIONS=500;
const DEFAULT_GRID_SIZE=16;
const DEFAULT_COLOR='black';
let gridBoxDimensions=GRID_DIMENSIONS/DEFAULT_GRID_SIZE;
let penColor=DEFAULT_COLOR;


let mouseDown=false;
document.body.addEventListener('mousedown',()=>{
    mouseDown=true;
    console.log('down');
});

document.body.addEventListener('mouseup',()=>{
    mouseDown=false;
    console.log('up');
})

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



const button=document.querySelector('button');
button.onclick=()=>{
    setGridSize(100);
}


function setupGrid(size){
    for(let i=0;i<size*size;i++){
        const gridBox=document.createElement('div');
        // gridSquare.style.border='red 1px solid';
        gridBox.style.width=`${gridBoxDimensions}px`;
        gridBox.style.height=`${gridBoxDimensions}px`;
        gridBox.setAttribute('id',`${i}`);
        gridBox.addEventListener('mousemove',changeBoxColour);
        grid.append(gridBox);
    }

}

function setGridSize(newSize){
    gridBoxDimensions=GRID_DIMENSIONS/newSize
    grid.innerHTML='';
    setupGrid(newSize)
}

function changeBoxColour(e){
    if (!mouseDown){
        return;
    }
    console.log(e.target.id);
    e.target.style.backgroundColor=penColor;

}


window.onload= ()=>{
    setupGrid(DEFAULT_GRID_SIZE);
}


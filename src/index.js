import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import colors from './components/colors';
import styles from './components/staticStyles';
import passphrases from './components/passphrases';

let pos1;
let pos2;
let pos3;
let pos4;

let bckg;
let id;
let top;
let arr;
let stat;
let countIdle;

let randImage;
let finalItem;

ReactDOM.render(<App />, document.getElementById('root'));

// functionality

for (let i = 0; i < colors.length; i++) {

    dragElement(document.getElementById(i));
}

function dragElement(dinamic) {

    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;
    
    dinamic.ontouchstart = dragMouseDown
    dinamic.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX || e.touches[0].clientX;
        pos4 = e.clientY || e.touches[0].clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.ontouchmove = elementDrag;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        if (e.type === "touchmove") {
            e.preventDefault();

            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;

        } else {

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        }

        // validation
        bckg = dinamic.style.backgroundColor;
        id = dinamic.id;
        top = styles[id].top;
        top = top.slice(0, -2);
        top = parseInt(top);
        arr = styles[id].border.split(" ");
        stat = "stat" + id;

        if (e.type === "touchmove") {

            if (e.touches[0].pageX > 20 && e.touches[0].pageX < 80
                &&e.touches[0].pageY > (top + 20)
                && e.touches[0].pageY < (top + 80) && bckg === arr[2]) {
                
                dinamic.style.display = "none";
                document.getElementById(stat).style.backgroundColor = bckg;
                dinamic.classList.remove("idle"); 
            }
        } else {

            if (e.pageX > 20 && e.pageX < 80
                && e.pageY > (top + 20) && e.pageY < (top + 80)
                && bckg === arr[2]) {
                
                dinamic.style.display = "none";
                document.getElementById(stat).style.backgroundColor = bckg;
                dinamic.classList.remove("idle");
            }
        }
        
        // set the element's new position:
        dinamic.style.top = (dinamic.offsetTop - pos2) + "px";
        dinamic.style.left = (dinamic.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;

        countIdle = document.querySelectorAll(".idle").length;
    
        if (countIdle < 1) {
            
            addFinal();
        }
    }
}

function addFinal() {

    const body = document.querySelector("body");
    let randInt = Math.floor(Math.random() * passphrases.length);
    let searchedForText = passphrases[randInt];

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.onload = addImage;
    
    unsplashRequest.open('GET'
    ,`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization'
    ,'Client-ID 8d31976bb71fc7a1452fd114361c8924e8a9654132f588434fc23eebff6238c8');
    unsplashRequest.send();

    function addImage() {

        const data = JSON.parse(this.responseText);

        if (data && data.results && data.results[0]) {
            let randNumber = Math.floor(Math.random() * data.results.length);
            randImage = data.results[randNumber];
        }

        finalItem = `
        <div id="final">
            <img src='${randImage.urls.regular}' alt='${searchedForText}'>
            <button onClick="document.location.reload(true)">
                Play Again!
            </button>
        <div>
        `;

        body.innerHTML = finalItem;
        // body.style.backgroundImage = `url(${randImage.urls.regular})`;
    };

    navigator.vibrate([100, 100, 100, 100, 150, 200, 100, 100, 100, 100, 150, 200
        ,150, 100, 120, 100, 200, 200, 150, 100, 120, 100, 200, 200,
    ]);
};

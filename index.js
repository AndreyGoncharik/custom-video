const playerArea = document.querySelector('.video-player');
const playSvg = document.querySelector('.play-hover');
const poster = document.querySelector('.poster');
const player = document.querySelector('.viewer');
const controlPanel = document.querySelector('.player__controls');
const progress = playerArea.querySelector('.progress');
const progressBar = playerArea.querySelector('.progress__filled');
const volumeSlider = document.querySelector('.player__slider');
const playButton = document.querySelector('.play__button');
const muteButton = document.querySelector('.mute');
let countTime; // setInterval(() => updateProgress()
let leftTime;
const left = document.querySelector('.left');
const dur = document.querySelector('.duration');
//player.currentTime = (
//document.querySelector{'[-webkit-media-controls]'}
//console.log(duratin);

playSvg.addEventListener(('click'), () => {    
    poster.classList.toggle('hidden');    
    playSvg.classList.add('hidden');
    setTimeout(() => poster.remove(), 700);
    //togglePlay();
    player.play();
    controlPanel.classList.add('active');
    mouseOver();
    mouseOut();
    rangeSlider();
    playButtonToggle();
    const duration = Math.round(player.duration);
    
    
    if (player.paused) {
        
    } else {
        countTime = setInterval(() => updateProgress(), 50);
        leftTime = setInterval(() => {
            Math.round(player.currentTime) < 10 ? left.innerHTML = '0' + Math.round(player.currentTime) : left.innerHTML = Math.round(player.currentTime), 1000;
        });
        dur.innerHTML = duration;
        
        //setInterval(() => updateProgress(), 50);
        //playButtonToggle();
    }
    
});
player.addEventListener(('click'), () => {
    playButtonToggle();
    if (player.paused) {
        console.log('play')
        playSvg.classList.toggle('hidden');
        
    } else {
        console.log('paus')
        playSvg.classList.toggle('hidden');
        playSvg.addEventListener('mouseover', () => {
        controlPanel.classList.add('active'); 
        clearInterval(countTime);
        clearInterval(leftTime);
                  
    });

    }
});

function rangeSlider(vol) {
    vol = volumeSlider.value;
    volumeSlider.style.background = `linear-gradient(to right, #fff 0%, #fff ${vol}%, #00000080 ${vol}%, #00000080 100%)`; 
    player.volume = vol / 100;
    console.log(player.volume);
    player.volume > 0.01 ? muteButton.classList.remove('mute-off') : muteButton.classList.add('mute-off');      
}
volumeSlider.addEventListener('input', rangeSlider);

function playButtonToggle() { playButton.classList.toggle('pause'); }
playButton.addEventListener(('click'), () => {
    playButtonToggle();
    togglePlay();
    playSvg.classList.toggle('hidden');
});

function muteButtonToggle() {
    muteButton.classList.toggle('mute-off');
    //rangeSlider
}
muteButton.addEventListener(('click'), () => {
    let tempVol = volumeSlider.value;
    muteButtonToggle();
    if (muteButton.classList.contains('mute-off')) {
        localStorage.setItem('vol', volumeSlider.value);
        console.log(tempVol, 'temp');
        volumeSlider.value = 0;
        player.volume = 0;        
        volumeSlider.style.background = `linear-gradient(to right, #fff 0%, #fff 0%, #00000080 0%, #00000080 100%)`; 
        
    }
    if (!muteButton.classList.contains('mute-off')){
        if (localStorage.getItem('vol')) {
            localStorage.getItem('vol') ? tempVol = localStorage.getItem('vol') : tempVol = 10;
        }
        player.volume = tempVol / 100;
        volumeSlider.value = tempVol;
        // let vol = 0.10;
        //console.log('no mute', player.volume)
        volumeSlider.style.background = `linear-gradient(to right, #fff 0%, #fff ${tempVol}%, #00000080 ${tempVol}%, #00000080 100%)`; 
        
        
    }  
       
});

progress.addEventListener(('click'), (e) => {
    let click = e.target.getBoundingClientRect();
    let newProgress = 100 * e.offsetX / click.width;
    player.currentTime = (player.duration * Math.floor(newProgress) / 100);
});

function mouseOver() {
    playerArea.addEventListener('mouseover', () => {
        controlPanel.classList.add('active');               
    });
}
function mouseOut() {
    playerArea.addEventListener('mouseout', () => {
        // controlPanel.classList.remove('active');     
    });
}

function updateProgress() {
    const progress = player.currentTime / player.duration;
    progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + '%';
  
}
function togglePlay() {
    player[player.paused ? 'play' : 'pause']();
    if (player.paused) {
        console.log('paus')
    } else {
        console.log('play')
    }
    //player[player.paused ? console.log('paus') : console.log('play')]();
        // playSvg.classList.remove('hidden') :
        // playSvg.classList.add('hidden')
    
}
console.log('hello!');

console.log("Welcome to Hotify!");

//Intialize the variables
let songIndex = 0; //
let audioElement = new Audio("1.mp3");
let play = document.getElementById('play');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterPlaySongName = document.getElementById('masterPlaySongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Heat Waves - Glass Animal", fieldPath:"1.mp3", coverPath:"heatWaves.jpg"},
    {songName : "I ain't worried - OneRepublic", fieldPath:"2.mp3", coverPath:"TopGunMav.jpg"},
    {songName : "Kids - OneRepublic", fieldPath:"3.mp3", coverPath:"Kids.png"},
    {songName : "KillerFromNorthSide - Korhell", fieldPath:"4.mp3", coverPath:"KillerFromNorthSide.jpeg"},
    {songName : "The Nights - Avicii", fieldPath:"5.mp3", coverPath:"The_Nights.jpg"},
]

// Shows song details
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

// Handle play/pause 
play.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//Playing with icons on list of 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`${songIndex+1}.mp3`;
        masterPlaySongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    })
})

// next functionality
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex=0;
    } else{
        songIndex +=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterPlaySongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
})

// previous functionality
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    } else{
        songIndex -=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    // SongName sync
    masterPlaySongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
})

class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/hihat-acoustic01.wav";
    this.kickSound = document.querySelector(".kick-sound");
    this.snareSound = document.querySelector(".snare-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.sliderTempo = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionValue);
    switch (selectionName) {
      case "kick-select":
        this.kickSound.src = selectionValue;
        break;
      case "snare-select":
        this.snareSound.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatSound.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 0;
          break;
        case "1":
          this.snareSound.volume = 0;
          break;
        case "2":
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickSound.volume = 1;
          break;
        case "1":
          this.snareSound.volume = 1;
          break;
        case "2":
          this.hihatSound.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.sliderTempo.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.sliderTempo.addEventListener("change", function () {
  drumKit.updateTempo();
});

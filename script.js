var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")

}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwHSKGfy-Ls21Kwe45uaL9dNOfBi9D4rx72rJ15xCS5q9l8F1pqpG2qVtiqRhapgXKl/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            msg.innerHTML = "Message sent successfully!"
            setTimeout(function() {
                msg.innerHTML = ""
            }, 1000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})

// class Heart extends mojs.CustomShape {
//     getShape() {
//         return '<path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z"></path>';
//     }
// }
// mojs.addShape('heart', Heart);

// const CIRCLE_RADIUS = 20;
// const RADIUS = 32;
// const circle = new mojs.Shape({
//     left: 0,
//     top: 0,
//     stroke: '#FF9C00',
//     strokeWidth: {
//         [2 * CIRCLE_RADIUS]: 0
//     },
//     fill: 'none',
//     scale: {
//         0: 1
//     },
//     radius: CIRCLE_RADIUS,
//     duration: 400,
//     easing: 'cubic.out'
// });

// const burst = new mojs.Burst({
//     left: 0,
//     top: 0,
//     radius: {
//         4: RADIUS
//     },
//     angle: 45,
//     count: 14,
//     timeline: {
//         delay: 300
//     },
//     children: {
//         radius: 2.5,
//         fill: '#FD7932',
//         scale: {
//             1: 0,
//             easing: 'quad.in'
//         },
//         pathScale: [.8, null],
//         degreeShift: [13, null],
//         duration: [500, 700],
//         easing: 'quint.out'
//     }
// });

// const heart = new mojs.Shape({
//     left: 0,
//     top: 2,
//     shape: 'heart',
//     fill: '#E5214A',
//     scale: {
//         0: 1
//     },
//     easing: 'elastic.out',
//     duration: 1600,
//     delay: 300,
//     radius: 11
// });

// document.addEventListener('click', function(e) {
//     const coords = {
//         x: e.pageX,
//         y: e.pageY
//     };
//     burst
//         .tune(coords)
//         .replay();

//     circle
//         .tune(coords)
//         .replay();

//     heart
//         .tune(coords)
//         .replay();

// });


var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var transforms = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
var transformProperty = getSupportedPropertyName(transforms);
var snowflakes = [];
var browserWidth;
var browserHeight;
var numberOfSnowflakes = 50;
var resetPosition = false;

function setup() {
    window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
    window.addEventListener("resize", setResetFlag, false)
}
setup();

function getSupportedPropertyName(b) {
    for (var a = 0; a < b.length; a++) {
        if (typeof document.body.style[b[a]] != "undefined") {
            return b[a]
        }
    }
    return null
}

function Snowflake(b, a, d, e, c) {
    this.element = b;
    this.radius = a;
    this.speed = d;
    this.xPos = e;
    this.yPos = c;
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;
    this.element.style.opacity = 0.5 + Math.random();
    this.element.style.fontSize = 4 + Math.random() * 30 + "px"
}
Snowflake.prototype.update = function() {
    this.counter += this.speed / 5000;
    this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
    setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos));
    if (this.yPos > browserHeight) {
        this.yPos = -50
    }
};

function setTranslate3DTransform(a, c, b) {
    var d = "translate3d(" + c + "px, " + b + "px, 0)";
    a.style[transformProperty] = d
}

function generateSnowflakes() {
    var b = document.querySelector(".snowflake");
    var h = b.parentNode;
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;
    for (var d = 0; d < numberOfSnowflakes; d++) {
        var j = b.cloneNode(true);
        h.appendChild(j);
        var e = getPosition(50, browserWidth);
        var a = getPosition(50, browserHeight);
        var c = 5 + Math.random() * 40;
        var g = 4 + Math.random() * 10;
        var f = new Snowflake(j, g, c, e, a);
        snowflakes.push(f)
    }
    h.removeChild(b);
    moveSnowflakes()
}

function moveSnowflakes() {
    for (var b = 0; b < snowflakes.length; b++) {
        var a = snowflakes[b];
        a.update()
    }
    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;
        for (var b = 0; b < snowflakes.length; b++) {
            var a = snowflakes[b];
            a.xPos = getPosition(50, browserWidth);
            a.yPos = getPosition(50, browserHeight)
        }
        resetPosition = false
    }
    requestAnimationFrame(moveSnowflakes)
}

function getPosition(b, a) {
    return Math.round(-1 * b + Math.random() * (a + 2 * b))
}

function setResetFlag(a) {
    resetPosition = true
};

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 20) {
            document.getElementById("scrollToTop").style.display = "block";
        } else {
            document.getElementById("scrollToTop").style.display = "none";
        }
    });

    document.getElementById("scrollToTop").addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

function updateClock() {
    let now = new Date(new Date().getTime() + 7 * 3600 * 1000);
    let hours = now.getUTCHours();
    let minutes = now.getUTCMinutes();
    let seconds = now.getUTCSeconds();
    let period = 'AM';

    if (hours >= 12) {
        period = 'PM';
    }
    if (hours > 12) {
        hours -= 12;
    }
    if (hours === 0) {
        hours = 12;
    }

    // Format minutes and seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Get the current date
    let dateString = now.toLocaleDateString('en-US', {
        weekday: 'long', // Full name of the weekday
        year: 'numeric',
        month: 'long', // Full name of the month
        day: 'numeric'
    });

    let timeString = `${hours}:${minutes}:${seconds} ${period}`;
    document.getElementById('clock').innerHTML = `${dateString} - ${timeString}`;
}

// Initialize clock and set interval for updating
document.addEventListener('DOMContentLoaded', (event) => {
    updateClock();
    setInterval(updateClock, 1000);
});
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Reset all slides and dots
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    // Set the active slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

setInterval(nextSlide, 3000);
showSlide(currentSlideIndex);
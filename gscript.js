var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var speedControl = document.getElementById('speedControl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [];
var numStars = 1000;
//parseInt used for converting string to integer as the value of speedControl is string by default i have to change it to integer so i can change the speed of the stars
//we can also use +speedControl.value to convert string to integer
var speed = +speedControl.value;

for (var i = 0; i < numStars; i++) {
    stars.push({
        //Math.random() - 0.5 is used to get random number between -0.5 and 0.5
        //y positive downwards isliye h kyunki screen ke top left corner pe 0,0 h and bottom right corner pe canvas.width,canvas.height h
        //basically middle point pe 0,0 hoga right side pe positive values hongi and left side pe negative values hongi
        //toh wo random values negative and positive dono sides pe aayengi isliye humne -0.5 kiya
        x: (Math.random() -0.5) * canvas.width,
        y: (Math.random() -0.5) * canvas.height,
        // between 0 and canvas width
        z: Math.random() * canvas.width
    });
}
function animate() {
    //first we have to fill the entire canvas with black color
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    //stars with white color
    c.fillStyle = 'white';
    for (var i= 0;i <stars.length; i++) {
        var star = stars[i];
        //jo jitna dur uski z value utni kam hogi and k value utna zyada hoga
        var k = canvas.width / star.z;
        //suppose k ~ 0 then we have to move the star to the center of the screen so we have to add canvas.width/2 to x and canvas.height/2 to y
        var x =star.x*k+canvas.width/2;
        var y =star.y*k + canvas.height/2;
        var r = 1*k;
        c.beginPath();
        c.arc(x, y, r, 0, 2 * Math.PI);
        c.fill();

        star.z -= speed;
        if (star.z <= 0) {
            //ab jo star screen se bhaar chala gya h waapis bhi toh aana chahiye isliye uski z value ko canvas.width se initialize kardiya
            star.z = canvas.width;
            star.x =(Math.random() -0.5) *canvas.width;
            star.y= (Math.random() -0.5) * canvas.height;
        }
    }

    requestAnimationFrame(animate);
}

speedControl.addEventListener('input',()=> {
    speed = parseInt(speedControl.value);
    
});

animate();
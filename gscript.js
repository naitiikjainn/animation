var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var speedControl = document.getElementById('speedControl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [];
var numStars = 1000;
var speed = parseInt(speedControl.value);

for (var i = 0; i < numStars; i++) {
    stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width
    });
}

function animate() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];

        var k = canvas.width / star.z;
        var x = star.x * k + canvas.width / 2;
        var y = star.y * k + canvas.height / 2;
        var r = 1 * k;

        c.beginPath();
        c.arc(x, y, r, 0, 2 * Math.PI);
        c.fill();

        star.z -= speed;
        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = (Math.random() - 0.5) * canvas.width;
            star.y = (Math.random() - 0.5) * canvas.height;
        }
    }

    requestAnimationFrame(animate);
}

speedControl.addEventListener('input', function() {
    speed = parseInt(speedControl.value);
    
});

animate();
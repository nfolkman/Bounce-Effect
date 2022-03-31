//set up canvas
// gives access to drawing properties

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//innerWidth refers to the viewport
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to generate a random RGB color

function randomRGB() {
   return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

class Ball {
  
   constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
   }

   draw() {
      ctx.beginPath(); // start drawing shape
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   update() {
      // reverse if ball will hit left side
      if((this.x + this.size) >= width) {
         this.velX = -(this.velX)
      }

      // reverse if ball will hit right side
      if((this.x - this.size) <= 0) {
         this.velX = -(this.velX)
      }
      // reverse if ball will hit top
      if((this.y + this.size) >= height) {
         this.velY= -(this.velY)
      }
      // reverse if ball will hit bottom
      if((this.y - this.size) <= 0) {
         this.velY = - (this.velY);
      }
      // simulate motion of ball
      this.x += this.velX;
      this.y += this.velY;
   }

   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball)) {
            const dx = this.x - ball.x
            const dy = this.y - ball.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < this.size + ball.size) {
               ball.color = this.ball = randomRGB()
            }
         }
      }
   }
}

const balls = []

while ( balls.length < 15 ) {
   const size = random(10,20);
   const ball = new Ball (
      random(0 + size , width - size), // x-coordinate
      random(0 + size , height - size), // y-coordinate
      random(1,7), // vel-X
      random(1,7), // vel-Y
      randomRGB(), // Assign color
      size
   )

   balls.push(ball)
}

function loop() {
ctx.fillStyle = 'rgba(0,0,0,0.25)';
ctx.fillRect(0,0,width, height);

   for (const ball of balls) {
      ball.draw()
      ball.update()
      ball.collisionDetect()
   }

   requestAnimationFrame(loop)
}

loop();

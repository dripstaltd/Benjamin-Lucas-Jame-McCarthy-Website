'use strict';

export const state = {};

export const data1 = [1, 3, 5, 7, 8];

export const profile = {
  title: 'Profile',
  profile: `A versatile technically minded professional currently looking to gain a role within Front End or App Development utilising a depth of transferable skills and knowledge. Possesses a strong background in producing code using vanilla JavaScript including new ES6+ features, as well as experience of using many CMS platforms.  Demonstratable understanding of responsive design principles, application design, planning, creating and coding web pages, using both technical and creative skills to produce novel websites that fit customer requirements. A trusted leader with a dependable reputation for developing teams necessary to successfully manage and deliver complex projects. Driving continuous improvements by identifying and solving problems innovatively with the capacity to deal simultaneously with multiple projects and competing priorities; now looking to apply the sum of my experiences and passion to a new role.`,
};

export const person = {
  name: 'Benjamin McCarthy',
  location: 'Suury TW1 5',
  contact: '0749',
  email: 'lukack@gmail.com',
  github: 'https://github.com/dripstaltd',
};

export const expertise = {
  title: 'Technical Expertise',
  lang: {
    title: 'Programming Languages',
    langText:
      'X/HTML & CSS, SCSS (SASS), JavaScript - AJAX, understanding of OOP, ASYNC, (ES6+), closures. Some experience with C#, flutter (.dart), liquid, C++, PHP, SQL, Node.js, Express MongoDb',
  },
  software: {
    title: 'Software',
    softwareText:
      'Visual Studio Code, 10+ years with Adobe Suite, Photoshop, Lightroom and Illustrator. XD, Visual Studio 2019 C# Windows .Net applications as well as using Eagle for idea planning, Postman for API testing, Coggle for functionality',
  },
  cmsPlatforms: {
    title: 'CMS Platforms/Ecommerce',
    cmsText:
      'Understanding of taxonomy, site structure, image optimization, other SEO / online marketing techniques and strategies. Shopify: first content management system I, WordPress: (cPanel, phpMyAdmin)',
  },
  recources: {
    title: 'Resources/Subscriptions',
    recourcesText:
      'Ability to learn and self develop skills using: MDN - W3Schools - Udemy - Adobe-suite Full - Envato Elements - HostGatorShared - developer Mozilla, Codepen – GitHub',
  },
};
//-|--------------------------------------------|
// export const scoreEl = +document.querySelector('#score').textContent;
export const scoreEl = document.querySelector('#score');
export const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
export const x = window.innerWidth / 2;
export const y = window.innerHeight / 2;
const menu = document.querySelector('.game__modal');
const gameBtn = document.querySelector('#gameBtn');
const viewScore = () => document.querySelector('.score').classList.toggle('hidden');
// Store Projectiles
const projectiles = [];
// Store Enemies
const enemies = [];
// Store particles
const particles = [];
// Speed Multiplier
const enemySpeed = 0.7;
// Particle slow down
const friction = 0.99;
// Count missed projectiles

// Deductions / Skill bonus

// Score

console.log(scoreEl);
//-|--------------------------------------------|
class CircleProperties {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
//-|--------------------------------------------|
export class Player extends CircleProperties {
  //BUG When resizing window
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }
}

//-|--------------------------------------------|
export class Projectile extends CircleProperties {
  // Creating a projectile
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
//-|--------------------------------------------|
class Enemy extends CircleProperties {
  // Creating a projectile
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
//-|--------------------------------------------|
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}
//-|--------------------------------------------|
function toggleMenu() {
  menu.classList.toggle('hidden');
}
// Create player
const player = new Player(x, y, 10, 'white');

let gameState = 0;

// Spawn Enemies
function spawnEnemies() {
  setInterval(() => {
    // TODO MAKE RESPONSIVE FOR MOBILE OR SMALL WINDOW SIZES
    const radius = Math.random() * (40 - 7) + 7;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : window.innerWidth + radius;
      y = Math.random() * window.innerHeight;
    } else {
      x = Math.random() * window.innerWidth;
      y = Math.random() < 0.5 ? 0 - radius : window.innerHeight + radius;
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(window.innerHeight / 2 - y, window.innerWidth / 2 - x);
    // Calculating velocities
    const velocity = {
      x: Math.cos(angle) * enemySpeed,
      y: Math.sin(angle) * enemySpeed,
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}
// ------------------------------------------------------------

let animationId;
let score = 0;
// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);
  // background
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  // c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  player.draw();
  particles.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
  projectiles.forEach((projectile, i) => {
    projectile.update();
    // Remove projectiles from edge of screen
    if (
      projectile.x - projectile.radius <= 0 ||
      projectile.x - projectile.radius > window.innerWidth ||
      projectile.y - projectile.radius < 0 ||
      projectile.y - projectile.radius > window.innerHeight
    ) {
      setTimeout(() => {
        projectiles.splice(i, 1);
      }, 0);
    }
  });
  // ---------------------------------------------------------------------
  // enemies Loop
  enemies.forEach((enemy, i) => {
    enemy.update();
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // end Game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      // GAMEOVER MENU
      console.log('GAME OVER');
      gameBtn.textContent = 'Finish';
      document.querySelector('#finalScore').textContent = `${score} Points`;
      toggleMenu();
      viewScore();
      gameBtn.addEventListener('click', function () {
        canvas.classList.add('hidden');
        toggleMenu();
      });
    }
    projectiles.forEach((projectile, index) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      const removeEnemy = () => {
        // removing enemy
        setTimeout(() => {
          enemies.splice(i, 1);
          projectiles.splice(index, 1);
        }, 0);
      };
      // enemy and projectiles touch
      if (dist - enemy.radius - projectile.radius < 1) {
        // Remove one count from projectileCounter
        // increase score
        score += 2;
        scoreEl.textContent = `${score}`;
        console.log(score);
        // creating particle explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(projectile.x, projectile.y, Math.random() * 3, enemy.color, {
              x: (Math.random() - 0.5) * (Math.random() * 6),
              y: Math.random() - 0.5 * (Math.random() * 6),
            })
          );
        }

        if (enemy.radius - 10 > 10) {
          gsap.to(enemy, { radius: enemy.radius - 10 });
          setTimeout(() => {
            projectiles.splice(index, 1);
          }, 0);
          // removeEnemy();
        } else {
          removeEnemy();
        }
      }
    });
  });
}
// -----------------------------------------------
// Rendering a projectile on mouse click event at the location of mouse
addEventListener('click', e => {
  // Distance from click to center
  const angle = Math.atan2(e.clientY - y, e.clientX - x);
  // Calculating velocities
  const velocity = {
    x: Math.cos(angle) * 2,
    y: Math.sin(angle) * 2,
  };
  projectiles.push(new Projectile(x, y, 4, 'white', velocity));
});
//------------------------------------------------

// Projectile physics
// 1) Get the angle
// 2) put in atan2(x,y)** = angle
// 3) x and y velocities from sig(angle) cos(angle)
viewScore();
gameBtn.addEventListener('click', function () {
  viewScore();
  gameState = 1;
  toggleMenu();
  startStop();
});

const startStop = () => {
  if (gameState === 1) {
    animate();
    spawnEnemies();
  }
};

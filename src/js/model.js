'use strict';

export const state = {};

export const data1 = [1, 3, 5, 7, 8];

export const profile = {
  title: 'Profile',
  profile: `A versatile technically minded professional currently looking to gain a role within Front End or App Development utilising a depth of transferable skills and knowledge. Possesses a strong background in producing code using vanilla JavaScript including new ES6+ features, as well as experience of using many CMS platforms.  Demonstratable understanding of responsive design principles, application design, planning, creating and coding web pages, using both technical and creative skills to produce novel websites that fit customer requirements. A trusted leader with a dependable reputation for developing teams necessary to successfully manage and deliver complex projects. Driving continuous improvements by identifying and solving problems innovatively with the capacity to deal simultaneously with multiple projects and competing priorities; now looking to apply the sum of my experiences and passion to a new role.`,
};

export const person = {
  name: 'Benjamin L J McCarthy',
  location: 'Sunbury TW16 5HT',
  contact: '07496649975',
  email: 'lukasmacuk@gmail.com',
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
export const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
export const x = window.innerWidth / 2;
export const y = window.innerHeight / 2;

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
export class Player extends CircleProperties {
  //BUG When resizing window
  constructor(x, y, radius, color) {
    super(x, y, radius, color);
  }
}

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

// =============================================
// Create player
const player = new Player(x, y, 30, 'purple');
// Store Projectiles
const projectiles = [];
// Store Enemies
const enemies = [];
// Spawn Enemies
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 5) + 5;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : window.innerWidth + radius;
      y = Math.random() * window.innerHeight;
    } else {
      x = Math.random() * window.innerWidth;
      y = Math.random() < 0.5 ? 0 - radius : window.innerHeight + radius;
    }

    const color = 'green';
    const angle = Math.atan2(window.innerHeight / 2 - y, window.innerWidth / 2 - x);
    // Calculating velocities
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}
// ---------------------------------------------------------------------
let animationId;
// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  player.draw();
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
  // Enemies Loop
  enemies.forEach((enemy, i) => {
    enemy.update();
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius < 1) {
      console.log('GAME OVER');
      cancelAnimationFrame(animationId);
      canvas.style.backgroundColor = 'red';
    }
    projectiles.forEach((projectile, index) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      //> Enemy and Projectiles touch
      if (dist - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          enemies.splice(i, 1);
          projectiles.splice(index, 1);
        }, 0);
      }
    });
  });
}
// ---------------------------------------------------------------------
// Rendering a projectile on mouse click event at the location of mouse
addEventListener('click', e => {
  console.log(projectiles);
  // Distance from click to center
  const angle = Math.atan2(e.clientY - y, e.clientX - x);
  // Calculating velocities
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(new Projectile(x, y, 5, 'red', velocity));
});
// ---------------------------------------------------------------------
animate();
spawnEnemies();
// Projectile physics
// 1) Get the angle
// 2) put in atan2(x,y)** = angle
// 3) x and y velocities from sig(angle) cos(angle)

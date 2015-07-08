// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.speed = Math.floor(Math.random()* 500) + 50;

    if (this.x === 0) {
        this.y = Math.floor(Math.random()*2.9)*83 + 41.5;
    };
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    if (this.x > 505) {
        this.x = 0;
        this.y = Math.floor(Math.random()*3)*83 + 41.5;
        this.speed = Math.floor(Math.random()* 500) + 50;
    };

    var collision = Math.abs(player.x - this.x);
    if (collision < 50.5 && this.y === player.y) {
        player.x = 202;
        player.y = 373.5;
        player.score -= 1;
        alert("You should look both ways before crossing the street!" + player.score);
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 202;
    this.y = 373.5;
    this.score = 0;
}

Player.prototype.update = function(dt) {}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPress) {
    switch(keyPress) {
        case "left": if (this.x > 0) {
            this.x -= 101;
        }
        break;
        case "right": if (this.x < 404) {
            this.x += 101;
        }
        break;
        case "up":
                if (this.y > 124) {
                    this.y -=83;
                }
        else if (this.y < 42) {
            this.score += 1;
            alert("You Made It!... I just hope you know how to swim." + this.score);
            this.x = 202;
            this.y = 373.5;
        }
        break;
        case "down":
                if (this.y < 373) {
                    this.y += 83;
                }
        break;
    }
}

var Key = function() {
    this.sprite = "images/Key.png";
    this.x = 100;
    this.y = 41.5;
}

 Key.prototype.update = function(dt) {

    var grabKey = Math.abs(player.x - this.x);
    if (grabKey < 50.5 && this.y === player.y) {
        alert("You've got the key! Now open the gate!");
    };
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
var createEnemy = function(size) {
    hordeSize = size;
    for (i = 0; i < hordeSize; i++) {
        allEnemies.push(new Enemy);
    };
}(3);

player = new Player;

key = new Key;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

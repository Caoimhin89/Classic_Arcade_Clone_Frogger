// Enemies our player must avoid
var Enemy = function() {

    /*MY COMMENTS: For this code I relied on "A Smarter Way to Learn JavaScript"
    by Mark Meyers for the Math.floor and Math.random idea*/

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.speed = Math.floor(Math.random()* 500) + 50;

    if (this.x === 0) {
        this.y = Math.floor(Math.random()*4)*83 + 207.5;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    if (this.x > 707) {
        this.x = 0;
        this.y = Math.floor(Math.random()*4)*83 + 207.5;
        this.speed = Math.floor(Math.random()* 500) + 50;
    }

/*MY COMMENTS: For the Math.abs idea, I utilized this website: http://www.w3schools.com/jsref/jsref_abs.asp*/

    var collision = Math.abs(player.x - this.x);
    if (collision < 50.5 && this.y === player.y) {
        player.x = 202;
        player.y = 539.5;
        player.score -= 1;
        alert("You should look both ways before crossing the street!" + "Score: " + player.score);
    }
    var missionFail = Math.abs(damsel.x - this.x);
    if (missionFail < 50.5 && this.y === damsel.y && player.x === damsel.x && damsel.y === player.y + 83) {
        damsel.x = 303;
        damsel.y = 539.5;
        player.score -= 1;
        alert("Oooo, that looks like it hurt. Go back and save her!" + " Score: " + player.score)
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 202;
    this.y = 539.5;
    this.score = 0;
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* MY COMMENTS: Here I used a switch statement, which I learned from "A Smarter Way
to Learn JavaScript" by Mark Meyers. It saved me from some coding repetition and the
logic of this code was pretty straight forward and uncomplicated, so I didn't really
need the if statements to keep my thoughts straight. */

Player.prototype.handleInput = function(keyPress) {
    switch(keyPress) {
        case "left": if (this.x > 0) {
            this.x -= 101;
        }
        break;
        case "right": if (this.x < 606) {
            this.x += 101;
        }
        break;
        case "up":
                if (this.y > 41.5) {
                    this.y -=83;
                }
        else if (this.y < 83) {
            this.score += 1;
            alert("You Made It!" + " Score: " + this.score);
            this.x = 202;
            this.y = 539.5;
        }
        break;
        case "down":
                if (this.y < 539.5) {
                    this.y += 83;
                }
        break;
    }
};

var Key = function() {
    this.sprite = 'images/Key.png';
    this.x = 539.5;
    this.y = 207.5;
};

Key.prototype.update = function(dt) {
    var grabKey = Math.abs(player.x - this.x);
    if (grabKey < 50.5 && this.y === player.y) {
        alert("You've got the key! Great.. But you don't have a car! Run!");
        this.x = player.x;
        this.y += 83;
    }
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var damsel = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 207.5;
    this.y = 373.5;
};

/*MY COMMENTS: I'm not sure if it would be better to do a switch statement here,
but in this case I chose to use repeated if statements because the logic was easier
for me to follow. */

damsel.prototype.update = function(dt) {
    var rescueAttempt = Math.abs(player.x - this.x);
    if (rescueAttempt < 50.5 && this.y === player.y) {
        alert("Damsel in Distress: 'Please, help me cross the street!'");
        this.x = player.x;
        this.y = player.y + 83;
    }
    if (this.x === player.x && this.y === player.y) {
        this.y += 83;
    }
    if (this.x === player.x && this.y === player.y + 166) {
        this.y -= 83;
    }
    if (this.x === player.x && this.y === player.y - 166) {
        this.y += 83;
    }
    if (this.x === player.x - 101 && this.y === player.y + 83) {
        this.x += 101;
    }
    if (this.x === player.x + 101 && this.y === player.y + 83) {
        this.x -= 101;
    }
    if (this.y < 166) {
            player.score += 1;
            alert("You saved the damsel in distress!" + " Score: " + player.score);
            this.x = 207.5;
            this.y = 373.5;
    }
};

damsel.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
var createEnemy = function(size) {
    hordeSize = size;
    for (i = 0; i < hordeSize; i++) {
        allEnemies.push(new Enemy);
    }
}(3);

player = new Player;
key = new Key;
damsel = new damsel;


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
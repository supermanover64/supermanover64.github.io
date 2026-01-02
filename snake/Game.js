// Enum
var Dir = { Up: 1000, Down: 1001, Left: 1002, Right: 1003 };

class Game
{
    constructor()
    {
        this.board = new Board();
        this.snake = new Snake(1, 1);
        this.apple = new Apple(this.snake);
        this.dir = Dir.Right
        this.prevDir = 0;

        this.hasStarted = false;
        this.isOver = false;

        this.notStartedText = new cText("Press enter to start", "#FFFFFF",
            new Vec2((width / 2) - 160, (height / 2) - 15), 30);
        this.gameOverText = new cText("Game Over\nPress 'R' to restart", "#FFFFFF",
            new Vec2((width / 2) - 120, (height / 2)), 30);
        this.scoreText = new cText(this.snake.getLength() - 1, "#FFFFFF",
            new Vec2(10, 30), 30);
    }
    restart()
    {
        this.board = new Board();
        this.snake = new Snake(1, 1);
        this.apple = new Apple(this.snake);
        this.dir = Dir.Right
        this.hasStarted = false;
        this.isOver = false;
    }
    update()
    {
        if (this.hasStarted && !this.isOver)
        {
            if (elapsedTime >= interval)
            {
                this.snake.move(this.dir);
                this.prevDir = this.dir;
                elapsedTime = 0;
                if (this.snake.intersects(this.apple))
                {
                    this.snake.grow();
                    this.apple.respawn(this.snake);
                    this.scoreText.setString(this.snake.getLength() - 1);
                }
                if (this.snake.intersectWithBody() || !this.board.inBounds(this.snake))
                {
                    this.isOver = true;
                }
            }
        }
    }
    clear(dc)
    {
        dc.fillStyle = "rgb(0, 0, 0)";
        dc.fillRect(0, 0, width, height);
    }
    display(dc)
    {
        if (game.hasStarted && !game.isOver)
        {
            this.apple.draw(dc);
            this.snake.draw(dc);
            this.scoreText.draw(dc);
        }
        else if (!game.hasStarted)
        {
            this.notStartedText.draw(dc);
        }
        else if (game.hasStarted && game.isOver)
        {
            this.gameOverText.draw(dc);
        }
    }
}

var elapsedTime = 0;
var interval = 150;

var game = new Game();

var tickInterval = 10;
    
setInterval(onTick, tickInterval);

function onTick()
{
    elapsedTime += tickInterval;
    game.update();
    game.clear(context);
    game.display(context);
}

document.addEventListener("keydown", function(event) {
    var key = event.key;
    var keyCode = event.keyCode;
    
    // Controlled with WASD and arrow keys
    if ((key == 'w' || keyCode == 38) &&
        (game.prevDir != Dir.Down || game.snake.getLength() <= 2))
    {
        game.dir = Dir.Up;
    }
    else if ((key == 's' || keyCode == 40) &&
    (game.prevDir != Dir.Up || game.snake.getLength() <= 2))
    {
        game.dir = Dir.Down;
    }
    else if ((key == 'a' || keyCode == 37) &&
    (game.prevDir != Dir.Right || game.snake.getLength() <= 2))
    {
        game.dir = Dir.Left;
    }
    else if ((key == 'd' || keyCode == 39) &&
    (game.prevDir != Dir.Left || game.snake.getLength() <= 2))
    {
        game.dir = Dir.Right;
    }

    // Keycode for enter/return
    if (keyCode == 13)
    {
        game.hasStarted = true;
    }
    if (key == 'r')
    {
        game.restart();
    }
})

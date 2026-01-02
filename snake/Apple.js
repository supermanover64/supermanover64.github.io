class Apple
{
    constructor(in_snake)
    {
        this.shape = new RectangleShape()
        this.shape.setColor("rgb(0, 0, 255)");
        this.shape.setSize(new Vec2(dim, dim));
        this.shape.setOutlineThickness(-1);
        this.shape.setOutlineColor("#000000");

        if (in_snake instanceof Snake)
        {
            this.respawn(in_snake);
        }
        else
        {
            alert("Wrong input in function:\n   Apple::constructor(taking class 'Snake')")
            this.shape.setPos(new Vec2(3 * dim, 3 * dim));
        }
    }
    respawn(in_snake)
    {
        // Debugging code
        /*alert("Respawning apple");
        var str = "Snake X: " + snake.getHeadX() + ", Y: " + snake.getHeadY() + "\n" +
            "Apple X: " + this.shape.getPos().x + ", Y: " + this.shape.getPos().y;
        alert(str);*/
        if (in_snake instanceof Snake)
        {
            var newX, newY;
            do
            {
                newX = (rand() % size.x) * dim;
                newY = (rand() % size.y) * dim;
            } while (in_snake.inTile(newX, newY));

            this.shape.setPos(new Vec2(newX, newY));
        }
        else
        {
            alert("Wrong input in function:\n   Apple::respawn(taking class 'Snake')")
        }
    }
    draw(in_dc)
    {
        this.shape.draw(in_dc);
    }
}
class Snake
{
    constructor(in_gridX, in_gridY)
    {
        var pos = new Vec2(in_gridX * dim, in_gridY * dim);

        this.headColor = "rgb(0, 255, 0)";
        this.bodyColor = "rgb(255, 0, 0)";

        this.segments = new Array();

        this.segments.push(new RectangleShape(pos, new Vec2(dim, dim), this.headColor, -1, "#000000"));
    }

    inTile(in_x, in_y)
    {
        for (var i = 0; i < this.segments.length; i++)
        {
            var other = new RectangleShape();
            // Color not necessary for checks, just for the function
            other.init(new Vec2(in_x, in_y), new Vec2(dim, dim), this.bodyColor);

            var segment = this.segments[i];
            
            // Debugging code
            /*var sameType = (typeof(other) == typeof(segment));

            var str = ("X: " + segment.getPos().x + ", Y: " + segment.getPos().y + "\n" +
                "X: " + other.getPos().x + ", Y: " + other.getPos().y + "\n" + sameType);
            alert(str);*/

            if (other.intersects(segment))
            {
                return true;
            }
        }
        return false;
    }
    intersectWithBody()
    {
        for (var i = 1; i < this.segments.length; i++)
        {
            var other = new RectangleShape();
            var pos = this.segments[0].getPos();
            // Color not necessary for checks, just for the function
            other.init(pos, new Vec2(dim, dim), this.bodyColor);

            var segment = this.segments[i];
            
            // Debugging code
            /*var sameType = (typeof(other) == typeof(segment));

            var str = ("X: " + segment.getPos().x + ", Y: " + segment.getPos().y + "\n" +
                "X: " + other.getPos().x + ", Y: " + other.getPos().y + "\n" + sameType);
            alert(str);*/

            if (other.intersects(segment))
            {
                return true;
            }
        }
        return false;
    }
    intersects(in_apple)
    {
        if (in_apple.shape instanceof RectangleShape)
        {
            var head = this.segments[0]

            // Debugging code
            /*var str = "X: " + head.getPos().x + ", Y: " + head.getPos().y + "\n" +
                "X: " + other.shape.getPos()x + ", Y: " + other.shape.getPos().y;
            alert(str);*/

            if (head.intersects(in_apple.shape))
            {
                return true;
            }
        }
        else
        {
            alert("Wrong input in function:\n   Snake::intersects(taking class 'Apple')")
        }
        return false;
    }

    move(in_dir)
    {
        for (var i = this.segments.length - 1; i > 0; i--)
        {
            this.follow(i);
        }
        this.segments[0].move(this.movement(in_dir));
    }
    movement(in_dir)
    {
        switch (in_dir)
        {
            case Dir.Up:
                return new Vec2(0, -1 * dim);
            case Dir.Down:
                return new Vec2(0, 1 * dim);
            case Dir.Left:
                return new Vec2(-1 * dim, 0);
            case Dir.Right:
                return new Vec2(1 * dim, 0);
        }
        return new Vec2(0, 0);
    }
    follow(in_index)
    {
        var currSegment = this.segments[in_index];
        const nextSegment = this.segments[in_index - 1];
        currSegment.setPos(nextSegment.getPos());
    }
    grow()
    {
        var rect = new RectangleShape();
        var x = -1000;
        var y = -1000;
        rect.init(new Vec2(x, y), new Vec2(dim, dim), this.bodyColor, -1, "#000000");
        this.segments.push(rect);
    }

    getHeadX()
    {
        return this.segments[0].getPos().x;
    }
    getHeadY()
    {
        return this.segments[0].getPos().y;
    }
    getLength()
    {
        return this.segments.length;
    }

    draw(in_dc)
    {
        for (var i = this.segments.length - 1; i >= 0; i--)
        {
            this.segments[i].draw(in_dc);
        }
    }
}

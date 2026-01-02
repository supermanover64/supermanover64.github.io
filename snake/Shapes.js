var outlineState = { Larger: 10000, Smaller: 10001, Same: 10002 };

class RectangleShape
{
    constructor(in_pos = new Vec2(0, 0), in_size = new Vec2(0, 0), in_color = "#000000", in_outlineThickness = 0, in_outlineColor = "#000000")
    {
        this.init(in_pos, in_size, in_color, in_outlineThickness, in_outlineColor)
    }

    init(in_pos = new Vec2(0, 0), in_size = new Vec2(0, 0), in_color = "#000000", in_outlineThickness = 0, in_outlineColor = "#000000")
    {
        this.pos = in_pos;
        this.size = in_size;
        this.color = in_color;
        this.outlineColor = in_outlineColor;
        this.setOutlineThickness(in_outlineThickness)
    }

    setPos(in_pos)
    {
        this.pos.x = in_pos.x;
        this.pos.y = in_pos.y;
        this.updateOutline();
    }
    setSize(in_size)
    {
        this.size.x = in_size.x;
        this.size.y = in_size.y;
        this.updateOutline();
    }
    setColor(in_color)
    {
        this.color = in_color;
    }

    setOutlineThickness(in_outlineThickness)
    {
        this.outlineThickness = in_outlineThickness;

        this.updateOutline();

        if (this.outlineWidth > this.size.x && this.outlineHeight > this.size.y)
            this.state = outlineState.Larger;
        else if (this.outlineWidth < this.size.x && this.outlineHeight < this.size.y)
            this.state = outlineState.Smaller;
        else
            this.state = outlineState.Same;
    }
    updateOutline()
    {
        this.outlineLeft = this.pos.x - this.outlineThickness,
        this.outlineTop = this.pos.y - this.outlineThickness,
        this.outlineRight = this.pos.x + this.size.x + this.outlineThickness,
        this.outlineBottom = this.pos.y + this.size.y + this.outlineThickness;

        this.outlineWidth = this.outlineRight - this.outlineLeft,
        this.outlineHeight = this.outlineBottom - this.outlineTop;
        // Debugging
        /*var thicknessStr = "Thickness: " + this.outlineThickness;
        alert(thicknessStr);*/
        /*var outlineStr = "Left: " + outlineLeft + ", Top: " + outlineTop +
            "\nRight: " + outlineRight + ", Bottom: " + outlineBottom;;
        alert(outlineStr);*/
        /*var str = "Outline X: " + outlineLeft + ", Outline Y: " + outlineTop +
            "\nOutline Width: " + outlineWidth + ", Outline Height: " + outlineHeight;
        alert(str);*/
    }

    setOutlineColor(in_outlineColor)
    {
        this.outlineColor = in_outlineColor;
    }
    
    move(in_delta)
    {
        if (in_delta instanceof Vec2)
        {
            this.pos.x += in_delta.x;
            this.pos.y += in_delta.y;
            this.updateOutline();
        }
        else
        {
            alert("Wrong input in function:\n   RectangleShape::move(taking class 'Vec2')")
        }
    }

    getPos()
    {
        return this.pos;
    }
    getSize()
    {
        return this.size;
    }
    getColor()
    {
        return this.color;
    }

    intersects(in_other)
    {
        if (in_other instanceof RectangleShape)
        {
            if (this.pos.x + this.size.x > in_other.getPos().x && this.getPos().x < in_other.getPos().x + in_other.getSize().x &&
                this.pos.y + this.size.y > in_other.getPos().y && this.getPos().y < in_other.getPos().y + in_other.getSize().y)
                {
                    // Debugging Code
                    //alert("intersects: true");
                    return true;
                }
        }
        else
        {
            alert("Wrong input in function:\n   RectangleShape::intersects(taking class 'RectangleShape')")
        }
        return false;
    }

    draw(in_dc)
    {
        // Debugging
        //alert(this.state);
        
        // Draw the outline first
        if (this.state == outlineState.Larger /* Enum code 10000 */)
        {
            in_dc.fillStyle = this.outlineColor;
            in_dc.fillRect(this.outlineLeft, this.outlineTop, this.outlineWidth, this.outlineHeight);
            in_dc.fillStyle = this.color;
            in_dc.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
        // Draw the outline rectangle with the main rect's color instead
        else if (this.state == outlineState.Smaller /* Enum code 10001 */)
        {
            in_dc.fillStyle = this.color;
            in_dc.fillRect(this.outlineLeft, this.outlineTop, this.outlineWidth, this.outlineHeight);
        }
        else if (this.state == outlineState.Same /* Enum code 10002 */)
        {
            in_dc.fillStyle = this.color;
            in_dc.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        }
    }
}

function copy(in_other)
{
    if (in_other instanceof RectangleShape)
    {
        this.pos = in_other.pos;
        this.size = in_other.size;
        this.color = in_other.color;
    }
    else
    {
        alert("Wrong input in function:\n   'classLess'::copy(taking class 'RectangleShape')")
    }
}
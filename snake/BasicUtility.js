var rand = function()
{
    return Math.trunc(Math.random() * 1000000000);
}

class Vec2
{
    constructor(in_x, in_y)
    {
        this.x = in_x;
        this.y = in_y;
    }
}

class canvasString
{
    constructor(in_string, in_color, in_font, in_pos)
    {
        this.string = in_string;
        this.color = in_color;
        this.font = in_font;
        this.pos = in_pos;
    }

    setPos(in_pos)
    {
        this.pos = in_pos;
    }

    getString()
    {
        return this.string;
    }
    getPos()
    {
        return this.pos;
    }
    getColor()
    {
        return this.color;
    }

    draw(in_dc)
    {
        in_dc.font = this.font;
        in_dc.fillStyle = this.color;
        in_dc.fillText(this.string, this.pos.x, this.pos.y);
    }
}
class cText
{
    constructor(in_string = "", in_color = "#FFFFFF", in_pos = new Vec2(0, 0), in_fontSize = 12, in_fontFamily = "times")
    {
        this.init(in_string, in_color, in_pos, in_fontSize, in_fontFamily);
    }
    init(in_string = "", in_color = "#FFFFFF", in_pos = new Vec2(0, 0), in_fontSize = 12, in_fontFamily = "times")
    {
        this.color = in_color;
        this.font = in_fontSize + "px " + in_fontFamily;
        this.pos = in_pos;

        this.spacing = 45;

        this.setString(in_string);
        // Debugging
        //alert(fontFamily);
    }
    setString(in_string)
    {
        this.stringArray = Array();
        const regex = /\n/g;
        var stopIndex = 0;

        var newString = new String(in_string);

        do 
        {
            var oldLength = newString.length;
            newString = newString.slice(stopIndex, oldLength);
            // Debugging
            //alert(newString);
            if ((newString.search(regex)) > 0)
            {
                stopIndex = newString.search(regex);
            }
            else
            {
                stopIndex = newString.length;
            }

            // Debugging
            /*alert(stopIndex);
            alert(newString.length);
            alert(in_string.length);*/

            var str = "";
            for (var i = 0; i < stopIndex; i++)
            {
                // Debugging
                //alert(newString[i]);
                str += newString[i];
            }
            // Debugging
            //alert(str);
            this.stringArray.push(new canvasString(str, this.color, this.font, this.pos));

            // To prevent it from printing blankspaces (and fixes
            // a bug where there won't due to the stopIndex still
            // contains the newline character) (Remember to get rid
            // of every blankspace to prevent this bug from happening
            // again)
            stopIndex += 1;

            // Debugging
            //alert(this.stringArray.length);
        } while (stopIndex < newString.length);
    }
    setSpacing(in_spacing)
    {
        this.spacing = in_spacing;
    }
    draw(in_dc)
    {
        if (this.stringArray.length > 1)
        {
            for (var i = 0; i < this.stringArray.length; i++)
            {
                // Debugging
                /*alert(this.stringArray[i].getString());
                alert(this.stringArray[i].getColor());*/

                this.stringArray[i].draw(in_dc);
                if (i + 1 < this.stringArray.length)
                {
                    var newX = this.stringArray[i].getPos().x, newY = this.stringArray[i].getPos().y + this.spacing;
                    this.stringArray[i + 1].setPos(new Vec2(newX, newY));
                    // Debugging
                    /*var str = "X: " + newX + ", Y: " + newY;
                    alert(str);*/
                }
            }
        }
        else if (this.stringArray.length > 0)
            this.stringArray[0].draw(in_dc);
    }
}
var Board = (function () {

    function Board()
    {
    }
    
    Board.prototype.inBounds = function(in_snake)
    {
        if (in_snake instanceof Snake)
        {
            var snakeHead = in_snake.segments[0];
            if (snakeHead.getPos().x >= 0 && snakeHead.getPos().x + snakeHead.getSize().x <= width &&
                snakeHead.getPos().y >= 0 && snakeHead.getPos().y + snakeHead.getSize().y <= height)
                {
                    return true;
                }
        }
        else
        {
            alert("Wrong input in function:\n   Board::inBounds(taking class 'Snake')")
        }
        return false;
    }

    return Board;
})();
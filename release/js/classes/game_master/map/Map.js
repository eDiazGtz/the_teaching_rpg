class Map {

    eventListener = new EventHandler();
    size;

    _emptySquares = [];
    _grid = [];

    constructor(size) {
        this.size = size;

        return this;
    }

    create = () => {

        // remove after making updates
        document.dispatchEvent(new CustomEvent(StageManager.EVENTS.DISPLAY_LESSON, {detail: "fix_map"}));

        this._grid = [];

        for( let y = 0; y < this.size; y ++ ) {
            var newRow = [];

            for( let x = 0; x < this.size; x  ++ ) {

                let square = new MapSquare(x, y);
                
                newRow.push(square);
                this._emptySquares.push(square);
            }
            
            this._grid.push(newRow);
        }

        return this;
    }

    getMap = () => this._grid;

    getMapSquare = (point) => this._grid[point.y][point.x];
    //
    getRange = (range) => {

        let grid = [];

        for ( let y = range.start.y; y <= range.end.y; y ++ ) {
            let newRow = [];

            for ( let x = range.start.x; x <= range.end.x; x  ++ )
                newRow.push(this._grid[y][x]);

                grid.push(newRow);
        }
        
        return grid;
    }
}
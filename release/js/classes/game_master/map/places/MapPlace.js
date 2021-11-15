class MapPlace {

    static COVER_MODES = {
        ON: 1,
        OFF: 2,
        AUTO: 3
    }

    coverMode = MapPlace.COVER_MODES.AUTO;
    eventListener = new EventHandler();
    name;

    _description
    _layout; // TODO: change to public
    _playerEnterCount = 0;
    _playerIsInside = false;
    _sortie;
    _stepsInPlace = 0;


    get coverIsVisible() {
        if ( !this._layout || this._layout.coverImage === null ) return false;

        return this.coverMode === MapPlace.COVER_MODES.AUTO ? 
                !this._playerIsInside
                :
                this.coverMode === MapPlace.COVER_MODES.ON;
    }

    constructor(name, description, sortie, layout) {

        this._description = description;
        this._layout = layout;
        this.name = name;
        this._sortie = sortie;
    }

    applyToMap = (map) => {

        /*
            Go through drawing points and fill space
            go through drawing points and draw the walls
                - check if there is an instance of MapPlace object
                    on MapSquare on the 'other side' of where the wall barrier
                    might be placed


        */

        // draw space
        this._layout.drawingRanges.forEach(range => {

            if ( range instanceof Point) { console.log(range)
                map[range.y][range.x].place = this;
            } else {
                // add place to mapSquares
                for ( let y = range.start.y; y <= range.end.y; y ++ ) {
                    for ( let x = range.start.x; x <= range.end.x; x ++ ) {
                        map[y][x].place = this;
                    }
                }
            }

        })

        // add walls
        if ( this._layout.wallBarrier ) {
            this._layout.drawingRanges.forEach(range => {
    
                // draw north / south walls
                for ( let x = range.start.x; x <= range.end.x; x ++) {

                    // north
                    if ( range.start.y - 1 > -1 &&
                            (map[range.start.y - 1][x].place !== this ||
                                map[range.start.y - 1][x].barrier === this._layout.wallBarrier)){
                                    map[range.start.y][x].barrier = this._layout.wallBarrier;
                                }

                    // south
                    if ( range.end.y + 1 < map.length &&
                        (map[range.end.y + 1][x].place !== this ||
                            map[range.end.y + 1][x].barrier === this._layout.wallBarrier)) {
                                map[range.end.y][x].barrier = this._layout.wallBarrier;
                            }
                }
    
                // draw east / west walls
                for ( let y = range.start.y + 1; y < range.end.y; y ++) {

                    // east
                    if ( range.start.x - 1 > -1 &&
                            (map[y][range.start.x - 1].place !== this ||
                                map[y][range.start.x - 1].barrier === this._layout.wallBarrier)){
                                    map[y][range.start.x].barrier = this._layout.wallBarrier;
                                }

                    // west
                    if ( range.end.x + 1 < map.length &&
                            (map[y][range.end.x + 1].place !== this ||
                                map[y][range.end.x + 1].barrier === this._layout.wallBarrier)){
                                    map[y][range.end.x].barrier = this._layout.wallBarrier;
                                }
                }
            });
        }

        // make doors
        this._layout.doors.forEach(door => map[door.point.y][door.point.x].barrier = door)

    };

    //override
    checkCanEnter(map, player) {
        return true;
    }

    //override
    checkCanLeave(map, player) {
        return true;
    }

    // override
    enter(map, player){

        this._playerIsInside = true;

        this._playerEnterCount ++;
        this._stepsInPlace = 0;
        return true; // returns canEnter? true / false
    };

    // override
    move(map, player) {
        return true; // returns canLeave? true / false
    }

    //override
    leave(map, player) {

        this._playerIsInside = false;
        this._stepsInPlace ++;
    }
}
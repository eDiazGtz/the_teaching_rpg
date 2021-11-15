// holds placement info for given piece
class MapPiecePlacer {

    _locations;
    _piece;

    constructor(piece, locations) {
        
        this._locations = locations;
        this._piece = piece;

        return this;
    }

    applyToMap = (map) => {
        // if the piece has the method applyToMap
        try {
            this._piece.applyToMap(map, this._locations);
            return;
        } catch {}

        // if not, just use a basic algo to place items
        this._locations.forEach(location => {

            if ( location instanceof Point ) {
                this._addPieceToMapSquare(map[location.y][location.x]);
            } else { // range

                for ( let y = location.start.y; y <= location.end.y; y ++ ) 
                    for ( let x = location.start.x; x  <= location.end.x; x ++ )
                        this._addPieceToMapSquare(map[y][x]);
            }
        })
    }

    _addPieceToMapSquare = (mapSquare) => {

        if ( this._piece instanceof Character ) {
            mapSquare.character = this._piece.clone();
        } else if ( this._piece instanceof Barrier ) {
            mapSquare.barrier = this._piece.clone();
        } else if (this._piece instanceof MapPlaceCover) {
            mapSquare.cover = this._piece.clone();
        }
    }
}
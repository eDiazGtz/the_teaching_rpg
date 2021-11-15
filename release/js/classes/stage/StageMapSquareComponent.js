class StageMapSquareComponent extends StageComponent {

    _mapSquare;

    constructor(stage, gameMaster, mapSquare) {
        super(stage, gameMaster);

        this._mapSquare = mapSquare;

        return this;
    }

    buildComponent = () => {
        let player = this._gameMaster.player;

        let isPlayerSquare = player!== null && player.mapSquare.x === this._mapSquare.x && player.mapSquare.y === this._mapSquare.y;
        let isActiveSquare = player !== null && !isPlayerSquare && 
            Math.abs(player.mapSquare.x - this._mapSquare.x) < 2 && Math.abs(player.mapSquare.y - this._mapSquare.y) < 2;

        let activeClass = isPlayerSquare ? "map_square__home" :
                            isActiveSquare ? "map_square__active_square" : "";

        let imagePath =
            this._mapSquare.cover !== null ?  this._mapSquare.cover.imageName
                : ( this._mapSquare.place !== null && this._mapSquare.place.coverIsVisible) ? this._mapSquare.place._layout.coverImage
                    : ( player.mapSquare && this._mapSquare.x === player.mapSquare.x && this._mapSquare.y === player.mapSquare.y ) ? player.imageName
                        : this._mapSquare.barrier !== null ? this._mapSquare.barrier.imageName
                            : this._mapSquare.character !== null ? this._mapSquare.character.imageName
                                : this._mapSquare.item !== null ? this._mapSquare.item.imageName
                                    : null

        return `<div class="map_square">
                    <div id="${this._mapSquare.x}:${this._mapSquare.y}" 
                        class="map_square__inner ${activeClass}"
                        ${
                            this._mapSquare.place && this._mapSquare.place._layout && this._mapSquare.place._layout.floorImage  ?
                                `style="background-image: url(images/${this._mapSquare.place._layout.floorImage}.png); background-size: cover; display: inline-block;"`
                                : ""
                            }
                        >
                        ${
                            imagePath === null ? ""
                            :   
                                `
                                    <img src="images/${imagePath}.png"/>
                                `
                        }                           
                    </div>
                </div>`
    }
}
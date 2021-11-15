class StageMapComponent extends StageComponent {

    eventListener = new EventHandler();
    gameMaster;
    stage;
    viewSize = new Point(15, 9); // must update .map_square and #map size if these numbers change

    _mapActions;

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        this._mapActions = new StageMapActionsComponent("#map__actions", this._gameMaster);

        //events
        document.addEventListener(
            GameMaster.EVENTS.MAP_UPDATED,
            () => this.buildComponent()
        );

        document.onkeydown = (e) => {

            if ( !this.active ) return;

            e = e || window.event;

            let newPoint = new Point(0, 0);

            switch (e.key) {
                case "ArrowLeft":
                    newPoint.x -= 1;
                    break;
                case "ArrowRight":
                    newPoint.x += 1;
                    break;
                case "ArrowUp":
                    newPoint.y -= 1;
                    break;
                case "ArrowDown":
                    newPoint.y += 1;
                    break;
            }

            if ( newPoint.x + newPoint.y !== 0 ) this._gameMaster.movePlayer(newPoint);
        }

        return this;
    }

    buildComponent = () => {

        let gameMap = this._gameMaster.map.getMap();

        let offset = new Point(Math.floor(this.viewSize.x / 2), Math.floor(this.viewSize.y / 2));
        // WARNING! Changning the view size to an even number affects these values
        let bounds = {
            top: this._gameMaster.player.mapSquare.y - offset.y,
            right: this._gameMaster.player.mapSquare.x + offset.x ,
            bottom: this._gameMaster.player.mapSquare.y + offset.y,
            left: this._gameMaster.player.mapSquare.x - offset.x
        };

        // adjust for bounds being outside of game map
        if (bounds.top < 0) {
            bounds.top = 0;
            bounds.bottom = this.viewSize.y - 1;
        }

        if (bounds.bottom >= gameMap.length) {
            bounds.bottom = gameMap.length - 1;
            bounds.top = bounds.bottom - this.viewSize.y;
        }

        if (bounds.left < 0) {
            bounds.left = 0;
            bounds.right = this.viewSize.x - 1;
        }
        
        if (bounds.right >= gameMap.length) {
            bounds.right = gameMap.length - 1;
            bounds.left = bounds.right - this.viewSize.x;
        }
    
        this._stage.innerHTML = "";

        let newHTML = "";

        for (  let y = bounds.top; y <= bounds.bottom; y ++ ) 
            for (let x = bounds.left; x <= bounds.right; x ++ ){
                newHTML += new StageMapSquareComponent(
                                `#${this._stage.id}`,
                                this._gameMaster,
                                gameMap[y][x]
                            ).buildComponent();
            }
        this._stage.innerHTML = newHTML;

        this._mapActions.buildComponent();
        
        return this;
    }
}
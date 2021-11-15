class Sortie {

    eventListener = new EventHandler();
    name;
    playerStartLocation; //override
    quest;
    quests = []


    _gameMaster;
    _mapRange; // Range()

    /* all of these should be overriden by child */
    _barriers = [];
    _characters = [];
    _cover = [];
    _items = [];
    _places = [];
    
    constructor(gameMaster, name, mapRange) {

        this.name = name;

        this._gameMaster = gameMaster;
        this._mapRange = mapRange;
    }

    build = (map, player) => {

        [
            ...this._barriers,
            ...this._characters,
            ...this._places,
            ...this._items,
            ...this._cover
        ].forEach(mapPiecePlacer => mapPiecePlacer.applyToMap(map));

        this.quests.forEach(q => ScriptMaster.addScripts(this.name, q.scripts));

        this.quest = this.quests.shift();

        return this;
    }

    // override
    end(map, player) {};

    getMap = () => this._gameMaster.map.getRange(this._mapRange);

    getScript = (slug) => ScriptMaster.getScript(`${this.name}_${slug}`.split(" ").join("_").toLowerCase());

    // override
    start(map, player) { 
        player.mapSquare = map[this.playerStartLocation.y][this.playerStartLocation.x];

        this.quest.start(map, player);
        this.update(map, player);
    }

    // override
    // return sortieCompleted = true / false
    update(map, player){
        let questCompleted = this.quest.update(map, player);

        if ( questCompleted ) {

            if ( this.quests.length === 0 ) {
                this.quest.end(map, player);
                return true;
            } else {
                this.quest = this.quests.shift();
                this.quest.start(map, player);
            }
        }

        return false;
    }
}
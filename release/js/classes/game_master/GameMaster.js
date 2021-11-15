class GameMaster {


    static EVENTS = {
        BATTLE_RESULTS: "battle_results", //data = [String]
        CHARACTER_UPDATED: "character_updated",
        DISPLAY_LESSON: "display_lesson",
        GO_SHOPPING: "go_shopping",
        GOLD_ADDED: "gold_added", // data = quantity
        INVENTORY_UPDATED: "inventory_updated",
        MAP_UPDATED: "map_updated",
        MODE_UPDATED: "mode_updated",
        CHARACTER_DIED: "character_died",
        PLAYER_DIED: "player_died",
        PLAYER_UPDATED: "player_updated",
        SORTIE_STARTED: "sortie_started",
        SHOP_UPDATED: "shop_updated",
        START_BATTLE: "start_battle"
    }

    static MODES = {
        DEMO: "demo", // displays lesson pages, but can skip.
        FROZEN: "frozen", // not in use
        GAME_OVER: "game_over",
        NORMAL: "normal", // will trigger lessons
        PLAY: "play", // will not trigger lessons
        TESTING_DEMO: "testing_demo", // demo + button to go to testing component
        TESTING_NORMAL: "testing_normal", // normal + button to go to testing component
        TESTING_PLAY: "testing_play", // play + butto to go to testing component
    }

    FOOD = [
        new Food("bread", 28, 2, 4, ""),
        new Food("meat", 150, 3, 8, ""),
        new Food("ale", 28, 1, 2, "")
    ]

    WEAPONS = [
        new Weapon("longbow", "bow", 1360, {min: 5, max: 7}, {min: 2, max: 6}, {min: 0, max: 2}, 0, "includes arrows"),
        new Weapon("crossbow", "bow", 6830, {min: 7, max: 10}, {min: 3, max: 7}, {min: 4, max: 7}, 0, "includes arrows"),
        new Weapon("broadsword", "sword", 1850, {min: 8, max: 10}, {min: 3, max: 5}, {min: 3, max: 5}, "a large sword"),
        new Weapon("longsword", "sword", 1360, {min: 6, max: 9}, {min: 2, max: 3}, {min: 2, max: 3}, "a long sword"),
        new Weapon("shortsword", "sword", 1000, {min: 5, max: 7}, {min: 1, max: 2}, {min: 1, max: 2}, "a long sword"),
        new Weapon("battle shield", "shield", 2400, {min: 7, max: 10}, {min: 0, max: 1}, {min: 3, max: 5}, "good for close battle"),
        new Weapon("screaming daggar", "daggar", 800, {min: 5, max: 7}, {min: 1, max: 2}, {min: 0, max: 1}, "")
    ]

    availableItems = [...this.FOOD, ...this.WEAPONS];

    availableMonsters = [
        new Deamon("giant goat", "I will eat your soul!"),
        new Troll("razorback", "Likes to eat his opponents!"),
        new Troll("warrior", "Crush yer bones!"),
        new Wraith("death", "You won't see me coming!")
    ]

    availablePlayers = [
        new Barbarian(),
        new Rogue(),
        new Sorcerer(),
        new Warrior()
    ];
    
    map;
    sorties = [
        new StartSortie(this),
        new WaterlandSortie(this)
    ]

    eventListener = new EventHandler();
    sortie;

    _scriptMaster = new ScriptMaster();

    frozen = false;

    _mode = GameMaster.MODES.TESTING_PLAY;
    get mode() {

        if ( this.frozen ) return GameMaster.MODES.FROZEN;

        return this._mode;
    }
    set mode(newMode) {

        if ( newMode === this._mode ) return;

        this._mode = newMode;

        this.eventListener.trigger(GameMaster.EVENTS.MODE_UPDATED, newMode);
    }

    set troupe(newTroupe) {
        this._stage.querySelectorAll(".troupe").forEach(el => el.style.display = "none")
        this._stage.querySelector(`#${newTroupe}__troupe`).style.display = "block";
    }

    _player = new Barbarian();
    get player() {
        return this._player;
    }
    set player(newValue) {
        this._player = newValue;
        
        this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);

        document.addEventListener(GameMaster.EVENTS.CHARACTER_UPDATED, () =>
            this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED))

        document.addEventListener(GameMaster.EVENTS.CHARACTER_DIED, () =>
            this.eventListener.trigger(GameMaster.EVENTS.PLAYER_DIED))
    }

    constructor(mapSize = 100) {

        ScriptMaster.gameMaster = this;
        LessonMaster.gameMaster = this;

        if ( mapSize !== null ) this.buildWorld(mapSize);

        return this;
    }

    buildWorld = (mapSize = 100) => {
        
        this.map = new Map(mapSize).create();

        let map = this.map.getMap();

        this.sorties.forEach(sortie => sortie.build(map, this.player));
    }

    doBattle = (battleMapSquare) => {

        let opponent = battleMapSquare.character;

        const attack = (attacker, defender) => {
            let attackerPin = attacker.attackPin;
    
            let dialog = [];
            dialog.push(`${attacker.displayName} ${attackerPin.actionString}.`);
    
            if ( Tools.rollDie(20) <= attackerPin.hitValue ) {
                dialog.push(`${attacker.displayName} SUCCEEDS! `);
    
                let defendPin = defender.defendPin;
                dialog.push(`${defender.displayName} ${defendPin.actionString}`);
    
                let damage = attackerPin.damage - defendPin.defense;
                dialog.push(`${defender.displayName} suffered ${
                    damage < 1 ? "no"
                        : damage < 2 ? "minor"
                            : damage < 4 ? "serious"
                                : "major"
                } damage!`);
                
                if ( damage > 0 ) defender.strength -= damage
    
            } else {
                dialog.push(`${attacker.displayName} MISSES!`);
            }
            
            if ( this.player.strength < 1 ) dialog.push(`${this.player.displayName} had died!`);

            if ( this.mode.indexOf("test") > -1 ) {
                opponent.strength = 0;
            }
            
            if ( opponent.strength < 1 ) {
                dialog.push(`${opponent.displayName} has died!`);
                if ( opponent.gold > 0 ) {
                    this.player.gold += opponent.gold;
                    dialog.push(`${this.player.displayName} gained ${opponent.gold} coins!`);
                }

                battleMapSquare.character = null;
            }

            return dialog; // for testing
        }

        // randomly choose who attacks first
        let randOne = Tools.rollDie(10) < 6 ? opponent : this.player;
        let randTwo = randOne === opponent ? this.player : opponent;

        this.eventListener.trigger(
            GameMaster.EVENTS.BATTLE_RESULTS, 
            [...attack(randOne, randTwo), ...attack(randTwo, randOne)]);

        return [...attack(randOne, randTwo), ...attack(randTwo, randOne)];// for testing
    }

    jumpToQuest = (questName) => {  //return;

        let map = this.map.getMap();

        while ( this.sortie.quest.name !== questName ) {

            this.sortie.quest.skip(map, this.player);

            if ( this.sortie.quests.length === 0 ) {
                this.sortie = this.sorties.shift();
            } else {
                this.sortie.quest = this.sortie.quests.shift();
            }
        }

        this.sortie.start(map, this.player);
        this.sortie.quest.insertPlayer(map, this.player);

        this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
    }

    movePlayer = (directionPoint) => {

        let candidateMapSquare;
        let changingPlaces = false;
        let map = this.map.getMap();

        directionPoint.x += this.player.mapSquare.x;
        directionPoint.y += this.player.mapSquare.y;

        try {
            candidateMapSquare = map[directionPoint.y][directionPoint.x];
        } catch {
            console.log(`invalid square: ${directionPoint.x}, ${directionPoint.y}`);
            return;
        }

        if ( !candidateMapSquare ) {
            console.log(`invalid square: ${directionPoint.x}, ${directionPoint.y}`);
            return;
        }

        // enemy
        if ( candidateMapSquare.character instanceof Enemy) {
            candidateMapSquare.character.engage(map, this.player, candidateMapSquare);
            return;
        }

        // all other characters
        if ( candidateMapSquare.character !== null ) return;

        // places
        changingPlaces = candidateMapSquare.place !== this.player.mapSquare.place;

        // barrier
        if ( candidateMapSquare.barrier ) {

            let playerCanPassResult = candidateMapSquare.barrier.canPlayerPass(map, this.player, candidateMapSquare);

            if ( playerCanPassResult.response ) {

                if ( playerCanPassResult.response instanceof DialogObject ) {

                    this.eventListener.trigger(StageManager.EVENTS.DISPLAY_DIALOG, playerCanPassResult.response);
                } else {

                    this._dispatchDialog(
                        DialogObject.DIALOG_TYPES.SCRIPT,
                        ScriptMaster
                            .getScript(`${this.sortie.name}_${playerCanPassResult.response}`
                            .split(" ").join("_").toLocaleLowerCase())
                        )
                }
            }
            if ( !playerCanPassResult.canPass) return;
        }

        // check if can leave place
        if ( this.player.mapSquare.place !== null && 
                changingPlaces && !this.player.mapSquare.place.checkCanLeave() ) return;

        // check if can enter place
        if ( candidateMapSquare.place !== null && 
                changingPlaces && !candidateMapSquare.place.checkCanEnter() ) return;

        if ( changingPlaces && this.player.mapSquare.place ) this.player.mapSquare.place.leave(map, this.player);

        // update player
        this.player.mapSquare = candidateMapSquare;

        if ( changingPlaces && this.player.mapSquare.place !== null ) this.player.mapSquare.place.enter(map, this.player);

        if ( !changingPlaces && this.player.mapSquare.place !== null ) this.player.mapSquare.place.move(map, this.player);

        if ( this.sortie.update(map, this.player) ) {// sortie completed
            console.log(`new sortie: ${this.sortie.name}`);
            this.sortie.start(map, this.player);
            this.eventListener.trigger(GameMaster.EVENTS.SORTIE_STARTED);
        }

        this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
    }

    // return Quest or null
    gotoNextQuest = () => {

        let map = this.map.getMap();
        if ( this.sortie ) {
            if ( this.sortie.update(map, this.player) ) { // end of sortie
                this.sortie = this.sorties.shift();

                if ( this.sortie ) { // start new sortie
                    console.log(`new sortie: ${this.sortie.name}`);
                    this.sortie.start(map, this.player);
                    this.eventListener.trigger(GameMaster.EVENTS.SORTIE_STARTED);
                    return this.sortie.quest;;
                } else { // game over
                    this.eventListener.trigger(GameMaster.EVENTS.GAME_OVER);
                    return null;
                }
            }
        } else {
            this.sortie = this.sorties.shift();
            if ( this.sortie ) {
                this.sortie.start(map, this.player);
                this.eventListener.trigger(GameMaster.EVENTS.SORTIE_STARTED);
                return this.sortie.quest;
            } else {
                this.eventListener.trigger(GameMaster.EVENTS.GAME_OVER);
                return null;
            }
        }
    }

    _dispatchDialog = (dialogType, content) => {
        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(dialogType,content))
    }

}
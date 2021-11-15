class CastleGreymoor extends MapPlace {



    constructor(sortie, layout, doors) { 
        super("greymoor", "The Castle of King Greymoor in Westfalia Kingdom", sortie, layout);
        

        this.coverMode = MapPlace.COVER_MODES.OFF;

        // create audio attribute like in StageManager
        this._doorSound = new Audio();
        this._doorSound.src = "sounds/door_open.mp3";
        this._doorSound.volume = .5;
    }

    // ######Completed Password "Ruler(13)EHYRE Absolute(16)QRIEBKJU Danburite(4)HERFYVMXI" 

    enter = (map, player) => {
        super.enter(map, player);
    }

    move = (map, player) => {}


        //Skipping Lesson
        _handleLessonSkipped = (map, player) => {
            player.collectedItems.addItem(new RoyalPendant());
            this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
        }



}
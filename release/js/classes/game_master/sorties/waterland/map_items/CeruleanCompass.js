class CeruleanCompass extends MagicalMapItem {

    constructor(mapPoint) {
        super("Cerulean Compass", "", mapPoint, true);
    }

    use(map, player) {

        if ( LessonMaster.presentLesson("cerulean_compass", StageManager.ACTS.BUILD_PLAYER) ) return;

        // player needs to be on a mapSquare that has a place
        if ( player.mapSquare.place === null ) {
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine(
                        "You must be in a place to use the Cerulean Compass!",
                        "codee",
                        "CODEE"
                    )
                ));

            return;
        }

        // clear covers
        for ( let y = 0; y < map.length; y ++ ) {
            for ( let x = 0; x < map.length; x ++ ) {
                if ( map[y][x].place && 
                        map[y][x].place.name === player.mapSquare.place.name
                        ){
                    map[y][x].cover = null;
                }
            }
        }

        this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED)
    }
}
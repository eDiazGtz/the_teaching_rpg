class CastleDoor extends MapPlaceDoor {

    solution;
    _intro_castle = true;

    constructor(point, solution) {
        super("castle_door", point, null, null, "greymore_castle_door");

        this.solution = solution;
    }

    canPlayerPass(map, player, candidateMapSquare) {

        if (this.point.x === 36 && this.point.y === 16 && player.mapSquare.y == 17) {
            if (this._intro_castle === true) {
                // Hitting Main Door

                player.collectedItems.removeItem('grishams_heirloom');
                player.collectedItems.removeItem('waterstone_shard');

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_STORY,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT,
                        ScriptMaster.getScript("waterland_the_castle_main_door"), 
                        () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
                    )
                )
                player.mapSquare = map[3][44];
                this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
            } else {
                this._handleBasicDeny(candidateMapSquare);
            }
        } else if (this.point.x === 42 && this.point.y === 3 && this._intro_castle === true) {

            this._intro_castle = false;
            // Even though we built the functionality - shouldn't we remove compass too?
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_STORY,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT,
                    ScriptMaster.getScript("waterland_captured"), 
                    () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
                ),
            )
            //LESSON HERE
            player.collectedItems.addItem(new RoyalPendant());

        } else {
            this._handleBasicDeny(candidateMapSquare);
        }

        this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);

        return {
            canPass: false
        }
    }

    // override
    clone() {
        return new CastleDoor(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName);
    }

    _handleBasicDeny = (candidateMapSquare) => {
        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(
                DialogObject.DIALOG_TYPES.INPUT,
                new ScriptLine("Enter the code:"),
                (input) => {



                    if (input.toLowerCase() === this.solution) {
                        candidateMapSquare.barrier = null;
                        this.eventListener.trigger(StageManager.EVENTS.DISPLAY_DIALOG, new DialogObject(DialogObject.DIALOG_TYPES.CLEAR))
                        this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
                    } else {
                        this.eventListener.trigger(
                            StageManager.EVENTS.DISPLAY_DIALOG,
                            new DialogObject(
                                DialogObject.DIALOG_TYPES.ONE_OFF,
                                new ScriptLine("incorrect")
                            )
                        )
                    }
                }
            )
        )
    }
}
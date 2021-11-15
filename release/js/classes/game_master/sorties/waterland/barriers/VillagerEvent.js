class VillagerEvent extends MapPlaceDoor {

    _post_castle = false;
    _post_king = false;

    constructor(point, name) {
        super(name, point, null, null, name);
    }

    canPlayerPass(map, player, candidateMapSquare) {
        // Check if post_castle - if post_castle, stop checking
        if (this._post_castle === false) {
            this._postCastleCheck(player);
        }
        if (this._post_king === false) {
            this._postKingCheck(player);
        }
        // choosing villager event
        if (this.point.x === 12 && this.point.y === 19) {
            // On touch for Villager 1
            // VILLAGER ASMOND
            // Welcome to Respite Town!
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("VILLAGER ASMOND<br>Welcome to Respite Town!")
                )
            )
            if (this._post_castle === true) {
                // Post Castle
                // Welcome to Respite Town! King Greymoor is presently gracing us with his visit and supplies for all of Westfalia.
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("VILLAGER ASMOND<br>Welcome to Respite Town! King Greymoor is presently gracing us with his visit and supplies for all of Westfalia.")
                    )
                )

            }
        } else if (this.point.x === 14 && this.point.y === 23) {
            // On touch for Villager 2
            // VILLAGER HELGAR
            // Things have been hard since the rain stopped. Rains we took all that for granted!
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("VILLAGER HELGAR<br>Things have been hard since the rain stopped. Rains we took all that for granted!")
                )
            )
        } else if (this.point.x === 6 && this.point.y === 23) {
            // On touch for Villager 3
            // VILLAGER TERREL
            // We don't know where the King is, he's supposed to be coming here from the Castle
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("VILLAGER TERREL<br>We don't know where the King is, he's supposed to be coming here from the Castle")
                )
            )
            if (this._post_castle === true) {
                // Post Castle
                // The King has arrived! He brought supplies, but they won't talk to us about Lake Azure and the SPIRIT OF THE LAKE.    
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("VILLAGER TERREL<br>The King has arrived! He brought supplies, but they won't talk to us about Lake Azure and the SPIRIT OF THE LAKE.")
                    )
                )
            }
        } else if (this.point.x === 5 && this.point.y === 29) {
            // On touch for Villager 4
            // VILLAGER RELGHAST
            // We're waiting for the King with supplies. There were bandits blocking passage from the Dark Forest, but we got word that the road to Grisham's Shop is safer now.
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("VILLAGER RELGHAST<br>We're waiting for the King with supplies. There were bandits blocking passage from the Dark Forest, but we got word that the road to Grisham's Shop is safer now.")
                )
            )
            if (this._post_castle === true) {
                // Post Castle
                // The King has arrived, but the rains have not. He told us he's helping with the SPIRIT OF THE LAKE. Once he puts it back, the rains should come. We wish him haste!
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("VILLAGER RELGHAST<br>The King has arrived, but the rains have not. He told us he's helping with the SPIRIT OF THE LAKE. Once he puts it back, the rains should come. We wish him haste!")
                    )
                )
            }
        } else if (this.point.x === 9 && this.point.y === 30) {
            // On touch for Villager 5
            // VILLAGER VENUCIA
            // There's something wrong with Lake Azure, its said it brings us rain but there's some magic blocking the path to the temple. We hope the King has answers.
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("VILLAGER VENUCIA<br>There's something wrong with Lake Azure, its said it brings us rain but there's some magic blocking the path to the temple. We hope the King has answers.")
                )
            )
            if (this._post_castle === true) {
                // Post Castle
                // There's something wrong with Lake Azure, its said it brings us rain but there's some magic blocking the path to the temple. The King says he may have a way, but needs someone to help make sense and DECODE the clues he has.
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("VILLAGER VENUCIA<br>There's something wrong with Lake Azure, its said it brings us rain but there's some magic blocking the path to the temple. The King says he may have a way, but needs someone to help make sense and DECODE the clues he has.")
                    )
                )
            }
        } else if (this.point.x === 4 && this.point.y === 25) {
            console.log(this._post_king)
            if (this._post_king === true) {
                // Post King

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KING GREYMOOR<br>Speak with my Kingsguards, get the two KEYS from them. Then, head over to LAKE AZURE in the [Northwest]!")
                    )
                )
            } else if (this._post_castle === true) {
                // Post Castle
                // On touch for King
                this.imageName = 'king_greymoor';
                this.eventListener.trigger(GameMaster.EVENTS.MAP_UPDATED);
                // respite village dialogue
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_STORY,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT,
                        ScriptMaster.getScript("waterland_respite_town"),
                        () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
                    )
                )

                player.collectedItems.addItem(new WaterStone());
                this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);

                return true;

            } else {
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>The King is on his way. We are securing the area")
                    )
                )
            }
        } else if (this.point.x === 3 && this.point.y === 26 || this.point.x === 5 && this.point.y === 26) {
            console.log(this._post_king);
            if (this._post_king === true) {
                // Post King

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>I only have one of the two KEYS. 'nunjwxa' I don't know what it means.")
                    )
                )
            } else if (this._post_castle === true) {
                // Post Castle

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>Please help our King.")
                    )
                )
            } else {
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>The King is on his way. We are securing the area")
                    )
                )
            }
        } else if (this.point.x === 3 && this.point.y === 24 || this.point.x === 5 && this.point.y === 24 ) {
            if (this._post_king === true) {
                // Post King

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>I only have one of the two KEYS. 'a is j means 9' I don't know what it means.")
                    )
                )
            
            } else if (this._post_castle === true) {
                // Post Castle

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>Please help our King.")
                    )
                )
            } else {
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("KINGSGUARD<br>The King is on his way. We are securing the area")
                    )
                )
            }
        }
    }

    // override
    clone() {
        return new VillagerEvent(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName);
    }

    _postCastleCheck = (player) => {
        //  _post_castle true ? return : //if check below
        if (this._post_castle === true) {
            return;
        }
        // if player has Royal Pendant in Inventory set _post_castle to true;
        // else return;
        if (player.collectedItems.getItem('royal_pendant') != null) {
            this._post_castle = true;
            return;
        } else {
            return;
        }
    }
    
    _postKingCheck = (player) => {
        //  _post_castle true ? return : //if check below
        if (this._post_king === true) {
            return;
        }
        // if player has Waterstone in Inventory set _post_castle to true;
        // else return;
        if (player.collectedItems.getItem('water_stone') != null) {
            this._post_king = true;
            return;
        } else {
            return;
        }
    }

}
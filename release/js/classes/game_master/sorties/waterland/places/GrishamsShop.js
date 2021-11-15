class GrishamsShop extends Shop {

    _doorOpenSound;
    _doorCloseSound;

    constructor(availableItems, sortie) {
        super (availableItems, "Grisham's Shop", "", sortie,
        new MapPlaceLayout(
            [
                new Range(new Point(39,40), new Point(39, 45)),
                new Range(new Point(40,41), new Point(40, 45)),
                new Range(new Point(41,40), new Point(41, 45)),
                new Range(new Point(42,40), new Point(42, 45)),
                new Range(new Point(43,40), new Point(43, 44)),
                new Range(new Point(44,40), new Point(45, 45)),
                new Range(new Point(46,43), new Point(46, 45)),
            ]
            ,[ //doors && signs
                // Barrels
                new Barrel(new Point(44, 41), 'barrels_top'),
                new Barrel(new Point(44, 42), 'barrels_mid'),
                new Barrel(new Point(44, 43), 'barrels_bot'),
                // Shop Counter
                new ShopCounter(new Point(41, 42), 'shop_counter_left'),
                new ShopCounter(new Point(42, 42), 'shop_counter_mid'),
                new ShopCounter(new Point(43, 42), 'shop_counter_right'),
            ], 
            "map_item_shop_floor", 
            null, 
            "map_item_shop_roof"
        ));

        // create audio attribute like in StageManager
        this._doorOpenSound = new Audio();
        this._doorOpenSound.src = "sounds/door_open.mp3";
        this._doorOpenSound.volume = .5;
        
        this._doorCloseSound = new Audio();
        this._doorCloseSound.src = "sounds/door_close.mp3";
        this._doorCloseSound.volume = .5;

    };


    
    enter = (map, player) => {
        super.enter(map, player);

        // Door SFX Upon Enter
        this._doorOpenSound.play();

        let collectedHeirloom = this._checkForHeirloom(player);
        let collectedScroll = this._checkForScroll(player);

        // check if player has Grisham's Heirloom
        if ( collectedScroll !== null ) {
            this.eventListener.trigger(StageManager.EVENTS.GO_SHOPPING);
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT, 
                        this._sortie.getScript("post_magic_grisham_shop")
                    )
                )
            return true;
        // // check if player has Grisham's Heirloom
        // if ( collectedHeirloom !== null ) {
        //     this.eventListener.trigger(StageManager.EVENTS.GO_SHOPPING);
        //     this.eventListener.trigger(
        //         StageManager.EVENTS.DISPLAY_DIALOG,
        //             new DialogObject(
        //                 DialogObject.DIALOG_TYPES.SCRIPT, 
        //                 this._sortie.getScript("post_magic_grisham_shop")
        //             )
        //         )
        //     return true;

        } else if ( collectedScroll !== null && this._playerEnterCount > 1 ) {// returning without scroll
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT, 
                        this._sortie.getScript("rejecting_learning_magic_at_grishams")
                    )
                )
        // } else if ( collectedHeirloom !== null && this._playerEnterCount > 1 ) {// returning without heirloom
        //     this.eventListener.trigger(
        //         StageManager.EVENTS.DISPLAY_DIALOG,
        //             new DialogObject(
        //                 DialogObject.DIALOG_TYPES.SCRIPT, 
        //                 this._sortie.getScript("rejecting_learning_magic_at_grishams")
        //             )
        //         )

        } else if ( this._playerEnterCount === 1 ) {// first time
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_STORY,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT, 
                        this._sortie.getScript(this.name),
                        () => {
                            this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
                            this._confirmLearnMagic(player)
                        }
                    )
                )
        } else { // check for Grisham's Heirloom
            this._confirmLearnMagic(player);
        }

        return true;
    };

    move = (map, player) => {
        super.move(map, player);

        // if player has not completed magic, they will be asked to every 3 steps
        if ( this._stepsInPlace % 3 === 0 ) 
            this._confirmLearnMagic(player);

    }

    leave(map, player) {

        this._playerIsInside = false;
        this._stepsInPlace ++;
        this._doorCloseSound.play();
    }

    _checkForHeirloom = (player) => player.collectedItems.searchForItemByName(new GrishamsHeirloom().name);
    _checkForScroll = (player) => player.collectedItems.searchForItemByName(new AncientMagicScroll().name);

    _confirmLearnMagic = (player) => {

        // check if the player has Grishams's Heirloom
        if ( this._checkForScroll(player) === null ) {

            if ( this._playerEnterCount === 1 ) { // if first time entering 
                this.eventListener.trigger( 
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT,
                        this._sortie.getScript("post_magic_grisham_shop"),
                        () => this._confirmLearnMagic(player)
                        )
                )
            } else {
        // if ( this._checkForHeirloom(player) === null ) {

        //     if ( this._playerEnterCount === 1 ) { // if first time entering 
        //         this.eventListener.trigger( 
        //             StageManager.EVENTS.DISPLAY_DIALOG,
        //             new DialogObject(
        //                 DialogObject.DIALOG_TYPES.SCRIPT,
        //                 this._sortie.getScript("accepting_to_learn_magic_at_grishams"),
        //                 () => this._confirmLearnMagic(player)
        //                 )
        //         )
        //     } else {

            }
            this.eventListener.trigger( // if not, ask if the player would like to learn.
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.CONFIRM,
                    new ScriptLine(
                        "Are you ready to learn to harness magic?",
                        "codee"
                    ),
                    (dialogResponse) => {
                        if ( dialogResponse === "dialog.yes" ) {
                            if ( ! LessonMaster.presentLesson("grishams_heirloom", 
                                    StageManager.ACTS.TRAVELING, this._handleLessonSkipped) ) {
                                        this.eventListener.trigger(
                                            StageManager.EVENTS.DISPLAY_STORY,
                                            new DialogObject (
                                                DialogObject.DIALOG_TYPES.SCRIPT,
                                                this._sortie.getScript("accepting_to_learn_magic_at_grishams"),
                                                () => {
                                                    player.collectedItems.addItem(new AncientMagicScroll());
                                                    this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
                                                    this.eventListener.trigger(StageManager.EVENTS.NEXT_QUEST)
                                                }
                                            )
                                        )
                                    }
                        } else {
                            this.eventListener.trigger(
                                StageManager.EVENTS.DISPLAY_DIALOG,
                                new DialogObject (
                                    DialogObject.DIALOG_TYPES.SCRIPT,
                                    this._sortie.getScript("rejecting_learning_magic_at_grishams")
                                )
                            )
                        }
                    } 
                )
            )
        } else {

        }
    }

    _handleLessonSkipped = (map, player) => {
        player.collectedItems.addItem(new AncientMagicScroll());
        this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
        this._sortie._gameMaster.gotoNextQuest();
    }
}
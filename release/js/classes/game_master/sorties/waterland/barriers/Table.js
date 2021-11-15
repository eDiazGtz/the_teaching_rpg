class Table extends MapPlaceDoor {

    constructor(point) {
        super("table", point, null, null, "barrier_table");

    }

    _finalTable = false;

    canPlayerPass(map, player, candidateMapSquare) {

        if (this.point.x === 36 && this.point.y === 5) {
            // Hitting Table 1
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a note on the table among the varous things.<br>It reads: 'herfyvmxi'")
                )
            )
        } else if (this.point.x === 44 && this.point.y === 4) {
            // Hitting Table Intro
            if (player.collectedItems.getItem('royal_pendant') != null) { 
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("Here is the note Reidite found. It reads: 'The new password is ehyre' and over here it says '13'")
                    )
                )
            } else {
                this._handleBasicDeny(candidateMapSquare);
            }
        } else if (this.point.x === 25 && this.point.y === 7) {
            // Hitting Table 2
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a note on the table among the varous things. It reads: 'a = e'")
                ),
            )
        } else if (this.point.x === 30 && this.point.y === 8) {
            // Hitting Table 3
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a note on the table among the varous things. It reads: 'Use Q for start'")
                ),
            )
        } else if (this.point.x === 46 && this.point.y === 7) {
            // Hitting Table 4
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a note on the table among the varous things. It reads: 'EFWSPYXI'")
                ),
            )
        } else if (this.point.x === 31 && this.point.y === 1) {
            // Hitting Info Table
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a book about Cryptology. It reads:<br> 'Ciphers sometimes hide the code by moving or changing the alphabet we work with.<br>For example, telling someone that a=b indicates that the alphabet was rotated by 1...'")
                ),
            )
        } else if (this.point.x === 40 && this.point.y === 10) {
            // Hitting Info Table
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You find a very fancy book. It reads:<br>'The true King of Westfalia, Danburite, rose to power by avenging his father and deposing his sister, Reidite. She killed their father in order to take the throne. The...'<br>The rest is unwirtten and the ink is wet."),
                    // new ScriptLine("REIDITE<br>That usurping brother of mine... treacherous is too lenient a word. He will pay with his blood for what he has done to this Kingdom. Yet, I can't raise a blade to him in my thoughts... what shall I do?")
                )
            )
        } else if (this.point.x === 34 && this.point.y === 14) {
            if (this._finalTable === false) {
                // final_table
                player.collectedItems.addItem(new GrishamsHeirloom());
                player.collectedItems.addItem(new WaterstoneShard());
                console.log(player.collectedItems._items)

                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_STORY,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT,
                        ScriptMaster.getScript("waterland_final_table"), //_sortie undefined need from quest
                        () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING)
                    )
                )
                this._finalTable = true;
            } else {
                // Hitting Info Table
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_DIALOG,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.ONE_OFF,
                        new ScriptLine("The latest report shows that Greymoor is alive. King Danburite demands the man's head. Reports also say that Greymoor was headed toward RESPITE TOWN. Find him and destroy him. Put all three codes together for our final password. 'Abosolute R...' *the rest is torn*"),
                    )
                )
            }
        } else {
            this._handleBasicDeny(candidateMapSquare);
        }


        return {
            canPass: false
        }
    }

    // override
    clone() {
        return new Table(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName);
    }

    _handleBasicDeny = (candidateMapSquare) => {
        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(
                DialogObject.DIALOG_TYPES.ONE_OFF,
                new ScriptLine("You found a table with books and notes all about. Nothing of interest.")
            )
        )
    }
}
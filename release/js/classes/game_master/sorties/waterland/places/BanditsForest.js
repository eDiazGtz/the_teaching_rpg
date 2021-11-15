class BanditsForest extends MapPlace {

    static tresspassCount = 0;

    hasEntered = false;
    firstBandit = false;


    get hasFinishedGrishamsQuest() {

        let found = false;
        this._sortie.quests.forEach(quest => {
            if ( quest.name === "Grisham's Shop") found = true;
        });

        return !found;
    }

    constructor(sortie, layout) {
        super("Bandits Forest", "Strange forest that houses thieves and bandits in Westfalia.", sortie, layout)
    
        this.coverMode = MapPlace.COVER_MODES.OFF;
    }

    // Enter
    enter = (map, player) => { console.log("enter")
        if ( this.hasFinishedGrishamsQuest ) {
            // This will Advance the Plot in the Forest || Should skip all below (else|if/else)
            
                // Ensure dialogue states we can't see Forest
                // Then Ambush happens
                this.eventListener.trigger(
                    StageManager.EVENTS.DISPLAY_STORY,
                    new DialogObject(
                        DialogObject.DIALOG_TYPES.SCRIPT, 
                        this._sortie.getScript("bandits")
                        )
                    )
                // Trigger Battle
                this.firstBandit = true;
                this.player.mapSquare.character = new Bandit();
                this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.BATTLE);
                
            // When PC First Enters Forest (G.Quest not done)
        } else if ( !this.hasEntered && !this.hasFinishedGrishamsQuest ) {
            this.hasEntered = true;
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT, 
                    this._sortie.getScript("forest_before_grisham")
                    )
                )
            // When PC has entered Forest already and G.Quest still not done
        } else {
            this._attackPlayer(player);
        }
    }

    move = (map, player) => {

        if ( this.firstBandit ) {

            // Trigger post_bandit_reidite dialogue
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT, 
                    this._sortie.getScript("post_bandits_fight")
                    )
                )
            

            // Trigger Lesson
            //TODO ######### Find out where Lessons dump

            // Post Lesson Dialogue
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT, 
                    this._sortie.getScript("finding_the_bandits_hideout")
                    )
                )

        } else {

            this._attackPlayer(player);

        }
    }

    _attackPlayer = (player) => {

        if ( this.hasFinishedGrishamsQuest ) return;

        let hitLoss = Tools.rollDie(3) + BanditsForest.tresspassCount;

        BanditsForest.tresspassCount += 1;

        player.strength -= hitLoss;

        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(
                DialogObject.DIALOG_TYPES.ONE_OFF,
                new ScriptLine(
                    `You were attacked by BANDITS and lost ${hitLoss} strength!<br>The Bandits grow stronger with every blow.`
                )
            )
        )
    }
    
    //Skipping Reidite Lesson
    _handleLessonSkipped = (map, player) => {
        player.collectedItems.addItem(new CeruleanCompass());
        this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
    }
}
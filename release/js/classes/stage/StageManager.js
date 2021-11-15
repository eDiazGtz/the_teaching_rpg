class StageManager{

    static ACTS = {
        BUILD_PLAYER: "build_player",
        BATTLE: "battle",
        GAME_FLOW: "game_flow",
        SCRIPT_TESTER: "script_tester",
        LEAVE_SHOP: "leave_shop",
        LESSONS: "lessons",
        SHOPPING: "shopping",
        STORYTELLER: "storyteller",
        TESTER: "tester",
        TRAVELING: "traveling",
        WAITING_TO_PLAY: "waiting_to_play"
    };

    static EVENTS = {
        BEGIN_ADVENTURE: "begin_adventure",
        BUILD_PLAYER: "build_player",
        BUILD_PLAYER_COMPLETED: "build_player_completed",
        DISPLAY_DIALOG: "display_dialog", // data = displayObject{dialog: [], actionCallback: (action) => {}}; null = clear dialog
        DISPLAY_LESSON: "display_lesson", // data = scene name
        DISPLAY_STORY: "display_story", // data = scene name
        GO_SHOPPING: "go_shopping",
        ITEM_SELECTED: "item_selected",
        LEAVE_SHOP:"leave_shop",
        LESSON_SKIPPED: "lesson_skipped",
        NEXT_QUEST: "next_quest",
        SET_ACT: "set_act", // data = ACTS
        START_GAME: "start_game",
        UPDATE_PLAYER: "update_player",
        UPDATE_OPPONENT: "update_opponent", // data = opponent
        UPDATE_SHOP: "update_shop",
    };

    _battleComponent;
    _buttonClickSound;
    _collectedItems;
    _dialog;
    _eventListener = new EventHandler();
    _gameMaster;
    _lessonsComponent;
    _mapActions;
    _playerBuilder;
    _playerStats;
    _shop;
    _stage;
    _stageMap;
    _showTesterButton = true;
    _storyTeller;
    _tester;
    _theme;


    set troupe(newTroupe) {
        this._stage.querySelectorAll(".troupe").forEach(el => el.style.display = "none")
        this._stage.querySelector(`#${newTroupe}__troupe`).style.display = "block";
    }

    constructor() {

        this._gameMaster = new GameMaster();

        // sounds
        this._buttonClickSound = new Audio();
        this._buttonClickSound.src = "sounds/button_click.mp3";
        this._buttonClickSound.volume = .5;

        document.addEventListener("click", () => {
            if ( !this._theme && this._gameMaster.mode !== GameMaster.MODES.TESTING ) {
                this._theme = new Audio();
                this._theme.src="sounds/theme.mp3";
                this._theme.loop = true;
                this._theme.volume = .05;
                //this._theme.play();
            } else {
                this._buttonClickSound.play();
            }
        })

        // stage components
        this._battleComponent = new BattleComponent("#battle__act", this._gameMaster);
        this._collectedItems = new CollectedItemsComponent("#collected_items", this._gameMaster);
        this._dialog = new DialogComponent(document.querySelector("#dialog"), this._gameMaster);
        this._lessonsComponent = new LessonsComponent("#lessons__act", this._gameMaster);
        this._mapActions = new StageMapActionsComponent("#map__actions", this._gameMaster);
        this._playerBuilder = new PlayerBuilderComponent("#build_player__act", this._gameMaster);
        this._playerStats = new PlayerStatsComponent("#player_stats", this._gameMaster);
        this._stage = document.getElementById("game_area");
        this._stageMap = new StageMapComponent("#map__inner", this._gameMaster);
        this._shop = new StageShopComponent("#shopping__act", this._gameMaster);
        this._storyTeller = new StoryTellerComponent("#storyteller__act", this._gameMaster);
        this._tester = new TesterComponent("#tester__act", this._gameMaster, this._showTesterButton);

        // events
        document.addEventListener(StageManager.EVENTS.BEGIN_ADVENTURE, () => { console.log("begin")
            this._gameMaster.gotoNextQuest();
            this._setAct(StageManager.ACTS.TRAVELING)
        });

        document.addEventListener(StageManager.EVENTS.BUILD_PLAYER_COMPLETED, (e) => {

            let newPlayer = e.detail;
            newPlayer.collectedItems.addItem(new SummoningScroll());
            this._gameMaster.player = newPlayer;
            this._gameMaster.gotoNextQuest();
        });

        document.addEventListener(StageManager.EVENTS.DISPLAY_DIALOG, (e) =>
            this._dialog.displayDialog(e.detail))

        document.addEventListener(StageManager.EVENTS.DISPLAY_LESSON, (e) => 
            this._setAct(StageManager.ACTS.STORYTELLER, "lesson", e.detail));

        document.addEventListener(StageManager.EVENTS.DISPLAY_STORY, (e) => 
            this._setAct(StageManager.ACTS.STORYTELLER, "dialog", e.detail));

        document.addEventListener(StageManager.EVENTS.GO_SHOPPING, () =>
            this._setAct(StageManager.ACTS.SHOPPING));

        document.addEventListener(StageManager.EVENTS.LEAVE_SHOP, () => 
            this._setAct(StageManager.ACTS.TRAVELING));

        document.addEventListener(StageManager.EVENTS.LESSON_SKIPPED, (e) => {
            LessonMaster.lessonCompleted();
            this._setAct(e.detail);
        })

        document.addEventListener(GameMaster.EVENTS.MODE_UPDATED, this._setTestControls)

        document.addEventListener(StageManager.EVENTS.NEXT_QUEST, () => this._gameMaster.gotoNextQuest());
        
        document.addEventListener(GameMaster.EVENTS.PLAYER_DIED, () => {
            this.mode = GameMaster.MODES.GAME_OVER;
            this._dialog.displayDialog(
                new DialogObject(
                    DialogObject.DIALOG_TYPES.ONE_OFF,
                    new ScriptLine("You have died!")
                )
            )
            document.querySelector("#game_over_screen").style.display = "block";
        });

        document.addEventListener(GameMaster.EVENTS.START_BATTLE, (e) => this._setAct(StageManager.ACTS.BATTLE, null, e.detail));

        document.addEventListener(StageManager.EVENTS.SET_ACT, (e) => this._setAct(e.detail));

        document.addEventListener(GameMaster.EVENTS.SORTIE_STARTED, () => {console.log("sortie")
            //this._setAct(StageManager.ACTS.TRAVELING);
        });

        this._stage.querySelector("#begin_game_btn").addEventListener("click", this._beginGame);

        this._setTestControls();

        return this;
    }

    start = () => { 

        this._gameMaster.gotoNextQuest();
        this.troupe = "big_screen";
        this._setAct(StageManager.ACTS.GAME_FLOW, "start_game");
    }

    _beginGame = () => {
        this._setAct(StageManager.ACTS.STORYTELLER, "dialog", new DialogObject(
            DialogObject.DIALOG_TYPES.SCRIPT,
            this._gameMaster.sortie.getScript("intro"),
            () => { 
                if ( !LessonMaster.presentLesson("summoning_scroll", StageManager.ACTS.BUILD_PLAYER) )
                    this._setAct(StageManager.ACTS.BUILD_PLAYER);
            }
        ));
    }

    _setAct = (act, scene, data) => {

        // update HTML
        this._stage.querySelectorAll(".act").forEach(el => el.style.display = "none");
        //this._dialog.displayDialog(new DialogObject(DialogObject.DIALOG_TYPES.CLEAR))
    
        try {
            this._stage.querySelector(`#${act}__act`).style.display = "block";
            console.log(`set act to: ${act}`)
        } catch (error) { console.log(`there is no ${act}__act element`)}

        switch(act) {
            case StageManager.ACTS.BATTLE:
                this.troupe = "play";
                this._battleComponent.scene = BattleComponent.SCENES.SELECT_WEAPONS;
                this._battleComponent.buildComponent(data);// data == mapsquare where enemy is
                break;

            case StageManager.ACTS.BUILD_PLAYER:
                this.troupe = "play";
                this._playerBuilder.buildComponent();
                break;

            case StageManager.ACTS.LESSONS:
                this.troupe = "big_screen";
                this._storyTeller.scene = "dialog";
                this._storyTeller.buildComponent(data, false);
                break;

            case StageManager.ACTS.TRAVELING: 
                    this.troupe = "play";
                    this._stageMap.buildComponent();
                    break;

            case StageManager.ACTS.TESTER: 
                this.troupe = "play";
                this._tester.buildComponent();
                //this._tester.scene = TesterComponent.SCENES.MAIN_MENU;
                /* these lines are needed for most things */
                /* this._gameMaster.player = new Sorcerer();
                this._gameMaster.player.name="Bongo"; */

                /* make any necessary updates */
                /* this._gameMaster.player.inventory.addItem(new Weapon("broadsword", "sword", 1, {min: 1, max: 3}, {min: 1, max: 3}, {min: 1, max: 3}, ""));
                this._gameMaster.player.inventory.addItem(new Weapon("broadsword", "sword", 1, {min: 1, max: 3}, {min: 1, max: 3}, {min: 1, max: 3}, ""));
                this._gameMaster.player.inventory.addItem(new Weapon("broadsword", "sword", 1, {min: 1, max: 3}, {min: 1, max: 3}, {min: 1, max: 3}, ""));
                this._gameMaster.player.inventory.addItem(new Weapon("broadsword", "sword", 1, {min: 1, max: 3}, {min: 1, max: 3}, {min: 1, max: 3}, "")); */
                
                break;

            case StageManager.ACTS.SHOPPING:
                this.troupe = "play";
                this._shop.scene = StageShopComponent.SCENES.VIEW_ITEMS;
                break;

            case StageManager.ACTS.STORYTELLER:
                this.troupe = "big_screen";
                this._storyTeller.scene = scene === "lesson" ? "dialog" : scene;
                this._storyTeller.buildComponent(data, scene === "lesson");
                break;
        }
    }

    _setTestControls = () => {

        if ( this._gameMaster.mode.indexOf("testing") !== -1 )
            document.querySelector(".test_controls").style.display = "block";
        else
            document.querySelector(".test_controls").style.display = "none";
    }
}
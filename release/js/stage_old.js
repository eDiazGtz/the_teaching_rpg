
const ACTS = {
    BUILD_CHARACTER: "build_character",
    BATTLE: "battle",
    LEAVE_SHOP: "leave_shop",
    SHOPPING: "shopping",
    TESTING: "testing",
    TRAVELING: "traveling",
    STORYTELLER: "storyteller",
    WAITING_TO_PLAY: "waiting_to_play"
};

let battleComponent;
let gameMaster = new GameMaster();
let playerBuilder;
let characterCards;
let stageMap;
let stageMapActions;
let stageShop;
let storyTeller;

var ready = (callback) => {
    if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
    
    return

    // elements cannot be assigned like this until the document.ready funciton
    battleComponent = new BattleComponent("#battle_layer", gameMaster)
    playerBuilder = new PlayerBuilderComponent("#waiting_area", gameMaster);
    characterCards = new CharacterCardsComponent("#character_cards", gameMaster);
    stageMap = new StageMapComponent("#map__inner", gameMaster);
    stageShop = new StageShopComponent("#shopping_layer", gameMaster);
    stageMapActions = new StageMapActionsComponent("#map_actions", gameMaster);
    storyTeller = new StoryTellerComponent("#storyteller_layer", gameMaster);

    setArea("waiting_area");

    // event liseners
    battleComponent.eventListener.add(StageManager.EVENTS.FINISHED, () => setAct(ACTS.TRAVELING));

    gameMaster.eventListener.add(GameMaster.EVENTS.GO_SHOPPING, () => setAct(ACTS.SHOPPING)());

    gameMaster.eventListener.add(GameMaster.EVENTS.START_BATTLE, () => setAct(ACTS.BATTLE));

    gameMaster.eventListener.add(GameMaster.EVENTS.START_BATTLE, (state) =>{
        storyTeller.state = state;
        setAct(ACTS.STORYTELLER);
    })

    stageMapActions.eventListener.add(StageManager.EVENTS.GO_SHOPPING, () => setAct(ACTS.SHOPPING)());

    stageShop.eventListener.add(StageManager.EVENTS.LEAVE_SHOP, () => setAct(ACTS.TRAVELING))

    playerBuilder.eventListener.add(StageManager.EVENTS.FINISHED, () => {
        setArea("active_area");
        setAct(ACTS.SHOPPING);
    });

    // start the game
    //playerBuilder.buildComponent(); // <-- uncomment this to make game work
    //this.setAct(ACTS.TESTING)

    storyTeller.state = StoryTellerComponent.STATES.SORT_1;
    setArea("active_area");
    setAct(ACTS.STORYTELLER);
});

showModal = (displayContent) => {
    modalOverlay.display(displayContent);
    setAct(ACTS.MODAL)
}

setAct = ( newAct ) => {
    setStage(newAct);

    switch( newAct ) {
        case ACTS.BATTLE:
            battleComponent.state = battleComponent.STATES.SELECT_WEAPONS;
            break;
        case ACTS.SHOPPING:
            stageShop.buildComponent();
            break;
        case ACTS.TRAVELING:
            stageMap.buildComponent();
            stageMapActions.buildComponent();
            break;
        case ACTS.TESTING:
            setArea("active_area");
            gameMaster.buildWorld(new Barbarian());
            gameMaster.player.name="Bongo";
            //gameMaster.player.inventory.addItem(new Food("bread", 28, 2, 4, ""));
            //gameMaster.player.inventory.addItem(new Food("bread", 28, 2, 4, ""));
            //gameMaster.player.inventory.addItem(new Food("bread", 28, 2, 4, ""));
            setAct(ACTS.SHOPPING)
            break;
    }
}

setArea = (area) => {
    document.querySelectorAll(".game_area").forEach(el => el.style.display = "none") // hide all areas
    document.querySelector(`#${area}`).style.display = "block";
}

setStage = (act) => {
    
    document.querySelectorAll(".act").forEach(el => el.style.display = "none");

    try {
        document.querySelector(`#${act}`).style.display = "block";
    } catch (error) {}
}
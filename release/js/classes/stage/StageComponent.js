class StageComponent {

    static EVENTS = {
        DO_BATTLE: "do_battle",
        ENTER_BATTLE: "enter_battle",
        FINISHED: "finished",
        GO_SHOPPING: "go_shopping",
        ITEM_SELECTED: "item_selected",
        LEAVE_SHOP:"leave_shop",
        SET_ACT: "set_act", // data = ACTS
        UPDATE_PLAYER: "update_player",
        UPDATE_OPPONENT: "update_opponent", // data = opponent
        UPDATE_SHOP: "update_shop",
    }

    eventListener = new EventHandler();

    _gameMaster;
    _stage;

    _active = true;
    get active() {
        if ( this._gameMaster.mode == GameMaster.MODES.FROZEN || this._gameMaster.mode === GameMaster.MODES.GAME_OVER ) return false; // override if component is not being shown.

        return this._active;
    }
    set active(newValue) {
        this._active = newValue;
    }

    _scene;
    get scene() {
        return this._scene;
    }
    set scene(newScene) {
        this._scene = newScene;

        // reveal scene
        this._revealScene(newScene);
        //this.buildComponent();
    }

    constructor(stage, gameMaster) {

        this._stage = document.querySelector(stage);

        this._gameMaster = gameMaster;
    }

    buildComponent = () => window.alert("buildComponent() not implemented");

    _addClass = (selector, className) => this._stage.querySelectorAll(selector).forEach(el => el.classList.add(className));

    _attachEvent = (selector, event, callback) => this._stage.querySelectorAll(selector).forEach(el => el.addEventListener(event, callback));

    _removeClass = (selector, className) => this._stage.querySelectorAll(selector).forEach(el => el.classList.remove(className));

    _revealScene = (sceneName) => {
        this._stage.querySelectorAll(".scene").forEach(el => el.style.display="none");
        this._stage.querySelector(`#${sceneName}__scene`).style.display="block";
    }

    _setElement = (selector, content) => {
        document.querySelector(selector).innerHTML = content.trim();
    }
}
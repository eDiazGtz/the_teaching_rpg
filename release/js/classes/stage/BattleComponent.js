class BattleComponent extends StageComponent {

    static SCENES = {
        SELECT_WEAPONS: "select_weapons",
        DO_BATTLE: "do_battle"
    }

    _battleMapSquare;
    _battleResults;
    _firstAttacker;

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        this._gameMaster.eventListener.add(GameMaster.EVENTS.BATTLE_RESULTS, (results) => {
            console.log(this._battleMapSquare.character)
            this._battleResults = results;
            this.scene = BattleComponent.SCENES.DO_BATTLE;
            this.buildComponent();
        });

        this._attachEvent("#battle_buttons__battle", "click", () => this._gameMaster.doBattle(this._battleMapSquare));
        this._attachEvent("#battle_buttons__retreat", "click", 
            () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING));
        this._attachEvent("#battle_buttons__leave", "click", 
            () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TRAVELING));

        return this;
    }

    buildComponent = (battleMapSquare = null) => {

        if ( battleMapSquare ) this._battleMapSquare = battleMapSquare;

        switch(this.scene) {
            case BattleComponent.SCENES.SELECT_WEAPONS:

                //buttons
                this._setButtons(["battle"])

                // display current attack weapon
                this._stage.querySelector('#chosen_attack_weapon').innerHTML = 
                    this._buildSelectedWeaponDisplay(this._gameMaster.player.attackWeapon, "Attack");

                // list all weapons
                let attackWeaponSelector = new ItemSelectorComponent(
                    "#attack_weapon_selector",
                    this._gameMaster,
                    "attack_weapon_selector",
                    this._gameMaster.player.attackWeapon
                    ).buildComponent();
                
                // listen for selection events
                attackWeaponSelector.eventListener.add(StageManager.EVENTS.ITEM_SELECTED, (itemId) => {
                    this._gameMaster.player.attackWeapon = this._gameMaster.player.inventory.getItem(itemId);
                    this.buildComponent();
                })

                // defense weapon
                this._stage.querySelector('#chosen_defense_weapon').innerHTML = 
                    this._buildSelectedWeaponDisplay(this._gameMaster.player.defenseWeapon, "Defense");

                let defenseWeaponSelector = new ItemSelectorComponent(
                    "#defense_weapon_selector", 
                    this._gameMaster,
                    "defense_weapon_selector",
                    this._gameMaster.player.defenseWeapon
                    ).buildComponent();

                defenseWeaponSelector.eventListener.add(StageManager.EVENTS.ITEM_SELECTED, (itemId) => {
                    this._gameMaster.player.defenseWeapon = this._gameMaster.player.inventory.getItem(itemId);
                    this.buildComponent();
                })
                break;

            case BattleComponent.SCENES.DO_BATTLE:

                let display = this._stage.querySelector("#battle_results");
                display.innerHTML = "";

                this._battleResults.forEach(line => display.innerHTML += (`${line}<br/><br/>`));

                // buttons
                if ( this._battleMapSquare.character ) {
                    this._setButtons(["battle", "retreat"]);
                } else {
                    this._setButtons(["leave"]);
                }

                break;
        }

        // opponent
        this._buildOpponent();

        return this;
    }

    _buildOpponent = () => {

        if ( this._battleMapSquare.character ) {
            this._stage.querySelector("#battle_enemy__image").src = `images/${this._battleMapSquare.character.imageName}.png`;
            this._stage.querySelector("#battle_enemy__name").innerHTML = this._battleMapSquare.character.name;
            this._stage.querySelector("#battle_enemy__stats").innerHTML = this._battleMapSquare.character.getStats();
        } else {
            this._stage.querySelector("#battle_enemy__stats").innerHTML = "DEAD!";
        }
    }

    _buildSelectedWeaponDisplay = (chosenWeapon, typeText) => {
        return chosenWeapon !== null ?
                `
                    <div id="${typeText}:${chosenWeapon.id}" class="item_selector col-12">
                        <div class="item_selector__inner item_selector__inner--inactive row">
                            <div class="col-2 option_selector__row_img">
                                <img src="images/${chosenWeapon.imageName}.png"/>
                            </div>
                            <div class="option_selector__row_data col-10">
                                <div class="option_selector__row_name">${chosenWeapon.name}</div>
                                <div class="option_selector__row_stats">${chosenWeapon.getStats()}</div>
                            </div>
                        </div>
                    </div>
                `
                :
                `
                    <div class="item_selector col-12">
                        <div class="item_selector__inner item_selector__inner--inactive row">
                            <div class="option_selector__row_name">Choose your ${typeText} Weapon!</div>
                        </div>
                    </div>     
                `
    }

    _setButtons = (buttonIDs) => {

        this._stage.querySelectorAll(".battle_button").forEach(el => el.style.display = "none");

        buttonIDs.forEach(id => 
            this._stage.querySelector(`#battle_buttons__${id}`).style.display = "block")
    }
}
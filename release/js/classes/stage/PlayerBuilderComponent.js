class PlayerBuilderComponent extends StageComponent {

    _characterNameInput;
    _finishedButton;
    _selectedCharacter = null;

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        this._finishedButton = this._stage.querySelector("#begin_adventure_btn");
        this._characterNameInput = this._stage.querySelector("#build_character_layer__player_name");

        //
        this._finishedButton.addEventListener("click", () => {
            if ( this._characterNameInput.value.length > 3 && this._selectedCharacter !== null ) {
                this._selectedCharacter.name = this._characterNameInput.value;
                this.eventListener.trigger(StageManager.EVENTS.BUILD_PLAYER_COMPLETED, this._selectedCharacter);
            }
        })

        //this._finishedButton.setAttribute("disabled", true);; // Why does this disable the click event?

        this._characterNameInput.addEventListener("keyup", (e) => { 
            e.preventDefault();
            this._setFinishbutton();
        });

        return this;
    }

    buildComponent = () => {
        var charctersHTML = "";

        this._gameMaster.availablePlayers.forEach((player, index) => {
            charctersHTML += `
                <div class="build_player__character">
                    <div class="character_card character_card--active">
                        <div class="character_card__inner">
                            <img src="images/${player.imageName}.png" alt="${player.race}"/>
                            <div class="">
                                <div class="character_card__name">${player.race}</div>
                                <span class="character_card__stats">
                                    ${player.getStats()}
                                </span>
                            </div>
                            <input type="hidden" class="character_selector__index" value="${index}"/>
                        </div>
                    </div>
                </div>
            `;
        })

        this._setElement("#build_player__characters", charctersHTML);

        this._attachEvent(".character_card--active", "click", (e) => { // character selected
        
            // deselect any selected characters
            this._removeClass(".character_card", "character_card--selected");
            this._addClass(".character_card", "character_card--active");

            // highlight selected character
            e.currentTarget.classList.remove("character_card--active")
            e.currentTarget.classList.add("character_card--selected")

            this._selectedCharacter = this._gameMaster.availablePlayers[e.currentTarget.querySelector(".character_selector__index").value];

            this._setFinishbutton();
        })

        return this;
    }

    _setFinishbutton = () => {
        if (this._characterNameInput.value.length > 3 && this._selectedCharacter !== null) {
            this._finishedButton.classList.remove("stage_btn--disabled");
            this._finishedButton.classList.add("stage_btn--enabled");
        } else {
            this._finishedButton.classList.remove("stage_btn--enabled");
            this._finishedButton.classList.add("stage_btn--disabled");
        }
    }
}
class TesterComponent extends StageComponent {

    static SCENES = {
        MAIN_MENU: "main_menu",
        SCRIPT: "script",
        MAP: "map",
        JUMP_TO_QUEST: "jump_to_quest",
        STORYTELLER: "storyteller"
    }

    _cords;

    constructor(stage, gameMaster, showTesterButton) {
        super(stage, gameMaster);

        this._cords = this._stage.querySelector("#map_tester__cords");

        this._addScriptSlugs();
        this._addSortieSelectors();

        // handle tester button
        if ( showTesterButton ) {
            document.querySelectorAll(".go_to_tester_btn").forEach(btn => {
                btn.style.display = "block";
                btn.addEventListener("click", () => {
                    this.scene = TesterComponent.SCENES.MAIN_MENU;
                    this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TESTER)
                });
            })
        }

        // events
        this._attachEvent("#test_scripts_btn", "click", () => {
            this.scene = TesterComponent.SCENES.SCRIPT;
            this.buildComponent();
        });
        this._attachEvent("#test_map_btn", "click", () => {
            this.scene = TesterComponent.SCENES.MAP;
            this.buildComponent();
        });
        this._attachEvent("#test_quest_btn", "click", () => {
            this.scene = TesterComponent.SCENES.JUMP_TO_QUEST;
            this.buildComponent();
        });
        this._attachEvent(".return_tester_menu_btn", "click", () => {
            this.scene = TesterComponent.SCENES.MAIN_MENU;
            this.buildComponent();
        });
        this._attachEvent("#test_storyteller_btn", "click", () => {
            this.scene = TesterComponent.SCENES.STORYTELLER;
            this.buildComponent();
        });

        this._attachEvent("#script__scene #play_script_btn", "click", () => {
            this.eventListener.trigger(
                StageManager.EVENTS.DISPLAY_DIALOG,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT, 
                    ScriptMaster.getScript(document.querySelector("#script_tester__slugs").value)
                ))
        })

        this._attachEvent("#goto_act_btn", "click", () =>
            this.eventListener.trigger(
                StageManager.EVENTS.SET_ACT,
                this._stage.querySelector("#goto_act_name").value
                )
            );

        this._attachEvent("#tester__act #map__scene button", "click",
            () => this._buildSortieMap(this._stage.querySelector("#map_tester__sortie").value));

        this._attachEvent("#jump_to_quest_btn", "click", (e) => {
            
            //this._gameMaster.gotoNextQuest();
            
            this._gameMaster.jumpToQuest(this._stage.querySelector("#script_tester__quests").value);
            
            /* this.eventListener.trigger(
                StageManager.EVENTS.SET_ACT,
                StageManager.ACTS.TRAVELING
            ) */
            
            this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
        })

        this._attachEvent("#tell_story_btn", "click", () => {

            this.eventListener.trigger(StageManager.EVENTS.DISPLAY_STORY,
                new DialogObject(
                    DialogObject.DIALOG_TYPES.SCRIPT,
                    ScriptMaster.getScript(this._stage.querySelector("#script_tester__stories").value),
                    () => this.eventListener.trigger(StageManager.EVENTS.SET_ACT, StageManager.ACTS.TESTER)
                ))
        });

        this._stage.querySelector("#test_mode").innerHTML = this._gameMaster.mode;
    }

    buildComponent = () => {

        switch ( this._scene ) {
            case TesterComponent.SCENES.MAP:
                this._buildSortieMap();
                break;

            case TesterComponent.SCENES.JUMP_TO_QUEST:
                this._buildQuestsList();
                break;

            case TesterComponent.SCENES.STORYTELLER:
                this._buildStoryteller();
                break;
        }
    }

    _addScriptSlugs = () => {

        let options = "";  
        ScriptMaster.scripts.forEach(script => options += `<option value="${script.slug}">${script.slug}</option>`);
        this._stage.querySelector("#script_tester__slugs").innerHTML = options;
    }

    _addSortieSelectors = () => {

        let options = "";

        this._gameMaster.sorties.forEach(sortie => options += `<option value="${sortie.name}">${sortie.name}</option>"`)
        this._stage.querySelectorAll(".sortie_selector").forEach(el => el.innerHTML = options);
    }

    _buildQuestsList = () => {
        
        let html = "";

        html += `<option value="${this._gameMaster.sortie.quest.name}">${this._gameMaster.sortie.name} -  ${this._gameMaster.sortie.quest.name}</option>`;

        this._gameMaster.sortie.quests.forEach(quest => {
            html += `<option value="${this._gameMaster.sortie.name}">${this._gameMaster.sortie.name} -  ${quest.name}</option>`;
        });

        this._gameMaster.sorties.forEach(sortie => {
            html += `<option value="${sortie.quest.name}">${sortie.name} -  ${sortie.quest.name}</option>`;

            sortie.quests.forEach(quest => {
                html += `<option value="${quest.name}">${sortie.name} -  ${quest.name}</option>`;
            });
        });
        

        this._stage.querySelector("#script_tester__quests").innerHTML = html;
    }

    _buildSortieMap = () => {

        let html = "";

        let map = this._gameMaster.sortie.getMap();

        for ( let y = 0; y < map.length; y ++ ) {
            for ( let x = 0; x < map[0].length; x  ++ ) {
                html += new StageMapSquareComponent("#map_tester__inner", this._gameMaster, map[y][x]).buildComponent();
            }
            html += `<br>`;
        }

        this._stage.querySelector("#map_tester__inner").innerHTML = html;

        this._stage.querySelectorAll(".map_square__inner").forEach(el => {

            let [x, y] = el.id.split(":");
            
            let mapSquare = this._gameMaster.map.getMap()[y][x];

            el.addEventListener("mouseover", () => {

                let HTML = el.id;
                if ( mapSquare.place !== null ) HTML += ` | place: ${mapSquare.place.name}`;
                if ( mapSquare.item !== null ) HTML += ` | item: ${mapSquare.item.name}`;
                if ( mapSquare.barrier !== null ) HTML += ` | barrier: ${mapSquare.barrier._name}`;
                if ( mapSquare.character !== null ) HTML += ` | character: ${mapSquare.character.name}`;
                if ( mapSquare.cover !== null ) HTML += ` | cover: ${mapSquare.cover.imageName}`

                this._stage.querySelector("#map_tester__cords").innerHTML = HTML;
            });

            el.addEventListener("click", (el) => {
                if ( el.target.classList.contains("map_tester__selected_square") ) {
                    el.target.classList.remove("map_tester__selected_square");
                } else {
                    el.target.classList.add("map_tester__selected_square");
                }
            })
        })
    }

    _buildStoryteller = () => {

        let html = "";
        ScriptMaster.scripts.forEach(script => {
            html += `<option value="${script.slug}">${script.slug}</option>`;
        });

        this._stage.querySelector("#script_tester__stories").innerHTML = html;
    }
}
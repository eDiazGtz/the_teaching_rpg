describe("BattleComponent", function() {
    let battleComponent;
    let gameMaster;
    let sampleElement;
    let testArea;
    let weapon;

    beforeEach(() => {
        gameMaster = new GameMaster(100);
        gameMaster.player = new TestPlayer();

        testArea = document.querySelector("#scratch_test");
        testArea.innerHTML = `
                    <div id="battle__act" class="act act__background--visible">
                    <div id="battle_inner">
                        <div id="battle_enemy"></div>
                        <div id="select_weapons__scene" class="scene">
                            <div id="select_weapons__inner">
                                <div id="select_weapons__header">
                                    <div class="weapons_selector__header">Attack Weapon</div>
                                    <div class="weapons_selector__header">Defense Weapon</div>
                                </div>
                                <div id="select_weapons__selected">
                                    <div id="chosen_attack_weapon" class="weapons_selector__chosen_weapon"></div>
                                    <div id="chosen_defense_weapon" class="weapons_selector__chosen_weapon"></div>
                                </div>
                                <div>
                                    <div id="attack_weapon_selector"></div>
                                    <div id="defense_weapon_selector"></div>
                                </div>
                            </div>
                            <div class="content-center mt-2">
                                <button id="battle_continue_btn" class="stage_btn stage_btn--success stage_btn--enabled">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        weapon = new TestWeapon();

        battleComponent = new BattleComponent("#scratch_test", gameMaster);
    })

    describe("buildWeaponsSelectorHTML()", function() {

        it("should display the Exit button correctly", function() {

            gameMaster.player.mapSquare.landscape = 1;
            expect(battleComponent._buildWeaponsSelectorHTML()).not.toContain("battle_retreat_btn");

            gameMaster.player.mapSquare.landscape = null;
            expect(battleComponent._buildWeaponsSelectorHTML()).toContain("battle_retreat_btn");

        })

        it("should display a weapon if attack weapon is set", function() {

            gameMaster.player.attackWeapon = new TestWeapon();
            battleComponent.scene = BattleComponent.SCENES.SELECT_WEAPONS;

            sampleElement = document.querySelector("#chosen_attack_weapon");
            expect(sampleElement).not.toContain("Choose an Attack Weapon");

            expect(sampleElement.innerHTML).toContain(weapon.imageName);
        })

        it("should display if defense weapon is set", function() {

            gameMaster.player.defenseWeapon = new TestWeapon();
            battleComponent.scene = BattleComponent.SCENES.SELECT_WEAPONS;

            sampleElement = document.querySelector("#chosen_defense_weapon");
            expect(sampleElement).not.toContain("Choose an Defense Weapon");
            
            expect(sampleElement.innerHTML).toContain(weapon.imageName);
        })
    })
})
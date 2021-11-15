class PlayerStatsComponent extends StageComponent {

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        document.addEventListener(GameMaster.EVENTS.PLAYER_UPDATED, this.buildComponent);
    }

    buildComponent = () => {

        this._stage.innerHTML = `
            <img src="images/${this._gameMaster.player.imageName}.png">
            <div>
                <div id="player_stats__header">
                    <div id="player_stats__name">${this._gameMaster.player.race}</div>
                    <div id="player_stats__icons">
                        <div id="player_stats__gold" class="gold_bag">${this._gameMaster.player.gold}</div>
                        <div id="player_stats__strength">${this._gameMaster.player.strength}</div>
                    </div>
                </div>
                <hr>
                <div>agility: ${this._gameMaster.player.agility}</div>
                <div>magic: ${this._gameMaster.player.magic}</div>
            </div>
        `
    }
}
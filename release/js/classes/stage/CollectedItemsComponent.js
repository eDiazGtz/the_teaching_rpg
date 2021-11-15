class CollectedItemsComponent extends StageComponent {

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        document.addEventListener(GameMaster.EVENTS.PLAYER_UPDATED, this.buildComponent);
    }

    buildComponent = () => {

        let completed;
        let innerHTML = "";
        let template;
        let usedNames = [];

        [

            ...LessonMaster.completedLessons,
            ...LessonMaster.lessons,
            ...this._gameMaster.player.collectedItems.getItems().map(item => {return {item: item}}),

        ].forEach(entry => {
            if ( usedNames.indexOf(entry.item.name) === -1 ) {
                usedNames.push(entry.item.name);

                completed = this._gameMaster.player.collectedItems.searchForItemByName(entry.item.name) !== null;
                template = `
                    <div id ="${entry.item.id}"
                        class="
                            collected_item 
                            ${completed ? 
                                entry.item.canUse ? "collected_item--collected collected_item--can_use" : "collected_item--collected": ""}
                        ">
                        <img src="images/${entry.item.imageName}.png"/>
                    </div>
                `

                if ( completed && entry.slug ) 
                    innerHTML = template + innerHTML; 
                else 
                    innerHTML += template
                
            }
        });

        this._stage.innerHTML = innerHTML;

        // events
        this._stage
            .querySelectorAll(".collected_item--can_use")
            .forEach((el) => {
                el.addEventListener("click", (e) => {
                    let item = this._gameMaster.player.collectedItems.getItem(el.id);

                    item.use(this._gameMaster.map.getMap(), this._gameMaster.player);
                })
            })
            
    }
}
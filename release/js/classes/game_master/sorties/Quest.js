class Quest { // abstract

    eventListener = new EventHandler();
    itemsRequiredToCompleteQuest = [];
    name;

    _insertPoint = new Point(0,0);
    _sortie;

    constructor(name, sortie, insertPoint, scripts, itemsRequiredToCompleteQuest = []) {

        this._sortie = sortie;
        this._insertPoint = insertPoint;
        this.itemsRequiredToCompleteQuest = itemsRequiredToCompleteQuest;
        this.name = name;

        ScriptMaster.addScripts(sortie.name, scripts);
    }


    //override
    end(map, player) {}

    //override
    insertPlayer(map, player) {
        player.mapSquare = map[this._insertPoint.y][this._insertPoint.x];
    }
    
    //override
    start(map, player) {
        console.log(`new quest: ${this.name}`);
    }

    // return questCompleted = true / false
    //override
    update(map, player){
        
        // check if all required items have been collected.
        let reqItemsCount = this.itemsRequiredToCompleteQuest.length;

        this.itemsRequiredToCompleteQuest.forEach(reqItem => {
            if ( player.collectedItems.searchForItemByName(reqItem.name)) reqItemsCount --;
        })

        return reqItemsCount === 0;
    };

    // update player with required items so the quest can be skipped
    skip(map, player) { 
        this.itemsRequiredToCompleteQuest.forEach(item => player.collectedItems.addItem(item));
    }
}
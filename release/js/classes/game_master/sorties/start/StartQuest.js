class StartQuest extends Quest {

    constructor(sortie) {
        super("sart_quest", sortie, new Point(-1, -1), [], [
            new SummoningScroll()
        ]);
    }
}
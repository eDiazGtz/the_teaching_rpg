class StartSortie extends Sortie {

    playerStartLocation = new Point(0, 0);

    _barriers = [];
    _characters = [];
    _places = [];
    quests = [ new StartQuest(this) ];

    constructor(gameMaster) {
        super(gameMaster, "start_sortie");

        ScriptMaster.addScripts(this.name, [
            new Script(
                "intro",
                [
                    new ScriptLine(
                        "You have been chosen.",
                        "fate"
                    ),
                    "There is a journey that needs taking.",
                    "The darkness approaches and you must restore the light.",
                    "You see before you - the fabric of this world.",
                    "You, alone, have the power to change the world.",
                    "Let Fate gaze upon you, tell me who you are.",
                    `What brings you the most fear?
                    <ul>
                        <li>Things that Destroy</li>
                        <li>Things that Resist Change</li>
                        <li>Things that are Not</li>
                        <li>Things that are Formless</li>
                        <li>Things that Move</li>
                    </ul>`,
                    `What do you treasure above everything?
                    <ul>
                        <li>Power to change others</li>
                        <li>Power of liberty</li>
                        <li>Power over others’ life</li>
                        <li>Power over others</li>
                        <li>Power to attract others</li>
                    </ul>`,
                    `This is who you are? <br>
                        <button class="stage_btn stage_btn--small stage_btn--success stage_btn--enabled">Yes! That's ME!</buttom>
                    `,
                    "You hold no form, no memory, but formlessness is not allowed in this world.",
                    "You must change the world and allow it to give you a form you choose.",

                ]
            )
        ]);
    }
}
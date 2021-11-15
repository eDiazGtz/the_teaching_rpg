class LessonsComponent extends StageComponent {

    static SCENES = {
        ADDITIONAL_PLAYERS: "additional_players",
        BUILD_MAP: "build_map",
        LIST_SHOP_ITEMS: "list_shop_items"
    }

    _act;
    _lessonButtons;

    constructor(stage, gameMaster) {
        super(stage, gameMaster);


        this._lessonButtons = this._stage.querySelector("#lessons__buttons");

        this._attachEvent("#lesson_continue_btn", "click", () => 
            this.eventListener.trigger(StageManager.EVENTS.LESSON_SKIPPED, this._act));
    }

    buildComponent = (detail) => {

        this._revealScene("lesson");

        this._act = detail.act;

        this._lessonButtons.style.display = 
            this._gameMaster.mode === GameMaster.MODES.TESTING_DEMO ? "block" : "none";

        this._stage.querySelector("#lesson__title").innerHTML = detail.lesson.title;
        this._stage.querySelector("#lesson__description").innerHTML = detail.lesson.description;

        this._stage.querySelector("#lesson__exercises").href = detail.lesson.exercisesLink;

        this._stage.querySelector("#lesson__video_inner").innerHTML = 
            detail.lesson.videoLink === null ?
                "<br><br>Video is not yet available."
                :
                `<img href="${detail.lesson.videoLink}"/>`
    }
}
class StoryTellerComponent extends StageComponent {
    
    static SCENES = {
        BEGIN_JOURNEY: "begin_journey",
        DIALOG: "dialog",
        INTRO: "intro"
    }

    _dialogComponent;
    _isLesson;

    constructor(stage, gameMaster) {
        super(stage, gameMaster);

        this._dialogComponent = new DialogComponent(this._stage.querySelector("#dialog__scene"), gameMaster);

        // events
        this._attachEvent("#skip_dialog_btn", "click", () => {
            
            if ( this._isLesson ) {
                
            }
            this._dialogComponent.endDialog();

        });

    }

    buildComponent = (dialogObject, isLesson = true) => {

        this._isLesson = isLesson;
        
        if ( dialogObject ) {
            this._dialogComponent.displayDialog(dialogObject);

            if ( isLesson ) {
                this._stage.querySelector("#skip_dialog_btn").innerHTML = "Go To Lesson";
            } else {
                this._stage.querySelector("#skip_dialog_btn").innerHTML = "Skip";
            }
        }
    }
}
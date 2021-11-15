class DialogObject {

    static DIALOG_TYPES = {
        CONFIRM: "confirm",
        CLEAR: "clear",
        INPUT: "input",
        SCRIPT: "script",
        ONE_OFF: "one_off"
    }

    actionsCallback;
    dialogType;
    content;

    constructor(dialogType, content, actionsCallback) {
        this.actionsCallback = actionsCallback;
        this.dialogType = dialogType;
        this.content = content;
    }
}
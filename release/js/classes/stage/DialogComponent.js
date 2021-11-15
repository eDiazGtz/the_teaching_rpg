class DialogComponent {

    _dialogObject;
    _gameMaster;
    _inner;
    _scriptLines;
    _sprite = null;
    _stage;
    _msPerLine = null; // time per line. Can be adjusted in script lines.

    constructor(stage, gameMaster) {
        this._stage = stage;
        this._gameMaster = gameMaster;
        this._inner = stage.querySelector("#dialog_inner");

        this._inner.addEventListener("click",() => {

            if ( this._dialogObject.dialogType === DialogObject.DIALOG_TYPES.INPUT ) return;

            if ( this._dialogObject.dialogType === DialogObject.DIALOG_TYPES.SCRIPT ) {
                let innerTextArea = this._inner.querySelector("#dialog_inner__text");

                innerTextArea.classList.remove("dialog--show");
                innerTextArea.classList.add("dialog--hide");

                this._nextScriptLine();
                    
            } else if ( this._dialogObject.actionsCallback )
                window.setTimeout(this._dialogObject.actionsCallback, 500)
        });
    }

    displayDialog = (dialogObject) => {

        this._inner.innerHTML = "";
        this._msPerLine = 5000; // default time per line;
        this._sprite = null;

        this._dialogObject = dialogObject;

        if ( dialogObject !== null ) {
            switch ( dialogObject.dialogType ) {
                case DialogObject.DIALOG_TYPES.ONE_OFF:
                    this._sprite = dialogObject.content.sprite;
                    this._displayContent(dialogObject.content.content);
                    break;

                case DialogObject.DIALOG_TYPES.CONFIRM:
                    this._sprite = dialogObject.content.sprite;
                    this._displayContent(
                        `
                            <p id="dialog_confirm">${dialogObject.content.content}</p>
                            <div id="dialog_buttons">
                                <button id="dialog.yes" class="dialog_action stage_btn stage_btn--small stage_btn--success stage_btn--enabled">Yes</button>
                                <button id="dialog.no" class="dialog_action stage_btn stage_btn--small stage_btn--danger stage_btn--enabled">No</button>
                            </div>
                        `
                    )
                    break;

                case DialogObject.DIALOG_TYPES.CLEAR:
                    this._inner.innerHTML = "";
                    break;

                case DialogObject.DIALOG_TYPES.INPUT:
                        this._sprite = dialogObject.content.sprite;
                        this._displayContent(`
                        <p>${dialogObject.content.content}</p>
                        <div id="dialog_buttons">
                            <input id="dialog_input">
                            <button id="dialog_submit" class="stage_btn stage_btn--success">Submit</button>
                        </div>`)
                break;

                case DialogObject.DIALOG_TYPES.SCRIPT:
                    document.querySelector("#dialog_screen__tap_message").style.display="flex";
                    this._scriptLines = [...this._dialogObject.content.lines];
                    this._nextScriptLine();
                    break;
            }
        }
    }

    endDialog = () => {
        this._inner.innerHTML = "";

        if ( this._dialogObject && this._dialogObject.actionsCallback )
            this._dialogObject.actionsCallback()
    }

    _displayContent = (content, completedCallback = null) => {

        let innerTextArea;

        // reset
        this._inner.innerHTML = "";

        // frame line
        content  = `
                <div id="dialog_inner__text" 
                    class="dialog--hide ${this._dialogObject.dialogType === DialogObject.DIALOG_TYPES.SCRIPT ? "dialog--clickable" : ""}">
                    ${
                        content
                            .replace("{player.name}", this._gameMaster.player.name)
                    }
                </div>
                `;

        // add sprite
        if ( this._sprite ) {
            if ( this._sprite.indexOf("player.image") !== -1 ) this._sprite = this._gameMaster.player.imageName;
            
            content = `
                <div id="dialog_inner__image">
                    <img src="images/${this._sprite}.png">
                </div>
                ${content}
            `;
        }

        // add content to stage
        this._inner.innerHTML = content;
        innerTextArea = this._inner.querySelector("#dialog_inner__text");
        innerTextArea.classList.add("dialog--show");

        // add click events to buttons in the dialog box
        this._inner.querySelectorAll(".dialog_action").forEach(el =>
            el.addEventListener("click", (e) => {
                this._dialogObject.actionsCallback(e.currentTarget.id);
                
                // remove if it was a confirm dialog
                if ( this._inner.innerHTML.indexOf("dialog_confirm") > -1 ) {
                    innerTextArea.classList.remove("dialog--show");
                    innerTextArea.classList.add("dialog--hide");
                    innerTextArea.innerHTML = "";
                }
                })
        )

        this._inner.querySelectorAll("#dialog_submit").forEach(el => {
            el.addEventListener("click", (e) => {
                this._dialogObject.actionsCallback(this._inner.querySelector("#dialog_input").value);
            })
        })
    }

    _nextScriptLine = () => {

        // check if there are more lines
        if ( this._scriptLines.length > 0 ) {
            let scriptLine = this._scriptLines.shift();
            
            this._msPerLine = scriptLine.time !== null ? scriptLine.time : this._msPerLine; // update or maintain delay pause
            
            this._sprite = scriptLine.sprite !== null ?  // update or maintain speaker sprite
                scriptLine.sprite === "" ? null
                    : scriptLine.sprite
                : this._sprite;

            this._displayContent(scriptLine.content, this._nextScriptLine);

            if ( this._scriptLines.length === 0 )
                this._stage.querySelector("#dialog_screen__tap_message").style.display="none";

        } else {

            //this._inner.innerHTML = "";


            if ( this._dialogObject.actionsCallback )
                this._dialogObject.actionsCallback()
        }
        
    }
}
class RoyalPendant extends MagicalMapItem {

    constructor(mapPoint) {
        super("Royal Pendant", "", mapPoint, true);
    }

    use(map, player) {
        
        if (LessonMaster.presentLesson("royal_pendant", StageManager.ACTS.BUILD_PLAYER)) return;

        // We need to get Two Inputs from PC for decoder to work.
        this.eventListener.trigger(
            StageManager.EVENTS.DISPLAY_DIALOG,
            new DialogObject(
                DialogObject.DIALOG_TYPES.INPUT,
                new ScriptLine("Enter Message to Decode:"),
                (message_to_decode) => {
                    this.eventListener.trigger(
                        StageManager.EVENTS.DISPLAY_DIALOG,
                        new DialogObject(
                            DialogObject.DIALOG_TYPES.INPUT,
                            new ScriptLine("Enter Number to Rotate By:"),
                            (shift_by) => {

                                // decode
                                let encoded_str = message_to_decode.toUpperCase();

                                let decoded_str = ""

                                for (let i = 0; i < encoded_str.length; i++) {
                                    // each char in the encoded_str should be turned to char
                                    var charCode = encoded_str.charCodeAt(i);
                                    // we should subtract the shift_by value - adding 26 IF less than 65
                                    charCode - shift_by < 65 ? charCode = (charCode - shift_by) + 26 : charCode -= shift_by;
                                    // we should turn resulting number into chat and adding to new string
                                    decoded_str += String.fromCharCode(charCode);
                                }
                                console.log(decoded_str)
                                this.eventListener.trigger(
                                    StageManager.EVENTS.DISPLAY_DIALOG,
                                    new DialogObject(
                                        DialogObject.DIALOG_TYPES.ONE_OFF,
                                        new ScriptLine(`Rotating Message '${message_to_decode}' by ${shift_by} Characters...<br> Decoded Message: ${decoded_str}`)
                                    )
                                )
                                return decoded_str;
                            }
                        )
                    )
                }
            )
        )
    }



}
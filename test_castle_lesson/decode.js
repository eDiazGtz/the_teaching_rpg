// Goal - to decrypt Caesar Cipher with function
// Params string to decode and int to shift alphabet by

// We are decoding

function decode (string_to_decode, shift_by) {
    // charCodes between 65 - 90 (A - Z)
    encoded_str = string_to_decode.toUpperCase();
    
    decoded_str = ""

    for (let i = 0; i < encoded_str.length; i++) {
        // each char in the encoded_str should be turned to char
        charCode = encoded_str.charCodeAt(i);
        // we should subtract the shift_by value - adding 26 IF less than 65
        charCode - shift_by < 65 ? charCode = (charCode - shift_by) + 26 : charCode -= shift_by;
        // we should turn resulting number into chat and adding to new string
        decoded_str += String.fromCharCode(charCode);
    }
    return decoded_str;
}

console.log(decode("stkgdmlw", 14)) //decoded



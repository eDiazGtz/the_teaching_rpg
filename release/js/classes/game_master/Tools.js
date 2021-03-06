class Tools {

    static generateId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }

    static generateRandomNumber = (min, max) => {
       return  Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static rollDie = (sides) => {
        return Math.floor(Math.random() * sides) + 1;
    }
}
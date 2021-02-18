// Range slider
function sliderChange(val) {
    document.getElementById('sliderVal').innerHTML = val;
    generatePassword();
}
// ---   Checkbox status --- //
var actionUpper = true;
var actionLower = true;
var actionNumber = true;
var actionSpecial = true;
var actionAmbigious = true;
// Obtain current checkbox status
function funUpper() {
    var checkBox = document.getElementById("checkUpper");
    actionUpper = (checkBox.checked == true) ? true : false;
    generatePassword();
}
function funLower() {
    var checkBox = document.getElementById("checkLower");
    actionLower = (checkBox.checked == true) ? true : false;
    generatePassword();
}
function funNumber() {
    var checkBox = document.getElementById("checkNumber");
    actionNumber = (checkBox.checked == true) ? true : false;
    generatePassword();
}
function funSpecial() {
    var checkBox = document.getElementById("checkSpecial");
    actionSpecial = (checkBox.checked == true) ? true : false;
    generatePassword();
}
function funAmbigious() {
    var checkBox = document.getElementById("checkAmbigious");
    actionAmbigious = (checkBox.checked == true) ? true : false;
    generatePassword();
}
// ---   Generate Password   --- //
function rngPassGenerator(length) {
    // Check if at least one input is selected
    if (!actionUpper && !actionLower && !actionNumber && !actionSpecial)
        return 'Please select at least one input';
    // Placeholders
    var rngPassword = '';
    var upperChar = '';
    var lowerChar = '';
    var numChar = '';
    var splChar = '';
    // Construct superset of pool of characters based on the user requirement
    if (actionUpper)
        upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (actionLower)
        lowerChar = 'abcdefghijklmnopqrstuvwxyz';
    if (actionNumber)
        numChar = '0123456789';
    if (actionSpecial)
        splChar = '!@#$^&*';
    var charSuperset = upperChar + lowerChar + numChar + splChar;
    // Remove ambigious characters from superset pool if required
    if (actionAmbigious)
        charSuperset = charSuperset.replace(/o|O|0|I|l/g, ''); // `/alpha|beta/g, ''`
    // RNG Password
    var charactersLength = charSuperset.length;
    for (var i = 0; i < length; i++) {
        rngPassword += charSuperset.charAt(Math.floor(Math.random() * charactersLength));
    }
    // Check if requirements are satisfied by generated password -> else: redo
    var check;
    if (actionUpper) {
        check = rngPassword.match(/[A-Z]/);
        if (check == null)
            rngPassGenerator(length);
    }
    if (actionLower) {
        check = rngPassword.match(/[a-z]/);
        if (check == null)
            rngPassGenerator(length);
    }
    if (actionNumber) {
        check = rngPassword.match(/\d/);
        if (check == null)
            rngPassGenerator(length);
    }
    if (actionSpecial) {
        check = rngPassword.match(/W/);
        if (check == null)
            rngPassGenerator(length);
    }
    return rngPassword;
}
function generatePassword() {
    var length = parseInt(document.getElementById('sliderVal').innerHTML);
    document.getElementById('passwordBox').innerHTML = rngPassGenerator(length);
}
// First load generation
generatePassword();
// ---   Copy Password   --- //
function copyPassword() {
    // JS can't even copy data directly. Had to create a spawning-despawning textarea just to copy.
    var copyText = document.getElementById("passwordBox").innerHTML;
    var el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

cpp = ["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","bool","break","case","catch","char","char8_t","char16_t","char32_t","class","compl","concept","const","consteval","constexpr","const_cast","continue","co_await","co_return","co_yield","decltype","default","delete","do","double","dynamic_cast","else","enum","explicit","export","extern","false","float","for","friend","goto","if","inline","int","long","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","private","protected","public","reflexpr","register","reinterpret_cast","requires","return","short","signed","sizeof","static","static_assert","static_cast","struct","switch","synchronized","template","this","thread_local","throw","true","try","typedef","typeid","typename","union","unsigned","using","virtual","void","volatile","wchar_t","while","xor","xor_eq","include"];

function getArray(language) {
    if(language=="cpp"){
        return cpp;
    }
    return undefined;
}

function highlightOnLoad(){
    e = document.querySelectorAll("pre code");
    for(i=0; i < e.length; i++){
        var language = e[i].attributes["lang"];
        if(language!=undefined){
            // get the array
            array = getArray(language.value);
            if(array!=undefined){
                var color = e[i].attributes["color"];
                c = "red";
                if(color!=undefined){
                    c = color.value;
                }
                e[i].innerHTML = colorStringByArray(e[i].innerHTML, array, c);
            }
        }
    }
}

function isDigitChar(ch) {
    return ch >= '0' && ch <= '9';
}

function isAlphabet(ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function isAlphaNumeric(ch) {
    return isDigitChar(ch) || isAlphabet(ch);
}

/**
 * 
 * @param {Helper function to test if the given index has a boundary character.} inputText 
 * @param {*} indexOfChar 
 */
function isThisIndexBelongsToBoundaryCharacter(inputText, indexOfChar){
    if(indexOfChar < 0 || indexOfChar >= inputText.length){
        return true;
    }
    return !isAlphaNumeric(inputText[indexOfChar])
    
}

function colorStringByArray(input, array, color){
    var size = array.length;
    var strLength = input.length;
    var output = ""
    var tokenLength = 0;
    for(i=0,l=strLength;i<strLength;){
        var notFound = true;
        for(idx=0;idx < size; idx++){
            tokenLength = array[idx].length;
            if(l>=tokenLength){
                if(input.substr(i,tokenLength)==array[idx] && isThisIndexBelongsToBoundaryCharacter(input,i+tokenLength) && isThisIndexBelongsToBoundaryCharacter(input, i-1)){
                    output += array[idx].fontcolor(color);
                    i += tokenLength;
                    l -= tokenLength;
                    notFound = false;
                }
            }
        }
        if(notFound){
            output += input[i];
            i++;
            l--;
        }
        notFound = true;
    }
    return output;
}

function applyClassByArray(input, array, className){
    var size = array.length;
    var strLength = input.length;
    var output = ""
    var tokenLength = 0;
    for(i=0,l=strLength;i<strLength;){
        var notFound = true;
        for(idx=0;idx < size; idx++){
            tokenLength = array[idx].length;
            if(l>=tokenLength){
                if(input.substr(i,tokenLength)==array[idx] && isThisIndexBelongsToBoundaryCharacter(input,i+tokenLength) && isThisIndexBelongsToBoundaryCharacter(input, i-1)){
                    output += "<span class=\""+className+"\">"+array[idx]+"</span>";
                    i += tokenLength;
                    l -= tokenLength;
                    notFound = false;
                }
            }
        }
        if(notFound){
            output += input[i];
            i++;
            l--;
        }
        notFound = true;
    }
    return output;
}
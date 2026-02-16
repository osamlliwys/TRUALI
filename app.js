// Cipher mapping based on the provided methodology
const encodeMap = {
    'A': 'Y', 'B': 'Z', 'C': 'A', 'D': 'B', 'E': 'C', 'F': 'D', 'G': 'E', 'H': 'F',
    'I': 'G', 'J': 'H', 'K': 'I', 'L': 'J', 'M': 'K', 'N': 'L', 'O': 'M', 'P': 'N',
    'Q': 'O', 'R': 'P', 'S': 'Q', 'T': 'R', 'U': 'S', 'V': 'T', 'W': 'U', 'X': 'V',
    'Y': 'W', 'Z': 'X'
};

// Create reverse mapping for decoding
const decodeMap = {};
for (let key in encodeMap) {
    decodeMap[encodeMap[key]] = key;
}

// State
let currentMode = 'encode';

// DOM Elements
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const processBtn = document.getElementById('processBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

// Mode switching
encodeBtn.addEventListener('click', () => {
    currentMode = 'encode';
    encodeBtn.classList.add('active');
    decodeBtn.classList.remove('active');
    processBtn.textContent = '🔄 Encode Message';
    processText();
});

decodeBtn.addEventListener('click', () => {
    currentMode = 'decode';
    decodeBtn.classList.add('active');
    encodeBtn.classList.remove('active');
    processBtn.textContent = '🔄 Decode Message';
    processText();
});

// Cipher functions
function encode(text) {
    return text.split('').map(char => {
        const upperChar = char.toUpperCase();
        if (encodeMap[upperChar]) {
            return char === char.toUpperCase() ? encodeMap[upperChar] : encodeMap[upperChar].toLowerCase();
        }
        return char;
    }).join('');
}

function decode(text) {
    return text.split('').map(char => {
        const upperChar = char.toUpperCase();
        if (decodeMap[upperChar]) {
            return char === char.toUpperCase() ? decodeMap[upperChar] : decodeMap[upperChar].toLowerCase();
        }
        return char;
    }).join('');
}

// Process text
function processText() {
    const input = inputText.value;
    if (!input.trim()) {
        outputText.value = '';
        return;
    }
    
    const result = currentMode === 'encode' ? encode(input) : decode(input);
    outputText.value = result;
}

// Event listeners
processBtn.addEventListener('click', processText);

inputText.addEventListener('input', processText);

copyBtn.addEventListener('click', () => {
    if (outputText.value) {
        outputText.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    inputText.focus();
});

// Initialize
inputText.focus();

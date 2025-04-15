document.querySelector('#text-editor .window-dot.red').addEventListener('click', () => {
    document.getElementById('text-editor').classList.add('hidden');
    currentFilePath = null;
});
  
(function makeDraggable(elemId, handleId) {
const elem = document.getElementById(elemId);
const handle = document.getElementById(handleId);
let offsetX = 0, offsetY = 0, isDown = false;

handle.addEventListener('mousedown', (e) => {
    isDown = true;
    offsetX = e.clientX - elem.offsetLeft;
    offsetY = e.clientY - elem.offsetTop;
    handle.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    elem.style.left = (e.clientX - offsetX) + 'px';
    elem.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
    isDown = false;
    handle.style.cursor = 'grab';
});
})('text-editor', 'text-editor-header');
  






let currentFilePath = null;

function openTextEditor(pathArray) {
    let ref = fileSystem['/'];
    for (let i = 1; i < pathArray.length - 1; i++) {
        if (ref.type === 'directory' && ref.contents[pathArray[i]]) {
            ref = ref.contents[pathArray[i]];
        } else {
            alert('Error: Invalid file path.');
            return;
        }
    }

    const filename = pathArray[pathArray.length - 1];
    const file = ref.contents[filename];

    if (file && file.type === 'file') {
        currentFilePath = pathArray;
        document.getElementById('editor-content').value = file.content;
        document.getElementById('text-editor').classList.remove('hidden');
    } else {
        alert('Cannot open file: Not found or not a valid file.');
    }
}

document.getElementById('save-file').addEventListener('click', () => {
    const content = document.getElementById('editor-content').value;

    if (!currentFilePath) {
        alert('Cannot save file.');
        return;
    }
    
    let ref = fileSystem['/'];
    for (let i = 1; i < currentFilePath.length - 1; i++) {
        ref = ref.contents[currentFilePath[i]];
    }
    
    const filename = currentFilePath[currentFilePath.length - 1];
    const file = ref.contents[filename];
    
    if (file && file.type === 'file') {
        file.content = content;
        alert('File saved!');
    } else {
        alert('Failed to save: file no longer exists.');
    }
});
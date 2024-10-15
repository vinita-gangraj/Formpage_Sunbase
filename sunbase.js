const sampleData = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Inut",
        "placeholder": "Enter Your input here",
      
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Select                                                         ",
        "options": ["Select Option", "Select Option", "Select Option"],
        
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Text Area   ",
        "placeholder": "Write text here",
      
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder",
        
    }
];

const formContainer = document.getElementById('form-container');

function renderFormElement(data) {
    const div = document.createElement('div');
    div.className = 'form-element';
    div.draggable = true;
    div.id = data.id;

    // Event listeners for drag-and-drop
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);

    const label = document.createElement('label');
    label.textContent = data.label;

    let input;
    if (data.type === 'input') {
        input = document.createElement('input');
        input.placeholder = data.placeholder;
        input.className ="input"
    } else if (data.type === 'textarea') {
        input = document.createElement('textarea');
        input.placeholder = data.placeholder;
         input.className ="input"
    } else if (data.type === 'select') {
        input = document.createElement('select');
         input.className ="select"
        data.options.forEach(option => {
            const opt = document.createElement('option');
            opt.textContent = option;
            input.appendChild(opt);
        });
    }

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'close';
    removeBtn.onclick = () => div.remove();

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(removeBtn);
    formContainer.appendChild(div);
}

sampleData.forEach(renderFormElement);

document.getElementById('add-input').onclick = () => {
    const newInput = {
        id: generateId(),
        type: 'input',
        label: 'New Input',
        placeholder: 'Enter Your input here',
       
    };
    renderFormElement(newInput);
};

document.getElementById('add-select').onclick = () => {
    const newSelect = {
        id: generateId(),
        type: 'select',
        label: 'New Select',
        options: ['Select Option 1', 'Select Option 2', 'Select Option 3'],
      
    };
    renderFormElement(newSelect);
};

document.getElementById('add-textarea').onclick = () => {
    const newTextarea = {
        id: generateId(),
        type: 'textarea',
        label: 'New Text area',
        placeholder: 'Write text here',
        
    };
    renderFormElement(newTextarea);
};

document.getElementById('save').onclick = () => {
    const updatedForm = Array.from(formContainer.children).map(div => {
        const label = div.querySelector('label').textContent;
        const input = div.querySelector('input, textarea, select');
        const placeholder = input.placeholder || '';
        const options = input.tagName === 'SELECT' ? Array.from(input.options).map(option => option.textContent) : [];

        return {
            id: div.id,
            type: input.tagName.toLowerCase(),
            label: label,
            placeholder: placeholder,
            options: options
        };
    });
    console.log(JSON.stringify(updatedForm, null, 2));
};

function generateId() {
    return 'xxxxxx'.replace(/x/g, () => {
        return (Math.random() * 16 | 0).toString(16);
    });
}

// Drag-and-drop functionality
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedElement) {
        const target = e.target.closest('.form-element');
        if (target && target !== draggedElement) {
            // Swap elements
            formContainer.insertBefore(draggedElement, target.nextSibling);
        }
    }
}

// Adding event listeners to existing elements for drag-and-drop
Array.from(formContainer.children).forEach(div => {
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);
});

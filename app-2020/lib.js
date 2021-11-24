const rootUrl = 'http://localhost:3000/';

function setContent(id, ...elements) {
  const container = document.getElementById(id);

  container.innerHTML = '';

  for (const element of elements) {
    container.appendChild(element);
  }
}

function clearContent(id) {
  setContent(id);
}

function getRowId(id, index) {
  return `${id}_${index}`;
}

function createListItem(listId, element, index) {
  const result = document.createElement('li');
  result.setAttribute("id", getRowId(listId, index))
  result.appendChild(element);

  return result;
}

function setList(listId, elements) {
  const rows = elements.map((element, index) => createListItem(listId, element, index));

  setContent(listId, ...rows);
}

function removeListItem(listId, rowIndex) {
  const row = document.querySelector(`#${getRowId(listId, rowIndex)}`);
  if (row != null) {
    row.onanimationend = e => row.parentElement.removeChild(row);
    row.classList.add('removed')
  }
}

function updateListItem(listId, rowIndex, element) {
  setContent(getRowId(listId, rowIndex), element);
}

function getListItemCount(listId) {
  return document.querySelectorAll(`#${listId} > li`).length;
}

function addListItem(listId, rowIndex, element) {
  const row = createListItem(listId, element, rowIndex);

  document.getElementById(listId).appendChild(row);
}

async function getData(relativeUrl = '') {
  const response = await fetch(`${rootUrl}${relativeUrl}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function deleteData(relativeUrl) {
  const response = await fetch(`${rootUrl}${relativeUrl}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

async function updateData(method, relativeUrl, data) {
  const response = await fetch(
    `${rootUrl}${relativeUrl}`,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

function putData(relativeUrl, data) {
  return updateData('PUT', relativeUrl, data);
}

function postData(relativeUrl, data) {
  return updateData('POST', relativeUrl, data);
}

function createText(text) {
  const label = document.createElement('span');
  label.textContent = text;

  return label;
}

function getInputType(value) {
  // TODO Extract this from the metadata

  if (value instanceof Date) {
    return 'date';
  }

  if (Number.isFinite(value)) {
    return 'number';
  }

  return 'text';
}

function createField(id, value) {
  const result = document.createElement('div');
  result.className = 'field';

  const label = document.createElement('label');
  label.textContent = id;

  result.appendChild(label);

  const input = document.createElement('input');
  input.type = getInputType(value);
  input.id = id;
  input.value = value;
  input.step = 100; // TODO apply this only for numeric inputs
  result.appendChild(input);

  return result;
}

function createPanel(data, buttons) {
  const result = document.createElement('div');
  result.className = 'panel';

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      result.appendChild(createField(key, data[key]));
    }
  }

  const buttonArea = document.createElement('div');
  buttonArea.className = 'buttons';

  for (const button of buttons) {
    buttonArea.appendChild(button);
  }

  result.appendChild(buttonArea);

  return result;
}

function createButton(text, onclick) {
  const result = document.createElement('button');
  result.onclick = onclick;
  result.textContent = text;

  return result;
}

function createLink(text, onclick) {
  const result = document.createElement('a');
  result.href = '#';
  result.textContent = text;
  result.onclick = onclick;

  return result;
}

function createTextInput(id, label) {
  const result = document.createElement('input')
  result.type = 'text';

  return result;
}

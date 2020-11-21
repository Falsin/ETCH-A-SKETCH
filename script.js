const container = document.getElementById('container');
const button = document.querySelector('button');

container.style.border = 'solid red 1px';
container.style.width = '500px';
container.style.height = '500px';

creatAreas();

function creatAreas(value = 16) {
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${value}, 1fr)`;
  for (let i = 1; i <= value ** 2; i++) {
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.border = 'solid red 1px';
    container.appendChild(div);
  }

  eventHover()
}

function eventHover() {
  [...container.children].forEach(item => {
    item.addEventListener('mouseover', () => {
      let minValue = 0;
      let maxValue = 359;
      let result = Math.round(Math.random() * (maxValue - minValue + 1) + minValue - 0.5);
      
      if (item.style.background) {
        let valueOfColor = item.style.background.slice(4, -1).split(', ')
        let minNumber = Math.min(...valueOfColor);
        let maxNumber = Math.max(...valueOfColor);

        let calcLightness = Math.round((minNumber + maxNumber) / 255 / 2 * 100);
        item.style.background = `hsl(${result}, 100%, ${calcLightness - 10}%)`;
      } else {
        item.style.background = `hsl(${result}, 100%, 50%)`;
      }
    })
  });
}

button.addEventListener('mousedown', () => {
  container.style.display = 'none';
  let amount;
  setTimeout(() => {
    amount = prompt('How many squares per side to make the new grid?');
    while (amount > 100) {
      amount = prompt('Sorry, your number must be less than 100.')
    }
    if (amount === null) {
      container.style.display = 'grid';
    }

    for (let i = container.children.length - 1; i >= 0; i--) {
      container.children[i].parentNode.removeChild(container.children[i]);
    }
    creatAreas(+amount);
  }, 1);
})
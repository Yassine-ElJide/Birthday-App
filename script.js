const btn = document.querySelector('#submit');
const body = document.querySelector('tbody');

btn.addEventListener('click', (e) =>{
	e.preventDefault()
	const name = document.querySelector('#name').value;
	const relationship = document.querySelector('#relationship').value;
	const birthday = document.querySelector('#birthday').value ; 
	const person = new Person(name,relationship,birthday);
	if (name === '' || relationship === '' || birthday === '' ){
		UI.showAlert('please fill in all the fields !' , 'error')
	} else {
		UI.addPerson(person);
		UI.showAlert('success' , 'success');
		UI.clearFields();
		Storage.addToStore(person);
	}
})

window.addEventListener('DOMContentLoaded' , () =>{
	UI.displayData();
})
body.addEventListener('click', (e, ) =>{
	UI.removePerson(e.target);
	console.log(e.target.parentElement.parentElement)
	Storage.removeFromStore(e.target.parentElement.parentElement.firstChild.textContent);
})

class Person{
	constructor(name,relationship,birthday,icon){
		this.name = name;
		this.relationship = relationship;
		this.birthday = birthday; 
	}
}

class UI {
	static displayData(){
		const persons = Storage.getData();
		persons.forEach((person) => UI.addPerson(person));
	}
	static addPerson(person){
		const body = document.querySelector('tbody');
		const newRow = document.createElement('tr');
		let data = '';
		data += `<td>${person.name}</td>
				 <td>${person.relationship}</td>
				 <td>${person.birthday}</td>
				 <td><i class="fas fa-minus-circle"></i></td>`
		newRow.innerHTML = data;
		body.appendChild(newRow);
	}
	static removePerson(target){
			if(target.classList.contains('fa-minus-circle')){
				target.parentElement.parentElement.remove();
			}
	}
	static clearFields(){
		document.querySelector('#name').value = '';
		document.querySelector('#relationship').value = '';
		document.querySelector('#birthday').value = ''; 
	}
	static showAlert(message, className){
		const div = document.createElement('div');
		div.classList = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const form = document.querySelector('#form');
		const container = document.querySelector('.container');
		container.insertBefore(div,form);
		setTimeout(() => container.removeChild(div), 1000)
	}

	
}

class Storage {
	static getData(){
		let persons ; 
		if (localStorage.getItem('persons') === null){
			persons = [];
		} else{
			persons = JSON.parse(localStorage.getItem('persons'));
		}
		return persons;
	}

	static addToStore(person){
		const persons = Storage.getData();
		persons.push(person);
		localStorage.setItem('persons', JSON.stringify(persons));
	}

	static removeFromStore(name){
		const persons = Storage.getData();
		persons.forEach((person,index) => {
			if (person.name === name ){
				persons.splice(index,1);
			}
		});
	localStorage.setItem('persons', JSON.stringify(persons));
	}
}

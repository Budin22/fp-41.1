export class Controller {
    constructor(model, view) {
        this.view = view
        this.model = model
        this.submitHandler = this.submitHandler.bind(this)
        this.changeSubmitHandler = this.changeSubmitHandler.bind(this)
        this.contactsHandler = this.contactsHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.loadedHandler = this.loadedHandler.bind(this);
        this.backBtnHandler = this.backBtnHandler.bind(this);
    }

    start() {
        this.view.renderForm(this.model.containerId);
        this.view.renderSearchInput(this.model.containerId);
        this.view.renderNoContacts(this.model.containerId);
        this.view.renderAddContactContainer(this.model.containerId);
        this.form = document.getElementById(this.model.formId)
        this.search = document.getElementById(this.model.searchContainerId)
        this.contactContainer = document.getElementById(this.model.contactsContainerId)
        this.search.addEventListener('click', this.searchHandler);
        this.search.addEventListener('input', this.searchHandler);
        this.form.addEventListener('submit', this.submitHandler);
        this.contactContainer.addEventListener('click', this.contactsHandler);
        window.addEventListener('DOMContentLoaded', this.loadedHandler);
    }

    getDataForm (inputsCollection) {
        if(inputsCollection instanceof NodeList) inputsCollection = Array.from(inputsCollection);
        return inputsCollection.reduce((acc, item) => {
                try {
                    if(item.value.trim() === "") return ;
                    acc[item.name] = item.value;
                    return acc;
                } catch (error) {
                    console.log(error);
                }
            },{}
        );
    }

    submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        const inputs = this.form.querySelectorAll('input, textarea');
        const data = this.getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");

        this.model.setData = data;
        this.view.clearContent(document.getElementById(this.model.contactsContainerId));

        const savedData = this.model.getData;
        savedData.forEach(item => this.view.addContact(this.model.contactsContainerId, item));

        this.form.reset();
        this.view.remove(this.model.noContactsContainerId);

        if(this.model.getData.length === 1){

            const clearBtn = document.getElementById(this.model.searchBtnClearId);
            const searchInput = document.getElementById(this.model.searchInputId);

            clearBtn.removeAttribute('disabled');
            searchInput.removeAttribute('disabled');
        }
    }

    changeSubmitHandler(event) {
        event.stopPropagation();

        const inputs = document.getElementById(this.model.changeFormId).querySelectorAll('input, textarea');
        const data = this.getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");
        this.model.setChangeData = data;
    }

    backBtnHandler(e) {
        if(e.target.getAttribute('data-back')) window.location.reload();
    }

    contactsHandler(event) {
        event.stopPropagation();

        const attribute = event.target.getAttribute('data-action');
        const container = document.getElementById(this.model.containerId);
        const targetId = +event.target.getAttribute('data-id');
        const data = this.model.getData;

        if(attribute === 'info') {
            const dataShow = data.filter(item => item.id === targetId);

            this.view.clearContent(container);
            this.view.renderInfoContact(this.model.containerId, dataShow[0]);
            document.getElementById(this.model.containerId).addEventListener('click', this.backBtnHandler)

        }

        if(attribute === 'change') {
            const dataShow = data.filter(item => item.id === targetId);

            this.view.clearContent(container);
            this.view.renderChangeForm(this.model.containerId, dataShow[0]);
            this.model.changeId = targetId;

            document.getElementById(this.model.changeFormId).addEventListener('submit', this.changeSubmitHandler)
            document.getElementById(this.model.changeFormId).addEventListener('click', this.backBtnHandler)
        }

        if(attribute === 'remove') {
            const oldData = data.filter(item => item.id !== targetId);

            event.target.closest('.cards-container').remove();
            localStorage.setItem(this.model.formId, this.model.toJson(oldData));

            if(data.length === 1) {
                this.model.clearStorage();
                this.view.renderNoContacts(this.model.containerId);

                const clearBtn = document.getElementById('searchInputClear');
                const searchInput = document.getElementById('searchInput');
                clearBtn.setAttribute('disabled', '');
                searchInput.setAttribute('disabled', '');
            }
        }
    }

    loadedHandler() {
        const data = this.model.getData;

        if(data && data.length) {
            this.view.remove(this.model.noContactsContainerId);
            data.forEach(data => this.view.addContact(this.model.contactsContainerId, data));

            const clearBtn = document.getElementById(this.model.searchBtnClearId);
            const searchInput = document.getElementById(this.model.searchInputId);
            clearBtn.removeAttribute('disabled');
            searchInput.removeAttribute('disabled');
        }
    }

    searchHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        const valueNumber = event.target.value.match(/\d/g)?.join('');
        const valueString = event.target.value.match(/\D/gi)?.join('');
        const regexpNum = new RegExp(`${valueNumber}`, 'g');

        localStorage.setItem('search', JSON.stringify(this.model.getData))

        if(event.target instanceof HTMLInputElement) {

            if(valueNumber) {

                const data = JSON.parse(localStorage.getItem('search'));
                const newData = data.filter(item => item.phone.match(regexpNum));

                if(data.length > newData.length) localStorage.setItem('search', JSON.stringify(newData));
            }

            if(valueString) {

                const data = JSON.parse(localStorage.getItem('search'));
                const newData = data.filter(item => item.name.includes(valueString));

                if(data.length > newData.length) localStorage.setItem('search', JSON.stringify(newData));
            }

            this.view.remove(this.model.contactsContainerId);
            this.view.renderAddContactContainer(this.model.containerId);

            const contactContainer = document.getElementById(this.model.contactsContainerId);
            contactContainer.addEventListener('click', this.contactsHandler);

            const savedData = JSON.parse(localStorage.getItem('search'));
            if(savedData.length) savedData.forEach(item => this.view.addContact(this.model.contactsContainerId, item));
        }

        if(event.target instanceof HTMLButtonElement) document.getElementById('searchInput').value = '';
    }
}
export class Controller {
    constructor(model, view) {
        this.view = view
        this.model = model
    }

    start() {

        this.form = this.view.renderForm(this.model.containerId);
        this.search = this.view.renderSearchInput(this.model.containerId);
        this.view.renderNoContacts(this.model.containerId);
        this.contactContainer = this.view.renderAddContactContainer(this.model.containerId);

        this.addListener(this.search, 'click', this.searchHandler)
        this.addListener(this.search, 'input', this.searchHandler)
        this.addListener(this.form, 'submit', this.submitHandler)
        this.addListener(this.contactContainer, 'click', this.contactsHandler)
        this.addListener(window, 'DOMContentLoaded', this.loadedHandler)
    }

    removeListener(element, event, func) {
        element.removeEventListener(event, func);
    }

    addListener(element, event, func) {
        element.addEventListener(event, func);
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

    submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const form = document.getElementById(this.model.formId)
        const inputs = form.querySelectorAll('input, textarea');
        const data = this.getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");

        this.model.setData(data);
        this.view.clearContent(document.getElementById(this.model.contactsContainerId));

        const savedData = this.model.data;
        savedData.forEach(item => this.view.addContact(this.model.contactsContainerId, item));

        form.reset();
        this.view.remove(this.model.noContactsContainerId);

        if(this.model.data.length === 1){

            const clearBtn = document.getElementById(this.model.searchBtnClearId);
            const searchInput = document.getElementById(this.model.searchInputId);

            this.view.removeDisabledAttribute(clearBtn);
            this.view.removeDisabledAttribute(searchInput);
        }
    }

    changeSubmitHandler = event => {
        event.stopPropagation();

        const changeForm = document.getElementById(this.model.changeFormId);
        const inputs = changeForm.querySelectorAll('input, textarea');
        const data = this.getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");
        this.model.setChangeData = data;
        this.removeListener(changeForm, 'submit', this.changeSubmitHandler)
        this.removeListener(changeForm, 'click', this.backBtnHandler)
    }

    backBtnHandler = event => {
        if(event.target.getAttribute('data-back')) {

            const container = document.getElementById(this.model.containerId)

            this.removeListener(container, 'click', this.backBtnHandler)

            window.location.reload();
        }
    }

    contactsHandler = event => {
        event.stopPropagation();

        const attribute = event.target.getAttribute('data-action');
        const container = document.getElementById(this.model.containerId);
        const targetId = +event.target.getAttribute('data-id');
        const data = this.model.data;

        if(attribute === 'info') {
            const dataShow = data.filter(item => item.id === targetId);

            this.removeListener(this.search, 'click', this.searchHandler)
            this.removeListener(this.search, 'input', this.searchHandler)
            this.removeListener(this.form, 'submit', this.submitHandler)
            this.removeListener(this.contactContainer, 'click', this.contactsHandler)

            this.view.clearContent(container);
            this.view.renderInfoContact(this.model.containerId, dataShow[0]);

            this.addListener(container, 'click', this.backBtnHandler)
        }

        if(attribute === 'change') {
            const dataShow = data.filter(item => item.id === targetId);

            this.removeListener(this.search, 'click', this.searchHandler)
            this.removeListener(this.search, 'input', this.searchHandler)
            this.removeListener(this.form, 'submit', this.submitHandler)
            this.removeListener(this.contactContainer, 'click', this.contactsHandler)

            this.view.clearContent(container);
            this.view.renderChangeForm(this.model.containerId, dataShow[0]);
            this.model.changeId = targetId;

            const changeForm = document.getElementById(this.model.changeFormId);

            this.addListener(changeForm, 'submit', this.changeSubmitHandler)
            this.addListener(changeForm, 'click', this.backBtnHandler)
        }

        if(attribute === 'remove') {
            const oldData = data.filter(item => item.id !== targetId);

            event.target.closest('.cards-container').remove();
            localStorage.setItem(this.model.formId, this.model.toJson(oldData));

            if(data.length === 1) {

                this.model.removeStorageItem(this.model.formId);
                this.model.removeStorageItem(this.model.searchKey);

                this.view.renderNoContacts(this.model.containerId);

                const clearBtn = document.getElementById('searchInputClear');
                const searchInput = document.getElementById('searchInput');
                this.view.setDisabledAttribute(clearBtn);
                this.view.setDisabledAttribute(searchInput);
            }
        }
    }

    loadedHandler = () => {
        const data = this.model.data;

        if(data && data.length) {
            this.view.remove(this.model.noContactsContainerId);
            data.forEach(data => this.view.addContact(this.model.contactsContainerId, data));

            const clearBtn = document.getElementById(this.model.searchBtnClearId);
            const searchInput = document.getElementById(this.model.searchInputId);
            clearBtn.removeAttribute('disabled');
            searchInput.removeAttribute('disabled');
        }
    }

    searchHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        if(event.target.classList.contains('searchInput')) {

            const valueNumber = event.target.value.match(/\d/g)?.join('');
            const valueString = event.target.value.match(/\D/gi)?.join('');
            const regexpNum = new RegExp(`${valueNumber}`, 'g');

            this.model.setSearchData(this.model.data)

            if(valueNumber) {
                const data = this.model.searchData;
                const newData = data.filter(item => item.phone.match(regexpNum));

                if(data.length > newData.length) {
                    this.model.setSearchData(newData)
                }
            }

            if(valueString) {
                const data = this.model.searchData;
                const newData = data.filter(item => item.name.includes(valueString));

                if(data.length > newData.length) {
                    this.model.setSearchData(newData)
                }
            }

            const contactsContainer = document.getElementById(this.model.contactsContainerId);
            this.view.clearContent(contactsContainer);

            const savedData = this.model.searchData;

            if(savedData?.length) {
                savedData.forEach(item => this.view.addContact(this.model.contactsContainerId, item));
            }
        }

        if(event.target instanceof HTMLButtonElement) {
            document.getElementById(this.model.searchInputId).value = '';
        }
    }
}
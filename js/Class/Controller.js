export const Controller = (model, view) => {

    view.renderForm(model.containerId);
    view.renderSearchInput(model.containerId);
    view.renderNoContacts(model.containerId);
    view.renderAddContactContainer(model.containerId);

    const form = document.getElementById(model.formId);
    const search = document.getElementById(model.searchContainerId);
    const contactContainer = document.getElementById(model.contactsContainerId);

    const getDataForm = inputsCollection => {
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

    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const inputs = form.querySelectorAll('input, textarea');
        const data = getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");

        model.setData = data;
        view.clearContent(document.getElementById(model.contactsContainerId));

        const savedData = model.getData;
        savedData.forEach(item => view.addContact(model.contactsContainerId, item));

        form.reset();
        view.remove(model.noContactsContainerId);

        if(model.getData.length === 1){

            const clearBtn = document.getElementById(model.searchBtnClearId);
            const searchInput = document.getElementById(model.searchInputId);

            clearBtn.removeAttribute('disabled');
            searchInput.removeAttribute('disabled');
        }
    }

    const changeSubmitHandler = event => {
        event.stopPropagation();

        const inputs = document.getElementById(model.changeFormId).querySelectorAll('input, textarea');
        const data = getDataForm(inputs);

        if(!data) return alert("Нужно заполнить поля!");
        model.setChangeData = data;
    }

    const backBtnHandler = (e) => {
        if(e.target.getAttribute('data-back')) window.location.reload();
    }

    const contactsHandler = event => {
        event.stopPropagation();

        const attribute = event.target.getAttribute('data-action');
        const container = document.getElementById(model.containerId);
        const targetId = +event.target.getAttribute('data-id');
        const data = model.getData;

        if(attribute === 'info') {
            const dataShow = data.filter(item => item.id === targetId);

            view.clearContent(container);
            view.renderInfoContact(model.containerId, dataShow[0]);
            document.getElementById(model.containerId).addEventListener('click', backBtnHandler)

        }

        if(attribute === 'change') {
            const dataShow = data.filter(item => item.id === targetId);

            view.clearContent(container);
            view.renderChangeForm(model.containerId, dataShow[0]);

            model.changeId = targetId;
            document.getElementById(model.changeFormId).addEventListener('submit', changeSubmitHandler)
            document.getElementById(model.changeFormId).addEventListener('click', backBtnHandler)

        }

        if(attribute === 'remove') {
            const oldData = data.filter(item => item.id !== targetId);


            event.target.closest('.cards-container').remove();
            localStorage.setItem(model.formId, model.toJson(oldData));

            if(data.length === 1) {
                model.clearStorage();
                view.renderNoContacts(model.containerId);

                const clearBtn = document.getElementById('searchInputClear');
                const searchInput = document.getElementById('searchInput');
                clearBtn.setAttribute('disabled', '');
                searchInput.setAttribute('disabled', '');
            }
        }
    }

    const loadedHandler = () => {
        const data = model.getData;

        if(data && data.length) {
            view.remove(model.noContactsContainerId);
            data.forEach(data => view.addContact(model.contactsContainerId, data));

            const clearBtn = document.getElementById(model.searchBtnClearId);
            const searchInput = document.getElementById(model.searchInputId);
            clearBtn.removeAttribute('disabled');
            searchInput.removeAttribute('disabled');
        }
    }

    const searchHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        const valueNumber = event.target.value.match(/\d/g)?.join('');
        const valueString = event.target.value.match(/\D/gi)?.join('');
        const regexpNum = new RegExp(`${valueNumber}`, 'g');

        localStorage.setItem('search', JSON.stringify(model.getData))

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

            view.remove(model.contactsContainerId);
            view.renderAddContactContainer(model.containerId);

            const contactContainer = document.getElementById(model.contactsContainerId);
            contactContainer.addEventListener('click', contactsHandler);

            const savedData = JSON.parse(localStorage.getItem('search'));
            if(savedData.length) savedData.forEach(item => view.addContact(model.contactsContainerId, item));
        }

        if(event.target instanceof HTMLButtonElement) document.getElementById('searchInput').value = '';
    }

    search.addEventListener('click', searchHandler);
    search.addEventListener('input', searchHandler);
    form.addEventListener('submit', submitHandler);
    contactContainer.addEventListener('click', contactsHandler);
    window.addEventListener('DOMContentLoaded', loadedHandler);
}
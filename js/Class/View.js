export class View {
    constructor() {}

    renderForm(containerId) {
        const container = document.getElementById(containerId)
        const form = document.createElement('form');
        form.classList.add('col-5', 'mb-4');
        form.setAttribute('data-container', "inputForm");
        form.setAttribute('id', "form");
        form.innerHTML = `<div class="mb-3">
                             <label class="form-label">Name</label>
                             <input type="text" name="name" class="form-control">
                         </div>
                         <div class="mb-3">
                             <label class="form-label">Phone number</label>
                             <input type="number" name="phone" class="form-control">
                         </div>
                         <div class="mb-3">
                             <label class="form-label">Position</label>
                             <input type="text" name="position" class="form-control">
                         </div>
                         <button type="submit" class="btn btn-primary">Add contact</button>`
        container.append(form);

        return form
    }

    renderSearchInput(containerId) {
        const container = document.getElementById(containerId)
        const searchForm = document.createElement('form');
        searchForm.classList.add('row', 'g-3');
        searchForm.setAttribute('id', "search");
        searchForm.innerHTML = `<div class="col-5">
                                    <label  class="visually-hidden">Search</label>
                                    <input type="text" class="form-control searchInput" id="searchInput"  placeholder="Search" disabled>
                                </div>
                                <select class="form-select mb-3 col-2 searchSelect" id="searchSelect" style="max-width: 105px" disabled>
                                    <option value="name">Name</option>
                                    <option value="number">Number</option>
                                </select>
                                <div class="col-auto gap-2">
                                    <button type="submit" class="btn btn-primary mb-3 clear" id="searchInputClear" disabled>Clear</button>
                                </div>`
        container.append(searchForm);

        return searchForm
    }

    renderNoContacts(containerId) {
        const container = document.getElementById(containerId)
        const div = document.createElement('div');
        div.classList.add('row');
        div.setAttribute('id', "noContact");
        div.innerHTML = `<div class="col-sm-7 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">No phone numbers</h5>
                                </div>
                            </div>
                        </div>`
        container.append(div)
    }

    renderAddContactContainer(contactsContainerId) {
        const container = document.getElementById(contactsContainerId)
        const contactsContainer = document.createElement('div');
        contactsContainer.classList.add('row');
        contactsContainer.setAttribute('id', `addContactContainer`);
        container.append(contactsContainer)

        return contactsContainer
    }

    addContact(contactsContainerId, data) {
        const container = document.getElementById(contactsContainerId)
        const div = document.createElement('div');
        div.classList.add('col-sm-7', 'mb-4', 'cards-container');
        div.setAttribute('data-id', `${data.id}`);
        div.innerHTML = `<div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <p class="card-text">${data.phone}</p>
                                <p class="card-text">${data.position}</p>
                                <div class="d-grid gap-2 d-md-block">
                                    <button class="btn btn-primary" type="button" data-id=${data.id} data-action="info">Info</button>
                                    <button class="btn btn-primary" type="button" data-id=${data.id} data-action="change">Change</button>
                                    <button class="btn btn-primary" type="button" data-id=${data.id} data-action="remove">Remove</button>
                                </div>
                            </div>
                        </div>`
        container.append(div)
    }

    renderChangeForm(containerId, data) {
        const container = document.getElementById(containerId)
        const div = document.createElement('div');
        div.classList.add('col-5', 'mb-4');
        div.setAttribute('data-container', "changeContactContainer");
        div.innerHTML = `<form id="changeForm">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" name="name" class="form-control" value=${data.name}>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone number</label>
                                <input type="number" name="phone" class="form-control" value=${data.phone}>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Position</label>
                                <input type="text" name="position" class="form-control" value=${data.position}>
                            </div>
                            <div class="d-grid gap-2 d-md-block">
                                <button type="submit" class="btn btn-primary">Change</button>
                                <a type="button" class="btn btn-primary" data-back="true">Back</a>
                            </div>
                        </form>`
        container.append(div)
    }

    renderInfoContact(containerId, data) {
        const container = document.getElementById(containerId)
        const div = document.createElement('div');
        div.classList.add('row');
        div.setAttribute('data-container', "infoContactContainer");
        div.setAttribute('data-id', `${data.id}`);
        div.innerHTML = `<div class="col-sm-7 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${data.name}</h5>
                                    <p class="card-text">${data.phone}</p>
                                    <p class="card-text">${data.position}</p>
                                    <div class="d-grid gap-2 d-md-block">
                                        <a href="#" type="button" class="btn btn-primary" data-back="true">Back</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
        container.append(div)
    }

    clearContent(element) {
        element.innerHTML = ``;
    }

    remove(containerId) {
        const container = document.getElementById(containerId);
        if(container) {
            container.remove()
        }
    }
    setDisabledAttribute(element) {
        element.setAttribute('disabled', '')
    }

    removeDisabledAttribute(element) {
        element.removeAttribute('disabled')
    }

}
export class View {
    constructor() {}

    renderForm(containerId) {
        const container = document.getElementById(containerId)
        const div = document.createElement('div');
        div.classList.add('col-5', 'mb-4');
        div.setAttribute('data-container', "inputForm");
        div.innerHTML = `<form id="form">
                            <div class="mb-3">
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
                            <button type="submit" class="btn btn-primary">Add contact</button>
                        </form>`
        container.append(div)
    }

    renderSearchInput(containerId) {
        const container = document.getElementById(containerId)
        const div = document.createElement('div');
        div.classList.add('row', 'g-3');
        div.setAttribute('id', "search");
        div.innerHTML = `<div class="col-5">
                             <label  class="visually-hidden">Search</label>
                             <input type="text" class="form-control" id="searchInput"  placeholder="Search" disabled>
                         </div>
                         <div class="col-auto">
                             <button type="submit" class="btn btn-primary mb-3" id="searchInputClear" disabled>Clear</button>
                         </div>`
        container.append(div)
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
        const div = document.createElement('div');
        div.classList.add('row');
        div.setAttribute('id', `addContactContainer`);
        container.append(div)
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
                                <label class="form-label">${data.name}</label>
                                <input type="text" name="name" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${data.phone}</label>
                                <input type="number" name="phone" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">${data.position}</label>
                                <input type="text" name="position" class="form-control">
                            </div>
                            <div class="d-grid gap-2 d-md-block">
                                <button type="submit" class="btn btn-primary">Change</button>
                                <a type="button" class="btn btn-primary" data-back="true">Back</a>
                            </div>
<!--                             <button type="submit" class="btn btn-primary">Change</button> -->
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
}
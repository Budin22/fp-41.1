export class Model {
    constructor() {
        this.containerId = 'container'
        this.formId = 'form'
        this.changeFormId = 'changeForm'
        this.noContactsContainerId = 'noContact'
        this.contactsContainerId = 'addContactContainer'
        this.searchContainerId = 'search'
        this.searchInputId = 'searchInput'
        this.searchBtnClearId = 'searchInputClear'
        this.changeId = null
    }

    toJson(data) {
        return JSON.stringify(data)
    }

    set setChangeData(data) {
        const savedData = this.getData;
        data.id = this.changeId;
        const oldData = savedData.filter(item => item.id !== data.id)
        oldData.push(data)
        oldData.sort((a,b) => a.name > b.name ? 1 : -1)

        localStorage.setItem(this.formId, this.toJson(oldData))
    }

    set setData(data) {
        const savedData = this.getData;
        const dataContainer = savedData ? savedData : [];
        if(dataContainer.length){
            data.id = dataContainer[dataContainer.length-1].id + 1;
        } else {
            data.id = 1;
        }

        dataContainer.push(data)
        dataContainer.sort((a,b) => a.name > b.name ? 1 : -1)
        localStorage.setItem(this.formId, this.toJson(dataContainer))
    }

    get getData() {
        return JSON.parse(localStorage.getItem(this.formId));
    }

    clearStorage() {
        localStorage.clear()
    }


}
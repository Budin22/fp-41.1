export class Model {
    constructor() {
        this.containerId = 'container'
        this.formId = 'form'
        this.changeFormId = 'changeForm'
        this.noContactsContainerId = 'noContact'
        this.contactsContainerId = 'addContactContainer'
        this.searchKey = 'search'
        this.searchInputId = 'searchInput'
        this.searchSelect = 'searchSelect'
        this.searchBtnClearId = 'searchInputClear'
        this.changeId = null
    }

    toJson(data) {
        return JSON.stringify(data)
    }

    set setChangeData(data) {
        const savedData = this.data;
        data.id = this.changeId;
        const oldData = savedData.filter(item => item.id !== data.id)
        oldData.push(data)
        oldData.sort((a,b) => a.name > b.name ? 1 : -1)

        localStorage.setItem(this.formId, this.toJson(oldData))
    }

    setSearchData(data) {
        localStorage.setItem(this.searchKey, JSON.stringify(data))
    }

    get searchData() {
        return JSON.parse(localStorage.getItem(this.searchKey));
    }

    setData(data) {
        const savedData = this.data;
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

    get data() {
        return JSON.parse(localStorage.getItem(this.formId));
    }

    removeStorageItem(itemKey) {
        localStorage.removeItem(itemKey)
    }


}
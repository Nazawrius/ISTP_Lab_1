import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/Genre__c.Name'
import yocf from '@salesforce/schema/Genre__c.Year_Of_Creation__c'
import df from '@salesforce/schema/Genre__c.Description__c'

import getGenres from '@salesforce/apex/GenreController.getGenres'
import deleteGenre from '@salesforce/apex/GenreController.deleteGenre'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Year Of Creation', fieldName: yocf.fieldApiName, type: 'integer' },
    { label: 'Description', fieldName: df.fieldApiName, type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class GenresList extends LightningElement {
    columns = COLUMNS;
    @wire(getGenres)
    genres;

    genreId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, yocf, df]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.genreId = row.Id;

        switch(actionName) {
            case 'view':
                this.selected = true;
                this.view = true;
                this.create = false;
                this.edit = false;
                break;
            case 'edit':
                this.selected = true;
                this.view = false;
                this.create = false;
                this.edit = true;
                break;
            case 'delete':
                deleteGenre(genreId);
                break;
            default:
        }
    }

    handleSave() {
        this.view = true;
        this.create = false;
        this.edit = false;
    }

    handleClick() {
        this.view = false;
        this.create = true;
        this.edit = false;
        this.selected = true;
    }

    handleCancel() {
        this.view = false;
        this.create = false;
        this.edit = false;
        this.selected = false;
    }
}
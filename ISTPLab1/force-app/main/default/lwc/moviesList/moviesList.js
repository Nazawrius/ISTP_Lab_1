import { LightningElement, wire } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Movie__c.Name'
import LENGTH_FIELD from '@salesforce/schema/Movie__c.Length__c'
import RELEASE_DATE__FIELD from '@salesforce/schema/Movie__c.Release_Date__c'
import SYNOPSIS_FIELD from '@salesforce/schema/Movie__c.Synopsis__c'
import BOX_OFFICE_FIELD from '@salesforce/schema/Movie__c.Box_Office__c'
import BUDGET_FIELD from '@salesforce/schema/Movie__c.Budget__c'

import getMovies from '@salesforce/apex/MovieController.getMovies'
import deleteMovie from '@salesforce/apex/MovieController.deleteMovie'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Length', fieldName: LENGTH_FIELD.fieldApiName, type: 'text' },
    { label: 'Release Date', fieldName: RELEASE_DATE__FIELD.fieldApiName, type: 'date' },
    { label: 'Synopsis', fieldName: SYNOPSIS_FIELD.fieldApiName, type: 'text' },
    { label: 'Box Office', fieldName: BOX_OFFICE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Budget', fieldName: BUDGET_FIELD.fieldApiName, type: 'currency' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class MoviesList extends LightningElement {
    columns = COLUMNS;
    @wire(getMovies)
    movies;

    movieId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[NAME_FIELD, LENGTH_FIELD, RELEASE_DATE__FIELD, SYNOPSIS_FIELD, BOX_OFFICE_FIELD, BUDGET_FIELD]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.movieId = row.Id;

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
                deleteMovie(movieId);
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

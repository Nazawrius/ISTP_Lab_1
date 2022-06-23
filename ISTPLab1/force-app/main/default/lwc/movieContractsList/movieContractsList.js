import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/Movie_Contract__c.Name'
import mf from '@salesforce/schema/Movie_Contract__c.Movie__c'
import af from '@salesforce/schema/Movie_Contract__c.Actor__c'
import rf from '@salesforce/schema/Movie_Contract__c.Role__c'

import getMovieContracts from '@salesforce/apex/MovieContractController.getMovieContracts'
import deleteMovieContract from '@salesforce/apex/MovieContractController.deleteMovieContract'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Movie', fieldName: mf.fieldApiName, type: 'text' },
    { label: 'Actor', fieldName: af.fieldApiName, type: 'text' },
    { label: 'Role', fieldName: rf.fieldApiName, type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class MovieContractsList extends LightningElement {
    columns = COLUMNS;
    @wire(getMovieContracts)
    movieContracts;

    movieContractId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, mf, af, rf]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.movieContractId = row.Id;

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
                deleteMovieContract(movieContractId);
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
import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/Favourite_Movie__c.Name'
import mf from '@salesforce/schema/Favourite_Movie__c.Movie__c'
import uf from '@salesforce/schema/Favourite_Movie__c.User__c'

import getFavouriteMovies from '@salesforce/apex/FavouriteMovieController.getFavouriteMovies'
import deleteFavouriteMovie from '@salesforce/apex/FavouriteMovieController.deleteFavouriteMovie'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Movie', fieldName: mf.fieldApiName, type: 'text' },
    { label: 'User', fieldName: uf.fieldApiName, type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class FavouriteMoviesList extends LightningElement {
    columns = COLUMNS;
    @wire(getFavouriteMovies)
    favouriteMovies;

    favouriteMovieId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, mf, uf]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.favouriteMovieId = row.Id;

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
                deleteFavouriteMovie(favouriteMovieId);
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
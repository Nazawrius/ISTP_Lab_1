import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/Movie_Genre__c.Name'
import mf from '@salesforce/schema/Movie_Genre__c.Movie__c'
import gf from '@salesforce/schema/Movie_Genre__c.Genre__c'

import getMovieGenres from '@salesforce/apex/MovieGenreController.getMovieGenres'
import deleteMovieGenre from '@salesforce/apex/MovieGenreController.deleteMovieGenre'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Movie', fieldName: mf.fieldApiName, type: 'text' },
    { label: 'Genre', fieldName: gf.fieldApiName, type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class MovieGenresList extends LightningElement {
    columns = COLUMNS;
    @wire(getMovieGenres)
    movieGenres;

    movieGenreId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, mf, gf]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.movieGenreId = row.Id;

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
                deleteMovieGenre(movieGenreId);
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
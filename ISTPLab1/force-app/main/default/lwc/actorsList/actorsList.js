import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/Actor__c.Name'
import gf from '@salesforce/schema/Actor__c.Gender__c'
import bdf from '@salesforce/schema/Actor__c.Birth_Date__c'
import bpf from '@salesforce/schema/Actor__c.Birth_Place__c'
import bf from '@salesforce/schema/Actor__c.Biography__c'

import getActors from '@salesforce/apex/ActorController.getActors'
import deleteActor from '@salesforce/apex/ActorController.deleteActor'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Gender', fieldName: gf.fieldApiName, type: 'text' },
    { label: 'Birth Date', fieldName: bdf.fieldApiName, type: 'date' },
    { label: 'Birth Place', fieldName: bpf.fieldApiName, type: 'text' },
    { label: 'Biography', fieldName: bf.fieldApiName, type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class ActorsList extends LightningElement {
    columns = COLUMNS;
    @wire(getActors)
    actors;

    actorId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, gf, bdf, bpf, bf]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.actorId = row.Id;

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
                deleteActor(actorId);
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
import { LightningElement, wire } from 'lwc';

import nf from '@salesforce/schema/User__c.Name'
import gf from '@salesforce/schema/User__c.Gender__c'
import ef from '@salesforce/schema/User__c.Email__c'
import af from '@salesforce/schema/User__c.Age__c'

import getUsers from '@salesforce/apex/UserController.getUsers'
import deleteUser from '@salesforce/apex/UserController.deleteUser'


const ACTIONS = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: nf.fieldApiName, type: 'text' },
    { label: 'Gender', fieldName: gf.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: ef.fieldApiName, type: 'text' },
    { label: 'Age', fieldName: af.fieldApiName, type: 'integer' },
    {
        type: 'action',
        typeAttributes: { rowActions: ACTIONS },
    },
];

export default class UsersList extends LightningElement {
    columns = COLUMNS;
    @wire(getUsers)
    users;

    userId;
    selected = false;
    view = false;
    create = false;
    edit = false;
    fields=[nf, gf, ef, af]

    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.userId = row.Id;

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
                deleteUser(userId);
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
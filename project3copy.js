import { LightningElement, api, track, wire } from 'lwc';
import getLeadSourceValue from '@salesforce/apex/RelatedObjectApexClass1.getLeadSourceValue';
import getOpportunityStageValue from '@salesforce/apex/RelatedObjectApexClass1.getOpportunityStageValue';
import methodOnclickCon from '@salesforce/apex/RelatedObjectApexClass1.methodOnclickCon'; //getContacts
import methodOnOpp from '@salesforce/apex/RelatedObjectApexClass1.methodOnOpp';
import getNewConType from '@salesforce/apex/RelatedObjectApexClass1.getNewConType';
import getNewOppType from '@salesforce/apex/RelatedObjectApexClass1.getNewOppType';
// import { refreshApex } from "@salesforce/apex";
// import { getRecordNotifyChange } from "lightning/uiRecordApi";


import { NavigationMixin } from "lightning/navigation";


export default class Project3 extends NavigationMixin(LightningElement) {
    @api recordId;
    @track OpportunityId;

    @track contacts;

    @track opportunities;
    @track getLeadSourceValues;
    @track getStageNameValues;

    @track selectedConAccId1;
    @track contactType1;
    @track clickedValue;
    @track uniqueforAccouid;
    @track uniqueforLeadSourceType;
    @track uniqueforOppAccountid;
    @track uniqueforOppStage;
    // @track forSpinner;
    @track isLoading = false;
    btnClick(event) {

        var Contacttype = event.currentTarget.dataset.id; //lead source value aagyi on filter hutton click
        var selectedConAccId = event.target.value;
        this.uniqueforAccouid = selectedConAccId;
        this.uniqueforLeadSourceType = Contacttype;
        console.log('selectedConAccId-----', JSON.stringify(selectedConAccId));
        console.log('Contacttype---', JSON.stringify(Contacttype));
        // @wire(methodOnclickCon, {accountId:selectedConAccId})
        // contact;
        // async handleSave()
        // @wire 
        methodOnclickCon({ accountId: selectedConAccId, ConLeadSource: Contacttype })
            .then(res => {
                var temp = JSON.parse(JSON.stringify(res)); //bs cloning hi hui h ek tarah
                this.contacts = temp;
                console.log('methodOnclickCon res data+++++++--', JSON.stringify(this.contacts));
            })
            .catch(error => {
                console.log('re error is', JSON.stringify(error));

            })

    }

    // async 
    getValue(event) {
        console.log('getvalue-----');
        const OnclickedValue = event.currentTarget.dataset.id;
        console.log('OnclickedValueIS---', JSON.stringify(OnclickedValue));
        var selectedConAccIdA = event.target.value;
        // console.log('wait');
        // this.isLoading = !this.isLoading;
        // window.setTimeout(this.switchIsLoading, 1000);
        // switchIsLoading() {
        //     this.isLoading = false;
        // }

         // true ---------
        //  this.isLoading=true;
        //  console.log('isloading',this.isLoading);
        getNewConType({ conaccountId: selectedConAccIdA, OnclickedLeadSource: OnclickedValue, accountId: this.uniqueforAccouid, ConLeadSource: this.uniqueforLeadSourceType }) //async k liye

            .then(response => {

                var temp = JSON.parse(JSON.stringify(response)); //bs cloning hi hui h ek tarah           
                this.contacts = temp;
                console.log('AFTER NEW res data+++++--', JSON.stringify(this.contacts));
                
                this.isLoading=false;
                // this.forSpinner=OnclickedValue;
                // console.log('wait');
                // this.isLoading = !this.isLoading;
                // window.setTimeout(this.switchIsLoading, 1000);


            })

            .catch(error => {
                console.log('here is your new  error+++----', JSON.stringify(error));
            })
        // this.forSpinner=OnclickedValue;
        // console.log('wait');
        //  this.isLoading = !this.isLoading;
        //  window.setTimeout(this.switchIsLoading, 1000);


        // getRecordNotifyChange([{recordId: this.recordId}]);
        // refre
    }
    // switchIsLoading() {
    //     this.isLoading = false;
    // }
    btnOPPClick(event) {
        const Opptype = event.currentTarget.dataset.id;
        console.log('Opptype-', JSON.stringify(Opptype));
        const selectedOppAccId = event.target.value;
        console.log('selectedOppAccId', JSON.stringify(selectedOppAccId));
        this.uniqueforOppAccountid = selectedOppAccId;
        this.uniqueforOppStage = Opptype;
        methodOnOpp({ accountId: selectedOppAccId, OppStage: Opptype })
            .then(response => {
                var temp = JSON.parse(JSON.stringify(response)); //bs cloning hi hui h ek tarah
                this.opportunities = temp;
                console.log('res data--', JSON.stringify(this.opportunities));

            })
            .catch(error => {
                console.log(' Opportunity error is', JSON.stringify(error));
            })

    }

    getOppValue(event) {
        console.log('In the opportunity event');
        const OnclickedOppValue = event.currentTarget.dataset.id;
        console.log('OnclickedOppValue-', JSON.stringify(OnclickedOppValue));
        var selectedOppAccId = event.target.value;
        console.log('selectedOppAccId-----', JSON.stringify(selectedOppAccId));
        getNewOppType({ OppaccountId: selectedOppAccId, OnclickedStageValue: OnclickedOppValue, accountId: this.uniqueforOppAccountid, OppStage: this.uniqueforOppStage })
            .then(response => {
                console.log('here is your new opp response-------->>', JSON.stringify(response));
                var temp = JSON.parse(JSON.stringify(response)); //bs cloning hi hui h ek tarah
                // var oppList = [];

                // for (var i = 0; i < temp.length; i++) {
                //     const OppName = temp[i].Name;
                //         const OppStageName = temp[i].StageName;
                //         const OppAmount = temp[i].Amount;
                //         var OppId = temp[i].Id;
                //         oppList.push({ OppName, OppStageName, OppAmount, OppId });
                //     console.log('oppList.push', JSON.stringify(oppList));

                // }


                this.opportunities = temp;
                console.log('res data--', JSON.stringify(this.opportunities));

            })
            .catch(error => {
                console.log(' New Opportunity error is', JSON.stringify(error));

            })

    }


    connectedCallback() {

        // FETCHING DATA FROM getLeadSourceValue TO GET PICKLIST VALUES FROM CONTACTS
        getLeadSourceValue()
            .then(result => {

                this.getLeadSourceValues = result;

            })
            .catch(error => {
                console.log('getLeadSourceValue error is', JSON.stringify(error));
            })

        //Fetching getOpportunityStageValue to get picklst value from stageName
        getOpportunityStageValue()
            .then(result => {
                // console.log('getStageNameValues is:', JSON.stringify(result));
                this.getStageNameValues = result;
                // console.log('this.getLeadSourceValues' + JSON.stringify(this.getStageNameValues));

            })
            .catch(error => {
                console.log('getLeadSourceValue error is', JSON.stringify(error));
            })


    }

    handleNavigate(event) {
        // const selectedRecordId = event.target.name;
        const selectedRecordId = event.target.dataset.id;
        console.log('handleNavigatre', JSON.stringify(selectedRecordId));
        const config = {
            type: "standard__recordPage",
            attributes: {

                recordId: selectedRecordId,
                objectApiName: "Opportunity",
                actionName: "edit"
            }
        };
        this[NavigationMixin.Navigate](config);
    }
    handleNavigateContact(event) {
        const selectedRecordId = event.target.dataset.id;
        console.log('handleNavigatre', JSON.stringify(selectedRecordId));
        const config = {
            type: "standard__recordPage",
            attributes: {

                recordId: selectedRecordId,
                objectApiName: "Contact",
                actionName: "edit"
            }
        };
        this[NavigationMixin.Navigate](config);
    }


    navigateToViewContactPage(event) {
        var selectedConRecordId = event.target.dataset.id;

        this[NavigationMixin.GenerateUrl]({   //GenerateUrl
            type: 'standard__webPage',

            attributes: {
                url: 'https://s2labscom7-dev-ed.lightning.force.com/lightning/r/Contact/' + selectedConRecordId + '/view'
            }
        })
            .then(generatedUrl => {
                window.open(generatedUrl);
            })
    }

    navigateToViewOpportunityPage(event) {
        var selectedOppRecordId = event.target.dataset.id;

        this[NavigationMixin.GenerateUrl]({   //GenerateUrl
            type: 'standard__webPage',

            attributes: {
                url: 'https://s2labscom7-dev-ed.lightning.force.com/lightning/r/Opportunity/' + selectedOppRecordId + '/view'
            }


        })
            .then(generatedUrl => {
                window.open(generatedUrl);
            })
    }
}
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BiomarkerResponse, Unity } from 'src/app/models/biomarker';
import { OrganResponse } from 'src/app/models/organ';
import { BiomarkerService } from 'src/app/services/biomarker.service';
import { OrganService } from 'src/app/services/organ.service';
import { DropdownUtils } from 'src/app/utils/dropdown-utils';
import { HelperUtils } from 'src/app/utils/helper';

@Component({
    templateUrl: './biomarker.component.html',
    providers: [MessageService]
})
export class BiomarkerComponent implements OnInit {

    errors: any[] = [];
    requiredFields: boolean = false;

    //-----BIOMARCADORES

    biomarkers: BiomarkerResponse[] = []; //Listagem no grid
    biomarker: BiomarkerResponse = {}; //alteração/edição/esclusão
    selectedBiomarkers: BiomarkerResponse[] = []; //Para exclusão em lote

    //MODAL
    biomarkerDialog: boolean = false;
    deleteBiomarkerDialog: boolean = false;
    deleteBiomarkersDialog: boolean = false;

    //Dropdown
    dropDownUnities: Unity[];
    selectedUnity: Unity;

    //-----BIOMARCADORES

    //-----ORGAOS

    organs: OrganResponse[];
    selectedOrganIds: string[]; //multiselect dropdown
    selectedOrganIdsCountText: string;
    organ: OrganResponse = {}; //nao usado
    selectedorgans: OrganResponse[] = []; //Para exclusao - nao usado ainda

    //MODAL
    organDialog: boolean = false;
    deleteOrganDialog: boolean = false;
    deleteOrgansDialog: boolean = false;

    //-----ORGAOS

    //FORMS
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private biomarkerService: BiomarkerService, private organService: OrganService, private messageService: MessageService, private helper: HelperUtils)
    {
        this.dropDownUnities = DropdownUtils.InitializeUnities();
    }

    ngOnInit() {
        this.initializeBiomarker();
        this.getAllOrgans();
    }

    // WEB SERVICES API

    initializeBiomarker(){
        this.biomarkerService.get()
        .subscribe(
            success => {this.onSuccessBiomarker(success)},
            fail => {this.onFail(fail)}
        );
    }

    onSuccessBiomarker(response: any){
        this.errors = [];
        this.biomarkers = response;
    }

    postBiomarker(request: BiomarkerResponse){
        this.biomarkerService.post(request)
            .subscribe(
            success => {
                this.errors = [];
                this.biomarker = success;
                this.initializeBiomarker();
            },
            fail => {this.onFail(fail)}
        );
    }

    putBiomarker(request: BiomarkerResponse){
        this.biomarkerService.put(request)
        .subscribe(
            success => {
                this.errors = [];
                this.biomarker = success;
                this.initializeBiomarker();
            },
            fail => {this.onFail(fail)}
        );
    }

    deleteBiomarker(request: BiomarkerResponse){
        this.biomarkerService.delete(request)
        .subscribe(
            success => {
                this.errors = [];
                this.biomarker = success;
                this.initializeBiomarker();
            },
            fail => {this.onFail(fail)}
        );
    }

    getAllOrgans(){
        this.organService.getAll()
        .subscribe(
            success => {this.onSuccessOrgan(success)},
            fail => {this.onFail(fail)}
        );
    }

    onSuccessOrgan(response: any){
        this.errors = [];
        this.organs = response;
    }

    onChangeMultiselectOrgan(event: Event){
        this.selectedOrganIdsCountText = (this.selectedOrganIds.toString().trim() == '' ? ''
            : `${this.selectedOrganIds.toString().split(',').length} itens selecionados`);
    }

    // MODALS OPERATIONS

    onHideDialog() {
        this.biomarkerDialog = false;
        this.submitted = false;
    }

    onOpenNew() {
        this.biomarker = {};
        this.submitted = false;
        this.biomarkerDialog = true;
    }

    onEditBiomarker(biomarker: BiomarkerResponse) {

        this.biomarker = { ...biomarker };
        this.biomarkerDialog = true;
    }

    onDeleteBiomarker(biomarker: BiomarkerResponse) {
        this.deleteBiomarkerDialog = true;
        this.biomarker = { ...biomarker };
    }

    onDeleteSelectedBiomarkers() {
        this.deleteBiomarkersDialog = true;
    }

    onConfirmDelete() {
        this.deleteBiomarkerDialog = false;
        this.biomarkers = this.biomarkers.filter(val => val.id !== this.biomarker.id);
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: `O biomarcador ${this.biomarker.name} foi removido!`, life: 3000 });
        this.biomarker = {};
    }

    onConfirmDeleteSelected() {
        this.deleteBiomarkersDialog = false;
        this.biomarkers = this.biomarkers.filter(val => !this.selectedBiomarkers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Todos os biomarcadores selecionados foram removidos', life: 3000 });
        this.selectedBiomarkers = [];
    }

    onSaveBiomarker() {
        this.submitted = this.onValidate(this.biomarker);//true;

        if (this.submitted){

            if (this.biomarker.name?.trim()) {
                if (this.biomarker.id) {
                    this.biomarkers[this.findIndexById(this.biomarker.id)] = this.biomarker;

                    this.putBiomarker(this.biomarker);
                    this.messageService.add({ severity: 'success', summary: 'Alteração', detail: 'Biomarcador alterado', life: 3000 });
                } else {
                    this.postBiomarker(this.biomarker);
                    //this.biomarkers.push(this.biomarker);
                    this.messageService.add({ severity: 'success', summary: 'Inclusão', detail: 'Biomarcador incluído', life: 3000 });
                }

                //this.biomarkers = [...this.biomarkers];
                this.biomarkerDialog = false;
                this.biomarker = {};
            }
        }
        else
        {
            this.requiredFields = true;
        }
}

    //ORGAN
    onEditBiomarkerOrgan(biomarker: BiomarkerResponse) {
        this.biomarker = { ...biomarker };
        this.organDialog = true;
    }

    onHideOrganDialog() {
        this.organDialog = false;
        this.submitted = false;
    }

    onSaveOrgan() {
        this.submitted = true;

        this.organs = [...this.organs];
        this.organDialog = false;
        this.organ = {};

        //TODO: ANALISAR ESSA LOGICA DEPOIS
        // if (this.organ.name?.trim()) {
        //     if (this.organ.id) {
        //         this.organ[this.findIndexById(this.organ.id)] = this.organ;
        //         this.messageService.add({ severity: 'success', summary: 'Alteração', detail: 'Biomarcador alterado', life: 3000 });
        //     } else {
        //         this.biomarker.id = StringUtils.generateId();
        //         this.organs.push(this.organ);
        //         this.messageService.add({ severity: 'success', summary: 'Inclusão', detail: 'Biomarcador incluído', life: 3000 });
        //     }

        //     this.organs = [...this.organs];
        //     this.organDialog = false;
        //     this.organ = {};
        // }
    }

    onConfirmOrganDelete() {
        this.deleteBiomarkerDialog = false;
        this.biomarkers = this.biomarkers.filter(val => val.id !== this.biomarker.id);
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: `O biomarcador ${this.biomarker.name} foi removido!`, life: 3000 });
        this.biomarker = {};
    }

    confirmOrganSelected() {
        this.deleteBiomarkersDialog = false;
        this.biomarkers = this.biomarkers.filter(val => !this.selectedBiomarkers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Todos os biomarcadores selecionados foram removidos', life: 3000 });
        this.selectedBiomarkers = [];
    }

    onConfirmOrganDeleteSelected() {
        this.deleteBiomarkersDialog = false;
        this.biomarkers = this.biomarkers.filter(val => !this.selectedBiomarkers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Todos os biomarcadores selecionados foram removidos', life: 3000 });
        this.selectedBiomarkers = [];
    }

    onFail(fail: any){
        this.errors = fail.error.errors;
        this.helper.verifyErrorRedirection(fail.error.errors);
    }

    //COMPONENTE TABLE E MANIPULAÇÃO FRONTEND JSON

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.biomarkers.length; i++) {
            if (this.biomarkers[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onValidate(request: BiomarkerResponse): boolean{

        if (
            !request.name           ||
            !request.description    ||
            !request.unity          ||
            !request.aboveImpact    ||
            !request.belowImpact    ||
            request.bodyImageType   < 0
            )
        {
            this.requiredFields = true;
            return false;
        }

        request.bodyImageType = Number(request.bodyImageType)
        return true;
    }

    onConfirmRequiredFields() {
        this.requiredFields = false;
    }

}

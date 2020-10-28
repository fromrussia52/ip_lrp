import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MailingService } from '../mailing.service';

export interface MailingElement {
    title: string;
    desc: string;
    tag: string;
    state: string;
    sended: number;
    viewed: number;
    clicked: number;
    created: string;
    agent: string;
}

@Component({
    selector: 'mailing-drafts',
    templateUrl: './drafts.component.html',
    styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['select', 'name', 'created', 'btn'];
    dataSource = new MatTableDataSource<MailingElement>();
    selection = new SelectionModel<MailingElement>(true, []);
    dateFormat = {
        year: 'numeric', month: 'long', day: 'numeric'
    };

    constructor(
        private router: Router,
        private mailingService: MailingService
    ) { }

    subscriptions: Subscription[] = [];

    ngOnInit() {
        this.getData();
    }

    private getData() {
        this.mailingService.getSaved().subscribe((value: any[]) => {
            this.dataSource.data = value.map(v => {
                const newValue = { ...v, created: Intl.DateTimeFormat([], this.dateFormat).format(Date.now()) };
                return newValue;
            });
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    createMailing() {
        this.router.navigate(['/create'])
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    get titleText() {
        const len = this.dataSource.data.length;
        let text = '';
        const ost = len % 10;
        if ((len >= 5 && len <= 20) || (ost >= 5 && ost <= 9) || ost === 0) {
            text = 'Черновиков';
        } else if (ost === 1) {
            text = 'Черновик';
        } else if (ost >= 2 && ost <= 4) {
            text = 'Черновика';
        }
        return `${len} ${text}`;
    }

    edit(index: number) {
        this.router.navigate(['create', index]);
    }

    delete(index: number) {
        this.mailingService.deleteSaved(index).subscribe(data => {
            this.getData();
        });
    }
}
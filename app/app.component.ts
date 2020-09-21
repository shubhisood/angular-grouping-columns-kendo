import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'my-app',
    template: `
    <kendo-grid
        [data]="gridData"
        [pageSize]="state.take"
        [skip]="state.skip"
        [sort]="state.sort"
        [group]="state.group"
        [sortable]="{ mode: 'multiple' }"
        [pageable]="true"
        [groupable]="{ showFooter: true }"
        (dataStateChange)="dataStateChange($event)"
        style="max-height: 530px;"
    >
        <kendo-grid-column field="ProductID" title="Product ID" width="150">
        </kendo-grid-column>
        <kendo-grid-column field="ProductName" title="Product Name">
            <ng-template kendoGridGroupHeaderColumnTemplate let-group="group" let-aggregates="aggregates">
                <span title="Group Header Column Template for ProductName">
                    Count: {{ aggregates.Discontinued.count }}
                </span>
            </ng-template>
            <ng-template kendoGridGroupFooterTemplate let-group="group" let-aggregates>
                <span title="Group Footer Template for ProductName">
                    Count: {{ aggregates.Discontinued.count }}
                </span>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="UnitPrice" title="Unit Price" width="200">
            <ng-template kendoGridGroupHeaderTemplate let-group="group">
                <span title="Group Header Template for UnitPrice">
                    Price: {{ group.value }}
                </span>
            </ng-template>
            <ng-template kendoGridGroupHeaderColumnTemplate let-group="group" let-aggregates="aggregates">
                <span title="Group Header Column Template for UnitPrice">
                    Average: {{ aggregates.UnitPrice.average }}
                </span>
            </ng-template>
            <ng-template kendoGridGroupFooterTemplate let-group="group" let-aggregates>
                <span title="Group Footer Template for UnitPrice">
                    Average: {{ aggregates.UnitPrice.average }}
                </span>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="Discontinued" width="120">
            <ng-template kendoGridCellTemplate let-dataItem>
                {{ dataItem.Discontinued ? "Yes" : "No" }}
            </ng-template>
            <ng-template kendoGridGroupHeaderTemplate let-group="group" let-aggregates="aggregates">
                <span title="Group Header Template for Discontinued">
                    {{group.value ? 'Discontinued' : 'Not Discontinued'}}
                </span>
            </ng-template>
        </kendo-grid-column>
    </kendo-grid>
`
})
export class AppComponent {
    public aggregates: any[] = [{ field: 'UnitPrice', aggregate: 'average' }, { field: 'Discontinued', aggregate: 'count' }];

    public state: State = {
        skip: 0,
        take: 5,
        group: [{ field: 'Discontinued', aggregates: this.aggregates }]
    };

    public data = [{
        'ProductID': 1,
        'ProductName': 'Chai',
        'UnitPrice': 18.0000,
        'Discontinued': true
    }, {
        'ProductID': 2,
        'ProductName': 'Chang',
        'UnitPrice': 19.0000,
        'Discontinued': false
    }, {
        'ProductID': 3,
        'ProductName': 'Aniseed Syrup',
        'UnitPrice': 10.0000,
        'Discontinued': false
    }, {
        'ProductID': 4,
        'ProductName': "Chef Anton\'s Cajun Seasoning",
        'UnitPrice': 22.0000,
        'Discontinued': false
    }, {
        'ProductID': 5,
        'ProductName': "Chef Anton\'s Gumbo Mix",
        'UnitPrice': 21.3500,
        'Discontinued': false
    }, {
        'ProductID': 6,
        'ProductName': "Grandma\'s Boysenberry Spread",
        'UnitPrice': 25.0000,
        'Discontinued': false
    }, {
        'ProductID': 7,
        'ProductName': "Chai",
        'UnitPrice': 22.0000,
        'Discontinued': true
    }];

    public gridData: any = process(this.data, this.state);

    public dataStateChange(state: DataStateChangeEvent): void {
      if (state && state.group) {
        state.group.map(group => group.aggregates = this.aggregates);
      }

      this.state = state;

      this.gridData = process(this.data, this.state);
    }
}

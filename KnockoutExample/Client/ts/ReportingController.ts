﻿import * as ko from "knockout";
import { toPascal } from "./Utils";

export class ReportingController {
    vmArray;
    selectedIndex;
    title;
    jsonToSubmit;

    constructor() {
        this.selectedIndex = ko.observable(0);
        this.vmArray = ko.observableArray([])
        this.title = ko.observable("");
    }

    init = () => {
        this.setTitle();
    }

    next = () => {
        this.selectedIndex(this.selectedIndex() + 1);
        this.setTitle();
    }

    previous = () => {
        this.selectedIndex(this.selectedIndex() - 1);
        this.setTitle();
    }

    addViewModel = (...vm) => {
        for (let item of vm) {
            this.vmArray.push(item);
        }
    }

    submit = () => {
        let data = {};
        for (let item of this.vmArray()) {
            let name = item.modelName;
            let arr = item.selectedColumns().map(a => toPascal(a));
            data[name] = arr;
        }

        $.post("/reporting/submit", { columns: JSON.stringify(data) }, function (res) {
            alert(res);
        });
    }

    private setTitle = () => {
        if (this.selectedIndex() >= 0 && this.selectedIndex() < this.vmArray().length) {
            this.title(this.vmArray()[this.selectedIndex()].name);
        }
        else {
            this.title("Review");
        }
    }
}
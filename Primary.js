class Vehicle {
    constructor (make, model, vehicletype) {
        this.make = make;
        this.model = model;
        this.vehicletype = vehicletype;
    }

    describe() {
        return `${this.make} made the ${this.model} and it is a ${this.vehicletype}.`; 
    }
}

class Make {
    constructor(make) {
        this.make = make;
        this.models = [];
    }

    addmodel(model) {
        if (model instanceof Vehicle) {
            this.models.push(model);
        }else {
            throw new Error (`You must add a vehicle brand model: ${model}`);
        }
    }

    describe() {
        return `${this.make} is ${this.models.length} models.`;
    }
}

class MakeMenu {
    constructor() {
        this.Makes = [];
        this.selectedMake = null;
    }

    start() {
        let selection = this.showMainMenu();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createMake();
                    break;
                case '2':
                    this.displayMakes();
                    break;
                case '3':
                    this.viewMakes();
                    break;
                case '4':
                    this.deleteMake();
                    break;
                default:
                     selection = 0;
            }
            selection = this.showMainMenu();
        }
        alert('Thanks for making car brands.');
    }  

    showMainMenu() {
        return prompt(`
            0) Exit Menu
            1) Create Vehicle Brand
            2) Display Vehicle Brand
            3) Select Vehicle Brand
            4) Delete Vehicle Brand
        `);
    }
    
    showmodelMenu(MakeInfo) {
        return prompt(`
            0) Back
            1) Add a Vehicle model
            2) Remove a Vehicle model
            ---------------
            ${MakeInfo}
        `);
    }

    displayMakes() {
        let MakeString = '';
        for (let i = 0; i < this.Makes.length; i++) {
            MakeString += i + ')' + this.Makes[i].make + '\n';
        }
        alert(MakeString);
    }

    createMake() {
        let make = prompt('Enter name for vehicle Brand');
        this.Makes.push(new Make(make));
    }

    viewMakes() {
        let index = prompt('Enter vehicle brand number');
        if (index > -1 && index < this.Makes.length) {
            this.selectedMake = this.Makes[index];
            let description = 'Viewing Brand: ' + '\n' + this.selectedMake.make + '\n';
            for (let i = 0; i < this.selectedMake.models.length; i++) {
                description += i + ')' + this.selectedMake.models[i].make 
                 + ' - ' + this.selectedMake.models[i].model + ' - ' + this.selectedMake.models[i].vehicletype + '\n';
            }
            let selection = this.showmodelMenu(description);
            switch (selection) {
                case '1':
                    this.addmodel();
                    break;
                case '2':
                    this.removemodel();
            }
        }
    }

    deleteMake() {
        let index = prompt('Enter the number of vehicle brand to delete');
        if (index > -1 && index < this.Make.length) {
            this.Make.splice(index, 1);
        }
    }

    addmodel() {
        let model = prompt('Enter name of vehicle model');
        let color = prompt('Enter vehicle color');
        let vehicletype = prompt('Enter the vehicle type of created vehicle:');
        this.selectedMake.models.push(new Vehicle (model, color, vehicletype));
    }

    removemodel () {
        let index = prompt('Enter model to remove');
        if (index > -1 && index < this.selectedMake.models.length) {
            this.selectedMake.models.splice(index, 1);
        }
    }
}

let menu = new MakeMenu();
menu.start();
import { Unity } from "../models/biomarker";
import { KeyValueComponent } from "../models/keyValue";

export class DropdownUtils {

    public static InitializeUnities() : Unity[] {

        return [
            {id: 'mg', name: 'mg'},
            {id: 'ng/mL', name: 'ng/mL'},
            {id: 'mg/dL', name: 'mg/dL'},
            {id: 'pg/mL', name: 'pg/mL'},
            {id: 'µUI/mL', name: 'µUI/mL'},
            {id: 'ng/dL', name: 'ng/dL'},
            {id: 'UI/L', name: 'UI/L'},
        ];
    };

    public static InitializePrescriptionType() : KeyValueComponent[] {

        return [
            {id: 0, name: 'Biomarcador'},
            {id: 1, name: 'Doença'},
            {id: 2, name: 'Ambos'},
        ];
    };

}


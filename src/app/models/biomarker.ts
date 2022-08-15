export interface BiomarkerResponse {
    id?:            string;
    name?:          string;
    description?:   string;
    unity?:         string;
    bodyImageType?: number;
    aboveImpact?:   string;
    belowImpact?:   string;
}

export interface Unity {
    id?:            string;
    name?:          string;
}
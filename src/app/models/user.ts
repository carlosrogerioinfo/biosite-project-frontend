export interface UserResponse {
    id?:                string;
    name?:              string;
    email?:             string;
    weight?:            number;
    height?:            string;
    fit?:               boolean;
    gender?:            number;
    isPregnant?:        boolean;
    lastLoginDate?:     Date;
    planResponse?:      Plan;
    imc?:               string;
    imcResult?:         string;
    age?:               number;
    genderDescription?: string;
}

export interface Plan {
    name?:        string;
    description?: string;
    areas?:       Area[];
}

export interface Area {
    id?:          string;
    name?:        string;
    description?: string;
}

export interface UserRequest {
    email?:    string;
    password?: string;
}

export interface AuthResponse {
    token?:    string;
    refreshToken?: string;
}
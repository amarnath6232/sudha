export interface signUp {
    _id?: string;
    name: string;
    designation: string;
    email: string;
    phoneNumber: number;
    password: string;
    confirmPassword: string;
    dob: string;
}

export interface Minikit {
    _id?: string;
    assessmentYear: string;
    fld: string;
    nameOfFarmer: string;
    village: string;
    season: string;
    documentoryEvidence: string;
}

export interface Techenical {
    assessmentYear: string;
    oft: string;
    nameOfFarmer: string;
    village: string;
    season: string;
    documentoryEvidence: string;
}
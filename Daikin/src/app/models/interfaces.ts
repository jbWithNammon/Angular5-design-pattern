export interface IProfile {
    Id?: string;
    Code?: string;
    FullNameTh?: string;
    Position?: string;
    JoinDate?: string;
    DivDeptSect?: string;
    Email?: string;
    Tel?: string;
    PHS?: string;
    Mobile?: string;
    Lunch?: string;
    WorkCenter?: string;
    Contact?: IContact;
    BankInfo?: IBankInfo;
}
export interface IContact {
    Id?: string;
    CurrentAddress1?: string;
    CurrentAddress2?: string;
    CurrentAddress3?: string;
    CurrentCity?: string;
    CurrentZipcode?: string;
    CurrentTelephone?: string;
    HomeAddress1?: string;
    HomeAddress2?: string;
    HomeAddress3?: string;
    HomeCity?: string;
    HomeZipcode?: string;
    HomeTelephone?: string;
}
export interface IBankInfo {
    id?: string;
    BankName?: string;
    BirthDate?: string;
    IDNo?: string;
    BankAccountNo?: string;
}
export interface IUser {
    userName?: string;
    password?: string;
    userInfo?: IUserInfo;
}

export interface IUserInfo {
    FullName?: string;
    Position?: string;
    DivDeptSect?: string;
}
export interface IMenu {
    sequence?: number;
    display?: string;
    link?: string;
}

export interface IBus {
    Code?: string;
    Bus?: string;
    Stop?: string;
    CodeSplit?: string;

}

export interface IBusEdit {
    BusIndex?: string;
    BusAndStopCode?: string;
    BusCode?: string;
    StopCode?: string;
}

export interface IBusList {
    Code?: string;
    Bus?: string;
}

export interface IBusStopList {
    Code?: string;
    Stop?: string;
}


export interface IBusHis {
    ChangeDate?: string;
    CurrentBus?: string;
    NewBus?: string;
}

export interface ITax {
    Year?: string;
    Code?: string;
    Item?: string;
    DeductionDescription?: string;
    DeductionAmount?: string;
}

export interface IAttendance {
    Day?: string;
    Shift?: string;
    TimeCard?: string;
    Description?: string;
    RequestNo?: string;
    OverTime?: string;
    OT1?: string;
    OT15?: string;
    OT2?: string;
    OT25?: string;
    OT3?: string;
}

export interface IFamilyDetail {
    FamilyTypeTh?: string;
    FamilyFullName?: string;
    FamilyBirth?: string;
    FamilyId?: string;
}

export interface IFamilyBenefitDetail {
    BeneficiaryName?: string;
    BeneficiaryTypeTh?: string;
    BeneficiaryPercentage?: string;
}

export interface IWalfareModel {
    EmployeeUnitform?: EmployeeUnitformModel;
    OtherUniforms?: OtherUniformModel;
    SocialSecurityProvidentFund?: SocialSecurityProvidentFundModel;
}

export interface SocialSecurityProvidentFundModel {
    Hospital1?: string;
    ProvidentStartDate?: string;
    ProvidentPlan?: string;
    ProvidentPercent?: string;
    ProvidentPercentCompany?: string;
}

export interface ModifyUniformModel {
    PeriodCanModify?: string;
    PeriodDescription?: string;
}

export interface EmployeeUnitformModel {
    UniformType?: string;
    Shirt?: string;
    Shirt_Show?: string;
    Trouser?: string;
    Trouser_Show?: string;
    BlueSuit?: string;
    BlueSuit_Show?: string;
    Cap?: string;
    Cap_Show?: string;
    Shoe?: string;
    Shoe_Show?: string;
    TShirt?: string;
    TShirt_Show?: string;
    Other?: string;
    Other_Show?: string;
}

export interface OtherUniformModel {
    Category?: string;
    Size_Key?: string;
    Size_Show?: string;
    EmployeeSize_AllowBit?: string;
    EmployeeSize_Key?: string;
    EmployeeSize_Show?: string;
    SpouseSize_AllowBit?: string;
    SpouseSize_Key?: string;
    SpouseSize_Show?: string;
    Child_1Size_AllowBit?: string;
    Child_1Size_Key?: string;
    Child_1Size_Show?: string;
    Child_2Size_AllowBit?: string;
    Child_2Size_Key?: string;
    Child_2Size_Show?: string;
    Child_3Size_AllowBit?: string;
    Child_3Size_Key?: string;
    Child_3Size_Show?: string;
    Child_4Size_AllowBit?: string;
    Child_4Size_Key?: string;
    Child_4Size_Show?: string;
    Child_5Size_AllowBit?: string;
    Child_5Size_Key?: string;
    Child_5Size_Show?: string;
}

export interface ISubMenu {
    Link?: string;
    Class?: string;
    Display?: string;
    Sequence?: number;
    MenuId?: number
}
export interface IRoute {
    Prev?: string;
    Current?: string;
    Refresh?: boolean;
}

export interface ComboboxModel {
    UniformType?: string;
    UniformTypeKey?: string;
    UniformTypeDescription?: string;
}
export interface IConfig {
    ApiEndpoint?: string;
    AppLanguage?: string;
    AppIdle?: IAppIdle;
    ApiPhoto?:string;
}
export interface IAppIdle {
    Idle?: number;
    TimeOut?: number;
    Ping?: number;
}

export interface INews {
    NewsId?: string;
    PostDate?: string;
    PostDateStr?: string;
    PostId?: string;
    PostName?: string;
    PostOU?: string;
    PostSubject?: string;
    PostDetail?: string;
}
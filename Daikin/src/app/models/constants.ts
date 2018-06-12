export enum ESubMenu {
    General = "gen",

}

export const subMenu = [
    {
        Link: "/general", Class: "fa fa-camera-retro",
        Display: "MainMenu.Profile", Sequence: 1, ModuleId: 1
    },
    {
        Link: "/bus", Class: "fa fa-truck",
        Display: "MainMenu.BusLine", Sequence: 2, ModuleId: 1
    },
    {
        Link: "/family", Class: "fa fa-users",
        Display: "MainMenu.FamInfo", Sequence: 3, ModuleId: 1
    },
    {
        Link: "/benefits", Class: "fa fa-ambulance",
        Display: "MainMenu.Welfare", Sequence: 4, ModuleId: 1
    },
    {
        Link: "/tax", Class: "fa fa-briefcase",
        Display: "MainMenu.Tax", Sequence: 5, ModuleId: 1
    }
];

export const familyTab = [
    { link: 'detailBtn', display: 'Family.FamInfo',sequence:0 },
    { link: 'porvidentfundBtn', display: 'Family.FamProvidentFund',sequence:0 },
    { link: 'lifeInsuranceBtn', display: 'Family.FamLifeInsurance',sequence:0 }
];
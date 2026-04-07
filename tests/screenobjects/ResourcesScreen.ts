import AppScreen from './AppScreen.js';

const SELECTORS = {
    SCREEN: '~Hotlines, Immediate, 24/7 crisis support by phone or text',
    HOTLINES: '~Hotlines, Immediate, 24/7 crisis support by phone or text',
    LOSS_OF_SPOUSE_OR_PARTNER: '~Loss of Spouse or Partner, Therapists, counselors, grief resources',
    LOSS_OF_A_CHILD: '~Loss of a Child, Resources for parents navigating the loss of a child',
    INFERTILITY_PREGNANCY_AND_INFANT_LOSS: '~Infertility, Pregnancy and Infant Loss, Support for pregnancy and infant loss',
    FOR_GRIEVING_CHILDREN: '~For Grieving Children, Support specifically for grieving children',
    SUICIDE_LOSS_AND_PREVENTION: '~Suicide Loss and Prevention, Resources for those who have lost someone to suicide',
    MILITARY_AND_VETERAN_LOSS: '~Military and Veteran Loss, Support for those who have lost military loved ones',
    GENERAL_MENTAL_HEALTH: '~General Mental Health, Mental health education and support resources',
    SUPPORT_GROUPS: '~Support Groups, Connect with others who share similar experiences',
    GENERAL_WEBSITES: '~General Websites, Expert grief education, tools, and guidance',
    WHERE_TO_FIND_PROFESSIONAL_HELP: '~Where to find Professional Help, Find licensed grief counselors and therapists',
    PICTURE_BOOKS: '~Picture Books, Children\'s books that gently explore grief',
    PODCASTS: '~Podcasts, Listen, learn, and feel less alone',
    BOOKS: '~Books, Insightful reads on grief and recovery',
    JOURNALS_AND_WORKBOOKS: '~Journals and Workbooks, Guided prompts and exercises for healing',
};

class ResourcesScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get hotlines () { return $(SELECTORS.HOTLINES); }
    get lossOfSpouseOrPartner () { return $(SELECTORS.LOSS_OF_SPOUSE_OR_PARTNER); }
    get lossOfAChild () { return $(SELECTORS.LOSS_OF_A_CHILD); }
    get infertilityPregnancyAndInfantLoss () { return $(SELECTORS.INFERTILITY_PREGNANCY_AND_INFANT_LOSS); }
    get forGrievingChildren () { return $(SELECTORS.FOR_GRIEVING_CHILDREN); }
    get suicideLossAndPrevention () { return $(SELECTORS.SUICIDE_LOSS_AND_PREVENTION); }
    get militaryAndVeteranLoss () { return $(SELECTORS.MILITARY_AND_VETERAN_LOSS); }
    get generalMentalHealth () { return $(SELECTORS.GENERAL_MENTAL_HEALTH); }
    get supportGroups () { return $(SELECTORS.SUPPORT_GROUPS); }
    get generalWebsites () { return $(SELECTORS.GENERAL_WEBSITES); }
    get whereTofindProfessionalHelp () { return $(SELECTORS.WHERE_TO_FIND_PROFESSIONAL_HELP); }
    get pictureBooks () { return $(SELECTORS.PICTURE_BOOKS); }
    get podcasts () { return $(SELECTORS.PODCASTS); }
    get books () { return $(SELECTORS.BOOKS); }
    get journalsAndWorkbooks () { return $(SELECTORS.JOURNALS_AND_WORKBOOKS); }

    async tapHotlines () { await this.hotlines.click(); }
    async tapLossOfSpouseOrPartner () { await this.lossOfSpouseOrPartner.click(); }
    async tapLossOfAChild () { await this.lossOfAChild.click(); }
    async tapInfertilityPregnancyAndInfantLoss () { await this.infertilityPregnancyAndInfantLoss.click(); }
    async tapForGrievingChildren () { await this.forGrievingChildren.click(); }
    async tapSuicideLossAndPrevention () { await this.suicideLossAndPrevention.click(); }
    async tapMilitaryAndVeteranLoss () { await this.militaryAndVeteranLoss.click(); }
    async tapGeneralMentalHealth () { await this.generalMentalHealth.click(); }
    async tapSupportGroups () { await this.supportGroups.click(); }
    async tapGeneralWebsites () { await this.generalWebsites.click(); }
    async tapWhereTofindProfessionalHelp () { await this.whereTofindProfessionalHelp.click(); }
    async tapPictureBooks () { await this.pictureBooks.click(); }
    async tapPodcasts () { await this.podcasts.click(); }
    async tapBooks () { await this.books.click(); }
    async tapJournalsAndWorkbooks () { await this.journalsAndWorkbooks.click(); }
}

export default new ResourcesScreen();

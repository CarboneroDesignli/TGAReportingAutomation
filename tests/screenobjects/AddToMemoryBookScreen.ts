import AppScreen from './AppScreen.js';

const SELECTORS = {
    SCREEN: '//android.widget.EditText[@text="Description"]',
    DATE_PICKER: '//android.view.ViewGroup[starts-with(@content-desc,"Date,")]',
    DESCRIPTION_INPUT: '//android.widget.EditText[@text="Description"]',
    
    // CAMBIO CLAVE: Usamos el TextView que ya sabes que funciona en otros folders
    // pero con una búsqueda flexible por si es un ViewGroup con ese texto.
    SAVE_BUTTON: '//android.widget.TextView[@text="Save"] | //android.view.ViewGroup[@content-desc="Save"]',
    
    // Selector para subir foto basado en la estructura que pasaste
    PHOTO_UPLOAD_BUTTON: '//android.widget.EditText[@text="Description"]/parent::android.view.ViewGroup/android.view.ViewGroup[1]',
};

class AddToMemoryBookScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get datePicker () { return $(SELECTORS.DATE_PICKER); }
    get descriptionInput () { return $(SELECTORS.DESCRIPTION_INPUT); }
    // Save is disabled until description is filled
    get saveButton () { return $(SELECTORS.SAVE_BUTTON); }
    get photoUploadButton () { return $(SELECTORS.PHOTO_UPLOAD_BUTTON); }

    async tapPhotoUpload () {
        await this.photoUploadButton.click();
    }

    async tapSave() {
    console.log("Iniciando guardado...");

    // 1. Escondemos el teclado para que el TextView[@text="Save"] sea visible
    if (await driver.isKeyboardShown()) {
        await driver.hideKeyboard();
        await driver.pause(1000); 
    }

    // 2. Buscamos el elemento usando nuestro nuevo selector dual
    const btn = await $(SELECTORS.SAVE_BUTTON);

    // 3. Esperar a que aparezca (Usamos Displayed para evitar errores de protocolo)
    await btn.waitForDisplayed({ 
        timeout: 10000,
        timeoutMsg: 'No se encontró el botón o texto Save'
    });

    // 4. Scroll preventivo (por si la descripción larga lo empujó hacia abajo)
    await btn.scrollIntoView();

    // 5. Clic final
    await btn.click();
    console.log("¡Click en Save realizado!");
}

    async tapDatePicker () {
        await this.datePicker.click();
    }

    async setDescription (text: string) {
        await this.descriptionInput.setValue(text);
    }


    async isSaveEnabled (): Promise<boolean> {
        return this.saveButton.isEnabled();
    }
}

export default new AddToMemoryBookScreen();

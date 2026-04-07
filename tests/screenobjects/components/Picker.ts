import AppScreen from "../AppScreen.js";

const SELECTORS = {
    // Android Moderno (API 33+)
    SCREEN_COMPOSE: '//android.view.View[@content-desc="Media grid"]',
    // Android Clásico / General
    SCREEN_CLASSIC: '//android.widget.ScrollView',

    FIRST_IMAGE_COMPOSE: '//android.view.View[@content-desc="Media grid"]//android.view.View[1]',
    FIRST_IMAGE_GENERIC: 'android=new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)',

    DISMISS_BUTTON: '//android.widget.TextView[@text="Dismiss" or @text="Entendido"]',
};

class GalleryScreen extends AppScreen {
    constructor () {
        // Usamos un selector que acepte cualquiera de los dos contenedores
        super(`${SELECTORS.SCREEN_COMPOSE} | ${SELECTORS.SCREEN_CLASSIC}`);
    }

    async tapFirstImage () {
        // 1. Manejo del overlay de bienvenida (solo aparece la primera vez)
        const dismiss = $(SELECTORS.DISMISS_BUTTON);
        if (await dismiss.isDisplayed().catch(() => false)) {
            await dismiss.click();
            await driver.pause(500);
        }

        // 2. Intentar seleccionar la imagen con estrategia de respaldo (Fallback)
        console.log("Buscando primera imagen...");
        
        const imgCompose = $(SELECTORS.FIRST_IMAGE_COMPOSE);
        const imgGeneric = $(SELECTORS.FIRST_IMAGE_GENERIC);

        if (await imgCompose.isDisplayed().catch(() => false)) {
            await imgCompose.click();
        } else {
            // Si el modo Compose falla, usamos el selector genérico de Android
            await imgGeneric.waitForDisplayed({ timeout: 10000 });
            await imgGeneric.click();
        }

        // 3. ¡IMPORTANTE! El código que pasaste no tiene el botón "Done"
        // En muchas galerías, después de tocar la foto, hay que confirmar.
        // Si tu galería se cierra sola al tocar la foto, borra esta parte:
        const doneBtn = $('android=new UiSelector().textMatches("(?i)Done|Listo|Add.*|Añadir")');
        if (await doneBtn.waitForDisplayed({ timeout: 3000 }).catch(() => false)) {
            await doneBtn.click();
        }

        await driver.pause(2000); 
    }
}

export default new GalleryScreen();
import AppScreen from "./AppScreen.js";

const SELECTORS = {
    SCREEN_COMPOSE: '//android.view.View[@content-desc="Media grid"]',
    SCREEN_CLASSIC: '//android.widget.ScrollView',
    FIRST_IMAGE_COMPOSE: '//android.view.View[@content-desc="Media grid"]//android.view.View[1]',
    FIRST_IMAGE_GENERIC: 'android=new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)',
    DISMISS_BUTTON: '//android.widget.TextView[@text="Dismiss" or @text="Entendido"]',
};

class GalleryScreen extends AppScreen {
    constructor () {
        super(`${SELECTORS.SCREEN_COMPOSE} | ${SELECTORS.SCREEN_CLASSIC}`);
    }

    async tapFirstImage () {
        // 1. Manejo del overlay "Dismiss"
        const dismiss = $(SELECTORS.DISMISS_BUTTON);
        if (await dismiss.isDisplayed().catch(() => false)) {
            await dismiss.click();
            await driver.pause(500);
        }

        // 2. Seleccionar la imagen
        console.log("Seleccionando la primera imagen...");
        const imgCompose = $(SELECTORS.FIRST_IMAGE_COMPOSE);
        const imgGeneric = $(SELECTORS.FIRST_IMAGE_GENERIC);

        if (await imgCompose.isDisplayed().catch(() => false)) {
            await imgCompose.click();
        } else {
            await imgGeneric.waitForDisplayed({ timeout: 10000 });
            await imgGeneric.click();
        }

        // ESPERA: Android tarda en procesar la selección de la foto antes de mostrar el Done
        await driver.pause(2000);

        // 3. ESTRATEGIA PARA EL BOTÓN "DONE" (Triple Impacto)
        console.log("Buscando botón de confirmación...");
        
        // A. Intentar por Texto e IDs de sistema conocidos
        const doneSelectors = [
            'android=new UiSelector().textMatches("(?i)Done|Listo|Añadir|Add.*")',
            'android=new UiSelector().descriptionMatches("(?i)Done|Listo|Añadir|Add.*|Confirmar")',
            'id=com.android.providers.media.module:id/button_add',
            'id=com.android.providers.media.module:id/header_finish'
        ];

        let clicked = false;
        for (const selector of doneSelectors) {
            const btn = $(selector);
            if (await btn.isDisplayed().catch(() => false)) {
                await btn.click();
                console.log(`Clic exitoso con: ${selector}`);
                clicked = true;
                break;
            }
        }

        // B. Si fallan los selectores, intentamos por Coordenadas Relativas
        // En el Media Grid de Android, el botón suele estar en la esquina superior derecha
        if (!clicked) {
            console.warn("No se detectó botón por selector. Intentando tap en esquina superior derecha...");
            const { width, height } = await driver.getWindowSize();
            const x = Math.round(width * 0.90); // 90% del ancho
            const y = Math.round(height * 0.07); // 7% de la altura
            
            await driver.touchAction({
                action: 'tap',
                x: x,
                y: y
            });
            clicked = true;
        }

        await driver.pause(3000); 
    }
}

export default new GalleryScreen();
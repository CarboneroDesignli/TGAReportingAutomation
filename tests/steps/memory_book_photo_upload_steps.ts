import { When, Then } from '@wdio/cucumber-framework';
import MemoryBookScreen from '../screenobjects/MemoryBookScreen.js';
import AddToMemoryBookScreen from '../screenobjects/AddToMemoryBookScreen.js';
import GalleryScreen from '../screenobjects/GalleryScreen.js';
import NativeAlert from '../screenobjects/components/NativeAlert.js';

When('I tap "Add to memory book"', async () => {
    await MemoryBookScreen.tapAddToMemoryBook();
    await AddToMemoryBookScreen.waitForIsShown();
});

When('I tap the photo upload button', async () => {
    await AddToMemoryBookScreen.tapPhotoUpload();
    
    // Intentamos detectar la alerta de permisos de Android de forma rápida
    // Si no aparece en 3 segundos, asumimos que ya hay permiso o la galería abrió directa
    const allowButton = $('android=new UiSelector().textMatches("(?i)Allow|Permitir|While using the app")');
    if (await allowButton.waitForDisplayed({ timeout: 3000 }).catch(() => false)) {
        await allowButton.click();
        console.log("Permiso concedido.");
    }
});

When('I select the first image from the gallery', async () => {
    await driver.pause(1000);
    await GalleryScreen.tapFirstImage();
});
When('I enter {string} as the description', async (description: string) => {
    // 1. Obtenemos la fecha y hora actual
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    // 2. Combinamos el texto base con la fecha
    // Si el feature file manda "This is a cherished automated test", 
    // el resultado será: "This is a cherished automated test - 06/04/2026 21:15:00"
    const fullDescription = `${description} - ${dateTime}`;
    
    console.log(`Escribiendo descripción: ${fullDescription}`);
    
    // 3. Enviamos el texto final a la pantalla
    await AddToMemoryBookScreen.setDescription(fullDescription);
});

When('I tap the Save button', async () => {
    await AddToMemoryBookScreen.tapSave();
});

Then('the memory book entry is saved successfully', async () => {
    await MemoryBookScreen.waitForIsShown();
});

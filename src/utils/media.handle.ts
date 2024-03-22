// Importamos la función `diskStorage` de la biblioteca `multer`.
import { diskStorage } from "multer";

/**
 * Definimos el almacenamiento para los archivos subidos.
 * Esta configuración especifica dónde se almacenarán los archivos subidos
 * y cómo se nombrarán.
 */
export const storage = diskStorage({
    // Especificamos la carpeta de destino donde se guardarán los archivos subidos.
    destination: `./tmp`,
    // Opcionalmente, se puede usar una ruta absoluta para la carpeta de destino.
    // destination: `${____dirname}/../tmp`,
    
    // Definimos cómo se nombrará el archivo.
    filename: (req, file, cb) => {
        // Obtenemos la extensión del archivo original.
        const extension = file.originalname.split('.').pop();
        
        // Generamos un nombre de archivo único concatenando la marca de tiempo actual y la extensión.
        const filename = `${Date.now()}.${extension}`;
        
        // Llamamos al callback proporcionado por multer para pasar el nombre del archivo generado.
        cb(null, filename);
    }
});

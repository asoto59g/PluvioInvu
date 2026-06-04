/**
 * ============================================================
 *  PLUVIÓMETRO INVU — Google Apps Script
 *  Liberia Centro, Guanacaste, Costa Rica
 * ============================================================
 *
 *  INSTRUCCIONES DE INSTALACIÓN:
 *  1. Abrir https://script.google.com  → Nuevo proyecto
 *  2. Pegar TODO este código
 *  3. Cambiar el valor de SPREADSHEET_ID (ver instrucciones)
 *  4. Hacer clic en "Implementar" → "Nueva implementación"
 *  5. Tipo: Aplicación web
 *     · Ejecutar como: Yo
 *     · Quién tiene acceso: Cualquier persona
 *  6. Copiar la URL de implementación y pegarla en la app
 *
 *  CÓMO OBTENER EL SPREADSHEET_ID:
 *  Abrir Google Sheets → la URL tiene el formato:
 *  https://docs.google.com/spreadsheets/d/XXXXXXXXXX/edit
 *                                          ^^^^^^^^^^
 *                               
 *  Este es el SPREADSHEET_ID
 * ============================================================
 */

// ⬇️ CAMBIAR ESTE VALOR POR EL ID DE TU HOJA DE CÁLCULO
var SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1cpADdyuZTH-zxJq9DA8D9oxrylalOxEWvDkV4lIwiOo/edit?usp=sharing';

// Nombre de la hoja dentro del spreadsheet
var SHEET_NAME = 'Hoja 1';

// ============================================================
//  ENCABEZADOS DE LA HOJA
// ============================================================
var HEADERS = [
  'ID',
  'Fecha Lectura',
  'Fecha Inicio Período',
  'Lluvia (mm)',
  'Temperatura (°C)',
  'Notas',
  'Operador',
  'Registrado en',
  'Sincronizado en'
];

// ============================================================
//  RECIBE LOS DATOS DESDE LA APP WEB (POST)
// ============================================================
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Crear hoja si no existe
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Agregar encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      var headerRow = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRow.setValues([HEADERS]);
      headerRow.setBackground('#0077b6');
      headerRow.setFontColor('#ffffff');
      headerRow.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Agregar fila de datos
    var timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    var now       = new Date();

    sheet.appendRow([
      data.id              || '',
      data.fechaLectura    || '',
      data.fechaInicio     || '',
      data.mmLluvia        != null ? data.mmLluvia       : '',
      data.temperatura     != null ? data.temperatura    : '',
      data.notas           || '',
      data.operador        || '',
      timestamp,
      now
    ]);

    // Formatear la columna de fechas automáticamente
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 2, 1, 2).setNumberFormat('yyyy-mm-dd');
    sheet.getRange(lastRow, 8, 1, 2).setNumberFormat('dd/mm/yyyy HH:mm');

    // Colorear filas alternadas
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground('#e8f4fc');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  PERMITE PROBAR DESDE EL NAVEGADOR (GET)
// ============================================================
function doGet(e) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  var rows  = sheet ? sheet.getLastRow() - 1 : 0; // descontar encabezado

  return ContentService
    .createTextOutput(JSON.stringify({
      status:   'ok',
      message:  'Pluviómetro INVU — Apps Script activo',
      registros: Math.max(0, rows),
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

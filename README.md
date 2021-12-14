• Tạo google sheet 

* Trên PC
1. Vào Driver chọn thư mục mới và chọn google trang tính
2. Cột A: name
3. Cột B: local
4. Cột C: wishes
5. Đổi tên: data
6. Chọn tiện ích mở rộng => app scritp 

* Trên ĐThoại
1. Tải google sheet + Kiwi Browser
2. Vào google sheet vừa tải về rồi tạo như trên
3. Copy link google sheet dán vào Kiwi Browser + để chế độ máy tính
4. Chọn tiện ích mở rộng => app script

# DÙNG PHIÊN BẢN CŨ CỦA SCRIPT

• Làm form liên kết với script thì làm như sau:
1. Tạo 1 file Lenh.gs theo format
2. Paste code function vào lenh.gs => Công bố => xuất bản nó dưới dạng ứng dụng web => lấy link thay vào JS + HTML

• Mã code scritp.google.com

function doGet(e){
   return handleResponse(e);
}
var SHEET_NAME = "data";
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service
function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  try {
      var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
      var sheet = doc.getSheetByName(SHEET_NAME);
      var headRow = e.parameter.header_row || 1;
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var nextRow = sheet.getLastRow()+1;
      var row = []; 
      for (i in headers){
          if (headers[i] == "Timestamp"){
             row.push(new Date());
          } else {
             row.push(e.parameter[headers[i]]);
          }
      }
      sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
      return ContentService.createTextOutput(JSON.stringify({"result":"Chúng tớ rất cảm ơn bạn đã điền form. Hẹn bạn ở ngày vui của chúng tớ nhé!"})).setMimeType(ContentService.MimeType.JSON);
  } catch(e){
     return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": e})).setMimeType(ContentService.MimeType.JSON);
 } finally {
     lock.releaseLock();
 }
}

function setup() {
   var doc = SpreadsheetApp.getActiveSpreadsheet();
   SCRIPT_PROP.setProperty("key", doc.getId());
} 
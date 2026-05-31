const SHEET_NAME = 'Submissions';
const EVENT_NAME = 'Health First Relay Marathon';

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('doPost must be called by a deployed Web App POST request. Use testDoPost() inside the Apps Script editor.');
  }

  const payload = JSON.parse(e.postData.contents || '{}');
  return handleSubmission_(payload);
}

function testDoPost() {
  return handleSubmission_({
    kind: 'registration',
    id: 'TEST-001',
    source: 'apps-script-test',
    customerEmail: Session.getActiveUser().getEmail(),
    sendCustomerEmail: false,
    data: {
      fullName: 'Test Runner',
      email: Session.getActiveUser().getEmail(),
      mobile: '+1 555 010 0000',
      village: 'Test City',
      distance: '5',
    },
  });
}

function handleSubmission_(payload) {
  const sheet = getSheet_();
  const data = payload.data || {};
  const row = [
    new Date(),
    payload.kind || '',
    payload.id || '',
    payload.source || '',
    data.fullName || data.name || '',
    payload.customerEmail || data.email || '',
    data.mobile || '',
    data.village || '',
    data.distance || '',
    data.consent || '',
    data.type || '',
    data.rating || '',
    data.message || '',
    JSON.stringify(data),
  ];

  sheet.appendRow(row);

  if (payload.sendCustomerEmail && payload.customerEmail) {
    MailApp.sendEmail({
      to: payload.customerEmail,
      subject: `${EVENT_NAME}: submission received`,
      htmlBody: `
        <p>Thank you for connecting with ${EVENT_NAME}.</p>
        <p>Your submission ID is <strong>${payload.id}</strong>.</p>
        <p>We received your details and the event team will follow up when needed.</p>
      `,
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Received At',
      'Kind',
      'ID',
      'Source',
      'Name',
      'Email',
      'Phone',
      'City',
      'Distance',
      'Contact Consent',
      'Feedback Type',
      'Rating',
      'Message',
      'Raw Data',
    ]);
  }

  return sheet;
}

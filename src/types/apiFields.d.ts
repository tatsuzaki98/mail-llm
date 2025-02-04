interface KintoneUser {code: string, name: string}
interface IdField {type: '__ID__', value: string}
interface RevisionField {type: '__REVISION__', value: string}
interface RecordNumberField {type: 'RECORD_NUMBER', value: string}
interface CreatedTimeField {type: 'CREATED_TIME', value: string}
interface UpdatedTimeField {type: 'UPDATED_TIME', value: string}
interface CreatorField {type: 'CREATOR', value: KintoneUser}
interface ModifierField {type: 'MODIFIER', value: KintoneUser}

interface NumberField {type: 'NUMBER', value: string}
interface SingleLineTextField {type: 'SINGLE_LINE_TEXT', value: string}
interface MultiLineTextField {type: 'MULTI_LINE_TEXT', value: string}
interface DateField {type: 'DATE', value: string | null}
interface RadioButtonField {type: 'RADIO_BUTTON', value: string}

interface AppRecord {
  $id: IdField;
  $revision: RevisionField;
  レコード番号: RecordNumberField;
  作成日時: CreatedTimeField;
  更新日時: UpdatedTimeField;
  作成者: CreatorField;
  更新者: ModifierField;
}

interface MailLogRecord extends AppRecord {
  受信メッセージ: MultiLineTextField;
  送信メッセージ: MultiLineTextField;
  対応者: SingleLineTextField;
  お客様名: SingleLineTextField;
  マスタ番号: SingleLineTextField;
  カテゴリ: SingleLineTextField;
}

interface PostRecord {
  app: number;
  record: {
    '受信メッセージ': {value: string};
    '送信メッセージ': {value: string};
    '対応者': {value: string};
    'お客様名': {value: string};
    'カテゴリ': {value: string};
  };
}

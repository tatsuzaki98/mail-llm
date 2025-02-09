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
interface RadioButtonField<T> {type: 'RADIO_BUTTON', value: T}
interface UserSelectField {type: 'USER_SELECT', value: KintoneUser[]}

type CategoryOption = "その他" | "料金制度" | "各種手続き" | "新規利用" | "水質" | "支払関連・請求書・口座振替" | "漏水対応" | "メータ・表示器・検針設備" | "大規模・都市計画法第32条" | "出水不良";
type StateOption = "未処理" | "承認申請中" | "差し戻し" | "承認済み" | "対応済み";


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
  お問合せ内容: MultiLineTextField;
  お客様名: SingleLineTextField;
  カテゴリ: RadioButtonField<CategoryOption>;
  承認コメント: MultiLineTextField;
  承認者: UserSelectField;
  状態: RadioButtonField<StateOption>;
  返信内容: MultiLineTextField;
}

interface PostRecord {
  app: number;
  record: {
    'お問合せ内容': {value: string};
    '返信内容': {value: string};
    '対応者': {value: string};
    'お客様名': {value: string};
    'カテゴリ': {value: string};

  };
}

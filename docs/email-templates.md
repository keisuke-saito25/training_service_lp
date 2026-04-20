# メール文面テンプレート集

> 作成日: 2026-04-16
> 用途: Web3Forms自動返信メール / 担当者返信用テンプレート
> 関連: [google-ads-plan.md](google-ads-plan.md) / [remaining-tasks.md](remaining-tasks.md)

---

## 1. Web3Forms 自動返信メール（お客様向け）

### 設定場所

Web3Formsダッシュボード → 対象フォーム → 設定 → **Auto-Reply** タブ

### 件名（Subject）

```
【Tech Bridge Academy】無料説明会のお申し込みありがとうございます
```

### 本文（Body）

TimeRex予約URL: `https://timerex.net/s/techbridge-academy/033d4438`（2026-04-16 設定済）

```
{{name}} 様

この度は Tech Bridge Academy にお問い合わせいただき、誠にありがとうございます。
お申し込みを確かに承りました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 次のステップ：説明会の日時をお選びください
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下記のリンクからご都合のよい日時をお選びください。
空いている時間帯がカレンダー形式で表示されます。

▼ 説明会の日時を選ぶ
https://timerex.net/s/techbridge-academy/033d4438?utm_source=email_autoreply&utm_medium=email&utm_campaign=form_followup

※ 所要時間：約30分
※ 形式：オンライン（Zoom or Google Meet）
※ 費用：無料
※ 無理な勧誘は一切ございません

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 説明会でお伝えすること
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

・カリキュラムの詳細（Phase 1 〜 Phase 3）
・受講料と支払い方法
・過去受講者の進路・就職実績
・よくあるご質問への回答
・ご不安な点のヒアリング

ご質問やご要望があれば、このメールにそのまま返信してください。
担当者よりご返信いたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tech Bridge Academy 運営事務局
freeks株式会社
お問い合わせ: contact@techbridge-academy.co.jp
サイト: https://techbridge-academy.co.jp/
```

### Web3Formsのテンプレート変数について

- `{{name}}` → フォームで入力された名前が自動挿入
- `{{email}}` → メールアドレス
- その他: Web3Formsのドキュメントで変数名を確認

### 注意

- Web3FormsのAuto-Reply機能は**送信元が `notify@web3forms.com` 固定**。独自ドメイン（`contact@techbridge-academy.co.jp`）からの送信は有料プラン（$5/月〜）が必要。
- 初期は `notify@web3forms.com` 発信でも問題なし。ブランド感を重視するなら後日有料化検討。

---

## 2. 担当者からの返信用テンプレート（手動送信）

Web3Formsからの通知受信後、担当者が `contact@techbridge-academy.co.jp` から手動返信する場合のテンプレート。

### ケースA: 説明会予約確定後のお礼＋リマインド

#### 件名
```
【Tech Bridge Academy】説明会のご予約ありがとうございます（MM月DD日 HH:MM〜）
```

#### 本文
```
{{お名前}} 様

Tech Bridge Academy の {{担当者名}} と申します。

このたびは説明会のご予約をいただき、ありがとうございます。
以下の内容で承りましたのでご確認ください。

━━━━━━━━━━━━━━━━━━━━━━━
■ 予約内容
━━━━━━━━━━━━━━━━━━━━━━━
日時: {{YYYY年MM月DD日(曜) HH:MM 〜 HH:MM}}
形式: オンライン（{{Zoom or Google Meet}}）
URL : {{会議URL}}
所要: 約30分
━━━━━━━━━━━━━━━━━━━━━━━

当日は上記URLに直接ご参加ください。
事前のアプリインストールやアカウント作成は不要です。

ご質問やご不明な点があれば、このメールに返信してください。

当日お会いできるのを楽しみにしております。

━━━━━━━━━━━━━━━━━━━━━━━
Tech Bridge Academy 運営事務局
freeks株式会社
{{担当者名}}
contact@techbridge-academy.co.jp
https://techbridge-academy.co.jp/
```

### ケースB: 予約前フォローアップ（TimeRexで予約していないユーザー向け）

フォーム申込後、24〜48時間経ってもTimeRexで予約していない人への手動フォロー用。

#### 件名
```
【Tech Bridge Academy】説明会の日時はお決まりでしょうか
```

#### 本文
```
{{お名前}} 様

Tech Bridge Academy の {{担当者名}} と申します。

先日お申し込みいただきましてありがとうございます。
説明会の日時の選択がまだの場合、下記リンクからご予約をお願いいたします。

▼ 説明会の日時を選ぶ
https://timerex.net/s/techbridge-academy/033d4438

ご都合のよい日時が見当たらない等、調整が必要な場合は、
このメールに直接返信してください。個別に日程を調整させていただきます。

不明点・ご不安な点があれば遠慮なくお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━
Tech Bridge Academy 運営事務局
freeks株式会社
{{担当者名}}
contact@techbridge-academy.co.jp
━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 3. 運用ルール（推奨）

### レスポンスタイム

| イベント | 推奨対応時間 |
|---|---|
| Web3Forms通知受信 | 自動返信は即時送信（Web3Forms側の機能） |
| TimeRexで予約確定 | TimeRexの自動通知で完結。追加対応不要 |
| 予約なし申込者のフォロー | 申込から24〜48時間以内 |
| 個別質問への返信 | 営業日内 24時間以内 |

### 件名のプレフィックス統一

全ての送信メールに `【Tech Bridge Academy】` プレフィックスを統一。ユーザーのメールボックスで識別しやすくする。

### 署名の統一

メール末尾の署名は全担当者で統一：
```
━━━━━━━━━━━━━━━━━━━━━━━
Tech Bridge Academy 運営事務局
freeks株式会社
{{担当者名}}
contact@techbridge-academy.co.jp
https://techbridge-academy.co.jp/
━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. TimeRex URL 設定情報（2026-04-16 設定済）

### 現在のTimeRex予約URL

| 用途 | URL（UTMパラメータ込み） |
|---|---|
| **自動返信メール用**（Web3Forms Auto-Reply） | `https://timerex.net/s/techbridge-academy/033d4438?utm_source=email_autoreply&utm_medium=email&utm_campaign=form_followup` |
| **サンクスページ用**（index.html） | `https://timerex.net/s/techbridge-academy/033d4438?utm_source=thanks_page&utm_medium=page&utm_campaign=form_followup` |
| **担当者フォロー用**（手動送信） | `https://timerex.net/s/techbridge-academy/033d4438` |

### Web3Forms 自動返信メール設定（次にやる作業）

| Step | 操作 |
|---|---|
| 1 | Web3Formsダッシュボードにログイン |
| 2 | 対象フォームの設定画面 → **Auto-Reply** タブ |
| 3 | 件名・本文を上記「1. Web3Forms 自動返信メール」からコピペ（URL差替済のもの） |
| 4 | **Enable Auto-Reply** を **ON** |
| 5 | Test Send で自分宛てに送信テスト |

### URL変更時の差替手順（将来用）

万が一 TimeRex URL を変更する場合：

- 検索: `https://timerex.net/s/techbridge-academy/033d4438`
- 置換: 新URL
- VSCodeの「プロジェクト全体で検索置換」（Ctrl+Shift+H）で一括対応

対象ファイル: [docs/email-templates.md](email-templates.md) / [index.html](../index.html)

---

## 5. サンクスページのTimeRexボタンについて

### 動作仕様

- [index.html](../index.html) のサンクスページには TimeRex 予約ボタンが埋め込み済み
- [script.js](../script.js) の `initTimerexLink()` がURLがプレースホルダ（`TIMEREX_URL_HERE` 含む）かを判定
- 実URL設定時はボタン表示＋TimeRex誘導メッセージ、プレースホルダ時はフォールバックメッセージに切り替え
- **現在は実URL設定済でボタン表示モード**

### 計測

TimeRexボタンクリック時、GA4に `timerex_click` イベントが送信される：

| パラメータ名 | 値 |
|---|---|
| `source` | `thanks_page` |
| `link_url` | 実際の遷移先URL |

将来 `timerex_click` をキーイベント化すれば「フォーム送信 → TimeRex予約クリック」のファネル転換率が計測可能。

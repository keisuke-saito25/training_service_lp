# Tech Bridge Academy LP インフラ構成書

> 最終更新: 2026-04-20
> 用途: LP運用に必要な外部サービス構成・設定値・構築履歴の集約
> 関連: [handoff.md](handoff.md) / [remaining-tasks.md](remaining-tasks.md) / [google-ads-plan.md](google-ads-plan.md) / [email-templates.md](email-templates.md)

本書はLP公開・広告運用に必要な技術基盤の全体像を記録しています。

---

## 1. システムアーキテクチャ全体像

```
[ユーザー（広告クリック or 自然流入）]
     ↓ ① UTM/GCLID付きURL
[https://techbridge-academy.co.jp/ ← GitHub Pages]
     ├── GA4 計測（G-5T1FWERLQZ）
     ├── Search Console 登録済
     └── UTM/GCLID localStorage 90日保持
     ↓ ② フォーム送信
[EmailJS（ムームーSMTP経由）]
     ├── 運営通知メール → contact@techbridge-academy.co.jp
     └── ユーザー自動返信メール（TimeRexリンク付き）
     ↓ ③ サンクスページ or 自動返信メール経由
[TimeRex 予約ページ]
     ↓ ④ 日時選択
[Googleカレンダー予定登録 + リマインド]
     ↓
[説明会参加 → 成約（スプレッドシート手動管理）]
```

---

## 2. ドメイン・ホスティング

### ドメイン
| 項目 | 値 |
|---|---|
| 本番URL | `https://techbridge-academy.co.jp/` |
| ドメイン取得元 | ムームードメイン |
| DNS管理 | ムームーDNS（カスタム設定モード） |

### DNSレコード一覧

| Type | Name | Value | 用途 |
|:---:|:---:|---|---|
| A | （空） | `185.199.108.153` | GitHub Pages (1/4) |
| A | （空） | `185.199.109.153` | GitHub Pages (2/4) |
| A | （空） | `185.199.110.153` | GitHub Pages (3/4) |
| A | （空） | `185.199.111.153` | GitHub Pages (4/4) |
| CNAME | `www` | `keisuke-saito25.github.io` | wwwサブドメイン |
| MX | （空） | `mx01.muumuu-mail.com`（優先度50） | メール受信 |
| TXT | （空） | `v=spf1 incl...` | SPF認証 |
| TXT | `_dmarc` | `v=DMARC...` | DMARC認証 |
| TXT | （空） | `google-site-verification=URaJw14ykhRVf906oZd6wxDP_Ioez_gEQvyx-peFMRg` | Search Console所有権確認 |

### ホスティング
| 項目 | 値 |
|---|---|
| リポジトリ | `keisuke-saito25/training_service_lp` |
| 配信方式 | GitHub Pages（master自動デプロイ） |
| カスタムドメイン設定 | リポジトリルートの `CNAME` ファイル + Pages設定 |
| HTTPS | Enforce HTTPS 有効 |
| SSL証明書 | GitHub/Let's Encrypt 自動発行 |

---

## 3. メールアドレス運用

| アドレス | 役割 | 備考 |
|---|---|---|
| `contact@techbridge-academy.co.jp` | 顧客問い合わせ窓口 | フォーム通知受信 / Reply-To先 |
| `info@techbridge-academy.co.jp` | システム・管理系メール集約 | EmailJSログイン・広告通知等 |

どちらもムームーメール（ムームードメイン契約）で運用。

---

## 4. GA4（計測基盤）

| 項目 | 値 |
|---|---|
| アカウント名 | `freeks Inc.` |
| プロパティ名 | `Tech Bridge LP` *（※サービス名変更に合わせて `Tech Bridge Academy LP` へリネーム推奨）* |
| 測定ID | `G-5T1FWERLQZ` |
| ストリームID | `14372745324` |
| ストリームURL | `https://techbridge-academy.co.jp` |
| タイムゾーン | 日本 |
| 通貨 | JPY |
| データ保持期間 | 14ヶ月（最大値） |
| 新しいアクティビティでリセット | ON |
| 内部トラフィック除外 | 有効（IP: 非公開・動的IPのため要定期更新） |
| Search Console連携 | 完了 |

### 実装済カスタムイベント（[script.js](../script.js)）

| イベント名 | 発火タイミング | キーイベント化 |
|---|---|:---:|
| `step_form_progress` | ステップフォーム各段階の選択時 | — |
| `step_form_complete` | フォーム送信成功時 | ⬜ 未着手（要実施） |
| `cta_click` | CTAボタンクリック時 | ⬜ 未着手 |
| `timerex_click` | サンクスページTimeRexボタンクリック時 | ⬜ 未着手 |
| `scroll_depth` | 25/50/75/100% スクロール時 | — |
| `faq_open` | FAQ開閉時 | — |

---

## 5. Search Console

| 項目 | 値 |
|---|---|
| プロパティタイプ | ドメインプロパティ |
| ドメイン | `techbridge-academy.co.jp` |
| 所有権確認 | DNS TXTレコードで認証済 |
| サイトマップ | `https://techbridge-academy.co.jp/sitemap.xml`（送信済・Google取得待ち or 自動リトライ中） |
| GA4連携 | 完了 |

---

## 6. EmailJS（フォーム送信基盤）

Web3Formsから移行（自動返信が有料限定だったため）。

| 項目 | 値 |
|---|---|
| ログインアカウント | `info@techbridge-academy.co.jp`（Email+Password） |
| Service ID | `service_e8mf6ci` |
| 送信経路 | ムームーSMTP（`smtp.muumuu-mail.com:465` SSL / User: `contact@techbridge-academy.co.jp`） |
| Template 1: Admin Notification | `template_jj49gu6` |
| Template 2: Auto Reply to User | `template_dxbburs` |
| Public Key | `Va5s2GIZMdHv3Xtpr` |
| プラン | Free（200 req/月 ≒ 100件のフォーム送信）|
| 超過時選択肢 | EmailJS Pro（$8/月）or Web3Forms Pro（$5/月）へ切替 |

### 埋込位置（[index.html](../index.html)）

```html
<!-- <head> 内 -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
  emailjs.init({ publicKey: "Va5s2GIZMdHv3Xtpr" });
</script>
```

### 送信ロジック（[script.js](../script.js) 内 `initStepForm` の submit ハンドラ）

```javascript
await emailjs.sendForm(SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, contactForm);     // 運営通知（必須）
await emailjs.sendForm(SERVICE_ID, EMAILJS_TEMPLATE_AUTOREPLY, contactForm); // 自動返信（補助）
```

---

## 7. TimeRex（予約管理）

| 項目 | 値 |
|---|---|
| ログインアカウント | オーナー個人Googleアカウント（Continue with Google） |
| チーム名 | `Tech Bridge Academy` |
| チームID | `techbridge-academy` |
| 予約URL | `https://timerex.net/s/k-kishi_2fa9_b793/b93b8946` |
| プラン | プレミアムトライアル中（2週間 / 自動課金なし） |
| 連携カレンダー | Google カレンダー |

---

## 8. Google広告

| 項目 | 値 |
|---|---|
| アカウント | 未開設 |
| 予算方針 | 月5万円スタート |
| 運用計画 | [docs/google-ads-plan.md](google-ads-plan.md) |

---

## 9. LP実装の要点

### UTM/GCLIDトラッキング
- LP到達時に localStorage（キー: `tb_attribution`）に保存
- 90日保持（GCLID想定）
- 新しいUTMパラメータで上書き（Last Click Attribution）
- フォーム送信時に hidden input 経由でEmailJS送信データに含まれる

### サンクスページ設計
- URLがプレースホルダ（`TIMEREX_URL_HERE`）のうちはTimeRexボタン非表示（フォールバックメッセージ）
- 実URL設定時は自動でTimeRexボタン表示 + 誘導メッセージに切替
- クリック時に `timerex_click` GA4イベント発火

### フォーム項目
- 必須: 名前・メール
- 任意: 電話番号
- ステップ回答（hidden）: 年齢・プログラミング経験（日本語ラベル）
- トラッキング（hidden）: UTM 5種・GCLID・landing_page・referrer

---

## 10. 構築履歴タイムライン

| 日付 | 主な作業 |
|---|---|
| 2026-04-14 | Web3Forms設定 / GA4プロパティ作成（G-5T1FWERLQZ）/ UTM/GCLIDトラッキング実装 / ムームーDNS設定 / GitHub Pages カスタムドメイン / SSL有効化 / コード内URL全置換 |
| 2026-04-14 | 問合せフォーム最適化（「希望時間帯」削除）/ サンクスページ TimeRex ボタン実装 / TimeRex アカウント作成・予約URL発行 |
| 2026-04-16 | GA4 データ保持14ヶ月化 / 内部トラフィック除外 / Search Console 登録・サイトマップ送信・GA4連携 |
| 2026-04-16 | サービス名「Tech Bridge」→「Tech Bridge Academy」にリブランド（LP本文・メタデータ・メール文面・OGP） |
| 2026-04-20 | **Web3Forms → EmailJS 移行**（自動返信を無料プランで実現）/ 運営通知メール・ユーザー自動返信両方稼働確認 / メール本文の英語キー（`self-study` 等）を日本語ラベル（「独学で少し触った程度」等）化 |

---

## 11. 未完了タスク（2026-04-20時点）

| 優先 | タスク | 所要 | 担当 |
|:---:|---|---|:---:|
| 🥇 | GA4 キーイベント化（`step_form_complete` / `cta_click` / `timerex_click`） | 2分 | 👤 |
| 🥈 | Google広告アカウント開設（Ads-Phase A） | 30分 | 👤 |
| 🥉 | Search Console サイトマップ再送信確認 | 1分 | 👤 |
| - | GA4プロパティ名を `Tech Bridge Academy LP` にリネーム（任意） | 30秒 | 👤 |

---

## 12. 運用上の注意事項

- **ムームーDNSの既存レコード（MX/SPF/DMARC）は絶対に削除しない**（削除するとメール受信不可）
- **内部トラフィック除外のIPは動的IP**のため、月1回程度の再確認推奨
- **EmailJS無料プラン**は月200リクエスト。1フォーム送信で2リクエスト消費するため実質100件/月
- **ブランドドメインからのメール送信**（`contact@techbridge-academy.co.jp`）維持のため、ムームーメールのパスワード管理は厳重に
- **TimeRex/EmailJSのSaaSアカウント**は属人化しないよう、引き継ぎ時は管理者権限の移管を忘れずに

---

## 13. 参考リンク

- 本番サイト: [https://techbridge-academy.co.jp/](https://techbridge-academy.co.jp/)
- GitHubリポジトリ: [https://github.com/keisuke-saito25/training_service_lp](https://github.com/keisuke-saito25/training_service_lp)
- GA4: [https://analytics.google.com](https://analytics.google.com)
- Search Console: [https://search.google.com/search-console](https://search.google.com/search-console)
- EmailJS: [https://www.emailjs.com](https://www.emailjs.com)
- TimeRex: [https://timerex.net](https://timerex.net)
- ムームードメイン: [https://muumuu-domain.com/](https://muumuu-domain.com/)

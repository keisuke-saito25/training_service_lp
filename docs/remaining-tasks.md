# LP完成までの残作業一覧

> 作成日: 2026-02-27
> 最終更新: 2026-04-16
> 分類: 🔧 技術実装（AIが対応可）/ 👤 オーナー作業 / 🤝 共同作業
> 関連計画: [Google広告 運用計画](google-ads-plan.md) / [メール文面テンプレート](email-templates.md)

## 🎯 現在のマイルストーン（2026-04-16時点）

### ✅ 完了（LP技術基盤）

- Web3Forms アクセスキー取得・反映（contact@techbridge-academy.co.jp）
- GA4 プロパティ作成・測定ID取得（G-5T1FWERLQZ / freeks Inc.）
- GA4計測タグのサイト反映 + リアルタイム計測動作確認
- GA4 データ保持期間14ヶ月変更
- GA4 内部トラフィック除外（自社IPフィルタ有効化）
- UTM/GCLIDトラッキング実装（localStorage 90日保持）
- ムームードメイン DNS設定（既存MX/SPF/DMARC保持、A×4 + CNAME追加 + Search Console TXT）
- 本番ドメイン公開（https://techbridge-academy.co.jp/ + HTTPS）
- コード内URL全置換（canonical / OGP / sitemap / robots.txt）
- Web3Forms通知メール到達確認（UTM/GCLID/landing_page等が本文に含まれることを確認）
- localStorage保存動作確認（URLパラメータ→localStorage→JSONとして取得可能）
- Search Console ドメインプロパティ登録・所有権確認・サイトマップ送信・GA4連携
- フォーム「ご希望の時間帯」削除（TimeRex移行のため）
- サンクスページに TimeRex 予約ボタン実装 + `timerex_click` イベント計測
- TimeRex アカウント作成・予約ページ発行（`techbridge-academy` チーム / URL: `https://timerex.net/s/techbridge-academy/033d4438`）
- LP内 TimeRex URL反映（サンクスページ + email-templatesドキュメント）

### ⬜ 次の着手候補（すべて👤オーナー側のUI作業）

| # | 作業 | 所要 | 優先 |
|---|------|------|:----:|
| 1 | GA4: `step_form_complete` / `cta_click` をキーイベント化 | 2分 | 🥇 翌日以降 |
| 2 | Web3Forms 自動返信メール設定（テンプレは[email-templates.md](email-templates.md)に準備済） | 5分 | 🥇 |
| 3 | Google広告アカウント開設（Ads-Phase A開始） | 30分 | 🥈 (1完了後) |
| 4 | Search Console サイトマップ再送信（取得できませんでした場合） | 1分 | 🥉 翌日以降 |

---

## Phase 0: 公開前の必須対応

| # | 作業 | 担当 | 状態 | 備考 |
|---|------|------|:----:|------|
| 0-1 | ~~**問い合わせフォーム用Web3Forms設定**~~ | 👤 | ✅ | 2026-04-14 完了: contact@techbridge-academy.co.jp で登録 / アクセスキー差替済 |
| 0-2 | ~~**GA4 プロパティ作成 + Measurement ID 取得**~~ | 👤 | ✅ | 2026-04-14 完了: freeks Inc. アカウント配下に `Tech Bridge LP` プロパティ作成 / 測定ID `G-5T1FWERLQZ` 取得 |
| 0-3 | ~~**GA4 ID をサイトに反映**~~ | 🔧 | ✅ | 2026-04-14 完了: `index.html` L36 / L41 を実IDに差替 |
| 0-4 | ~~**GA4 イベントトラッキング実装**~~ | 🔧 | ✅ | `script.js` に5種実装済み（`cta_click` / `step_form_progress` / `step_form_complete` / `scroll_depth` / `faq_open`）。ID差し替え後に即計測開始 |

---

## Phase 1: GA4 基本設定（ID取得後すぐ）

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 1-1 | **GA4 コンバージョン設定** | 👤 | GA4管理画面 → イベント → `step_form_complete` `cta_click` を「コンバージョンとしてマーク」 |
| 1-2 | **Search Console 登録** | 👤 | [search.google.com/search-console](https://search.google.com/search-console) → プロパティ追加 |
| 1-3 | **sitemap.xml を Search Console に送信** | 👤 | Search Console → サイトマップ → URL送信（設置済みの `sitemap.xml` を指定） |
| 1-4 | **GA4 と Search Console を連携** | 👤 | GA4管理画面 → プロダクトリンク → Search Console |

---

## Phase 2: 分析基盤の構築

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 2-1 | **Microsoft Clarity アカウント作成** | 👤 | [clarity.microsoft.com](https://clarity.microsoft.com) → プロジェクトIDを取得。ヒートマップ・セッション録画・スクロール到達率が無料で使える |
| 2-2 | **Clarity タグをサイトに設置** | 🔧 | `<head>` にJSタグ追加 → デプロイ |
| 2-3 | **導入企業ロゴの配置** | 🤝 | 信頼バーにロゴ画像を追加（実素材が必要） |

---

## Phase 3: GTM統合 + 高度な計測（推奨）

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 3-1 | **GTM アカウント + コンテナ作成** | 👤 | [tagmanager.google.com](https://tagmanager.google.com) → コンテナIDを取得 |
| 3-2 | **GTMコンテナに既存タグを移行** | 🔧 | gtag.js 直接設置 → GTM経由に切替。今後のタグ追加がコード変更不要に |
| 3-3 | **「本当の滞在時間」計測設定** | 🔧 | GTMタイマートリガー（15秒間隔）でイベント発火。直帰ユーザーの滞在時間も計測可能に |
| 3-4 | **UTMパラメータ運用ルール策定** | 👤 | source / medium / campaign の命名規則を決定 |

---

## Phase 4: 運用体制の整備

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 4-1 | **オフライン指標の追跡フロー構築** | 👤 | 予約→参加→成約のファネルをスプレッドシートで管理。UTMをフォームに引き渡して流入元別に追跡 |
| 4-2 | **説明会担当者との振り返りフォーマット作成** | 👤 | 「決め手」「失注理由」「ユーザーの印象」を記録するテンプレート |
| 4-3 | **定期レビューの仕組み化** | 👤 | 週次/月次でGA4 + Clarity + 商談データを確認する運用 |
| 4-4 | **自動日程調整の導入（将来）** | 🤝 | リード獲得が安定後、TimeRexでの日程調整を自動返信メールやサンクス画面に組み込む |

---

## Phase 5: データ蓄積後の改善（1〜2ヶ月後）

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 5-1 | **「時間×スクロール」体感検証** | 🤝 | Clarity録画 + GA4滞在時間で離脱ポイントを特定 → 自身でLPを同じ時間だけ読んで体感 |
| 5-2 | **流入経路別のLP適合度チェック** | 🤝 | 検索 vs SNSでFVの期待値ギャップがないか確認 |
| 5-3 | **改善施策の優先順位マトリクス作成** | 🤝 | 「できる×効果大」→「できない×効果大」→「できる×効果小」の順で整理 |
| 5-4 | **改善施策の実装** | 🔧 | FVコピー変更、セクション順序変更、CTA文言変更 等 |

---

## Phase 6: A/Bテスト（十分なトラフィック確保後）

| # | 作業 | 担当 | 備考 |
|---|------|------|------|
| 6-1 | **トラフィック量の確認** | 👤 | 月間PVが少ない場合はA/Bテストより大胆な改修を優先 |
| 6-2 | **仮説に基づくテスト設計** | 🤝 | 「1回につき1箇所」の原則で変更箇所を決定 |
| 6-3 | **A/Bテスト実装** | 🔧 | GTM or JSで出し分け実装 |
| 6-4 | **結果検証 + 勝ちパターン反映** | 🤝 | 統計的有意差が出たら本採用 → デプロイ |

---

## あると良いが必須ではないもの

| 作業 | 備考 |
|------|------|
| 研修紹介動画（1〜2分） | 撮影・編集が必要。FV直下に配置 |
| 受講者の声カルーセル化（SP用） | 横スワイプで省スペース+滞在時間UP |

---

## 着手の流れ

```
Phase 0 （予約URL + GA4 ID） ← 最優先
  ↓
Phase 1 （Search Console + コンバージョン設定）
Phase 2 （Clarity ヒートマップ）
  ↓
Phase 3 （GTM移行 + 滞在時間計測）
Phase 4 （運用フロー整備）
  ↓
1〜2ヶ月データ蓄積
  ↓
Phase 5 （データ分析・改善）
  ↓
Phase 6 （A/Bテスト）
```

Phase 0 が完了すれば、Phase 1〜3 の技術実装はすべてAI側で対応可能。

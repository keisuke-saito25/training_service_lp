---
description: サイト修正後にGitHub Pagesへ反映する手順
---

# LP更新・デプロイ手順

## 前提情報
| 項目 | 値 |
|---|---|
| リポジトリ | `keisuke-saito25/training_service_lp` |
| 公開URL | https://keisuke-saito25.github.io/training_service_lp/ |
| ブランチ | `master` |
| ホスティング | GitHub Pages（自動デプロイ） |

---

## 更新手順

### 1. 変更内容の確認
// turbo
```bash
cd c:\Users\skeis\Projects\training_service_lp
git diff --stat
```

### 2. ブラウザで表示確認
- `file:///c:/Users/skeis/Projects/training_service_lp/index.html` をブラウザで開く
- 変更箇所が正しく表示されるか確認
- 画像を追加した場合、パスが相対パス（例: `images/xxx.png`）であること

### 3. コミット＆プッシュ
```bash
cd c:\Users\skeis\Projects\training_service_lp
git add .
git commit -m "変更内容をここに記載"
git push
```

### 4. 公開確認
- プッシュ後 **1〜5分** で自動反映
- https://keisuke-saito25.github.io/training_service_lp/ にアクセス
- 反映されない場合は `Ctrl+Shift+R`（スーパーリロード）

---

## トラブルシューティング
| 症状 | 対処 |
|---|---|
| 変更が反映されない | `git push` 完了を確認 → 数分待つ → スーパーリロード |
| 画像が表示されない | ファイル名の大文字小文字がHTMLと一致しているか確認 |
| 404エラー | `index.html` がルート直下にあるか確認 |
| pushが拒否される | `git pull --rebase` 後に再度 `git push` |

もちろん。
以下に、**ハッカソン前提・モックデータ前提**で、**Figma Make にそのまま渡しやすい形**の

* **エンジニア向け使用説明書**
* **画面設計方針**
* **学生側 / 企業側のUI要件**
* **オンボーディング設計**
* **モックデータ**
* **Figma Make用プロンプト**

をまとめます。

---

# Career Compass Trial

## エンジニア向け使用説明書 / Figma Make用仕様書

---

## 1. これは何を作るのか

### プロダクト名

**Career Compass Trial**

### コンセプト

**「診断する就活」ではなく、「実験する就活」。**

学生がいきなり企業を選ぶのではなく、

1. **A/B選択で価値観の仮説を作る**
2. **短いJob Trial（仕事体験）を試す**
3. **振り返りで自分の向き・不向きを知る**
4. **企業とつながる**
5. **経験がCareer Passportとして蓄積される**

という流れで、自分に合う仕事や企業を見つける体験を提供する。

---

## 2. ハッカソンで作るMVPの範囲

ハッカソンでは全部は作らず、以下に絞る。

### 学生側MVP

* オンボーディング
* A/B選択による簡易価値観推定
* Job Trial一覧
* Job Trial詳細
* Trial体験開始画面
* 振り返り入力
* 結果レポート
* Career Passport
* 興味を持った企業との接点

### 企業側MVP

* 企業ログイン
* 企業ダッシュボード
* Mission作成
* 学生一覧
* 学生詳細
* 分析画面

### 非機能要件（ハッカソン向け）

* **すべてモックデータでOK**
* 認証はダミーでOK
* AI推定は固定ロジックやダミー結果でOK
* Mission体験は実際の作業を完全実装しなくてよい
* 重要なのは**UXの一貫性とストーリー**

---

# 3. 主要ユーザー

## 3-1. 学生ユーザー

### 想定

* 大学2〜4年生
* 自分に向いている仕事が分からない
* 企業名ではなく仕事内容で比較したい
* インターンは重くて参加しづらい
* 診断だけでは納得しづらい

### 学生が達成したいこと

* 自分に合いそうな仕事を知る
* 実際に少し試してみる
* 仕事体験を通じて自己理解を深める
* 気になった企業に出会う
* 経験をポートフォリオとして残す

---

## 3-2. 企業ユーザー

### 想定

* 中堅企業
* BtoB企業
* 知名度が高くない企業
* 学生に仕事内容が伝わりづらい企業
* 仕事に本当に興味がある学生と会いたい企業

### 企業が達成したいこと

* 実務に近いMissionを掲載する
* 興味度の高い学生を見つける
* 成果物や振り返りを見て学生を理解する
* スカウト候補を絞り込む
* 採用広報を“体験”で行う

---

# 4. 体験全体の情報設計

---

## 学生側の流れ

### Flow A：初回利用

1. Splash
2. オンボーディング3枚
3. ロール選択（学生 / 企業）
4. 学生ログイン / ダミー登録
5. プロフィール簡易設定
6. A/B選択（5〜8問）
7. 初回結果表示
8. おすすめJob Trial表示

### Flow B：継続利用

1. ホーム
2. おすすめMissionを見る
3. Mission詳細
4. 体験開始
5. 振り返り回答
6. 結果更新
7. Passportに蓄積
8. 気になる企業を見る

---

## 企業側の流れ

### Flow C：企業初回利用

1. ロール選択
2. 企業ログイン / ダミー登録
3. 企業プロフィール設定
4. Mission作成
5. Mission公開
6. 学生の反応を確認

### Flow D：継続利用

1. ダッシュボード
2. Mission別成果確認
3. 学生一覧
4. 学生詳細確認
5. スカウト候補検討
6. 分析確認

---

# 5. UXの重要方針

---

## 5-1. 脱落率を下げるオンボーディング

学生向けは最初から長い診断をさせない。

### 原則

* 1画面1目的
* 最初の数分で価値を感じさせる
* 「診断を受ける」感ではなく「すぐ試せる」感を出す
* 難しい言葉は避ける
* 進捗が見えるUIにする

### オンボーディングの訴求メッセージ

1. **仕事を選ぶ前に、少し試せる**
2. **A/B選択から、自分の価値観が見えてくる**
3. **体験した結果が、キャリアの地図になる**

---

## 5-2. 学生側UIの方針

* **モバイルファースト**
* カード中心
* 明るく親しみやすい
* 分析結果は難しくしない
* 「次にやること」が常に分かる

---

## 5-3. 企業側UIの方針

* **デスクトップWeb前提**
* 情報密度高めでもよい
* 数字・一覧・フィルタを見やすく
* 「誰に刺さっているか」が一目で分かる
* ATSというより採用広報ダッシュボード寄り

---

# 6. 学生側 画面仕様

---

## S-01. Splash Screen

### 目的

最初の印象づけ

### 表示要素

* ロゴ
* サービス名
* タグライン
  **「診断する就活から、実験する就活へ。」**
* CTA

  * はじめる
  * 企業の方はこちら

---

## S-02〜S-04. Onboarding

### S-02

**タイトル**
仕事を選ぶ前に、少し試してみよう

**説明**
Career Compass Trialでは、短い仕事体験を通じて、自分に合う仕事のヒントを見つけられます。

### S-03

**タイトル**
A/B選択で、自分の価値観が見えてくる

**説明**
「どちらが気になる？」という簡単な比較から、あなたが重視するポイントを見つけます。

### S-04

**タイトル**
体験結果が、あなたのキャリアの地図になる

**説明**
試した仕事や感じたことはCareer Passportに残り、次の選択に活かせます。

### 共通要素

* イラスト
* スキップ
* 次へ
* 進捗インジケータ

---

## S-05. Role Select

### 目的

学生 / 企業を分岐

### 表示要素

* 「あなたはどちらですか？」
* 学生として使う
* 企業として使う

---

## S-06. Student Sign Up / Login

### 目的

簡易登録

### 表示要素

* メールアドレス
* パスワード
* Googleで続ける（モック）
* 「まずは体験してみる」ゲスト導線

### ハッカソン向け

実認証不要。ボタン押下で遷移でOK。

---

## S-07. Student Basic Profile

### 項目

* 名前
* 学年
* 学部
* 興味のある領域（複数選択）
* 将来まだ決まっていない / なんとなくある

### CTA

* 次へ
* あとで設定する

---

## S-08. A/B Preference Intro

### 目的

A/B選択の導入

### コピー

**「まずは5問だけ。あなたが何を大切にしたいか、選択から見つけます。」**

### 要素

* 所要時間：1分
* 進捗バー
* はじめる

---

## S-09〜S-13. A/B Choice Questions

### 1問1画面

左右2枚のカードで表示

### 例

#### 質問

「どちらの働き方が今の自分に近いですか？」

#### A

* 給与は高め
* 一人で集中して進める
* 進行は自分で決めやすい

#### B

* 給与は標準
* チームで相談しながら進める
* 学べる環境がある

### 要素

* Aカード
* Bカード
* 「どちらも気になる」
* 戻る
* 進捗バー

---

## S-14. Preference Result

### 表示内容

* タイトル
  **「あなたの価値観の仮説」**
* 6軸レーダー / 棒グラフ

  * お金・安定
  * 働きやすさ
  * 人・雰囲気
  * 成長
  * 自由度
  * やりがい
* 一言説明

  * あなたは今のところ「人・雰囲気」「成長」を重視する傾向があります
* CTA

  * おすすめの仕事を試す
  * 後で見る

---

## S-15. Student Home

### 目的

継続利用の中心

### セクション

1. 今日のおすすめ
2. 次に試すMission
3. あなたの価値観
4. 最近の体験
5. Career Passport

### 例

* おすすめMission：商品企画体験
* 今日の一言：「人と話しながら考える仕事に向いているかも」
* CTA：今すぐ試す

### Navigation

* Home
* Explore
* Passport
* Companies
* Profile

---

## S-16. Mission Explore

### 検索 / 一覧画面

### 要素

* 検索バー
* フィルタ

  * 職種
  * 所要時間
  * 難易度
  * 個人 / チーム
* Missionカード

### Missionカード項目

* タイトル
* 企業名（匿名でも可）
* 所要時間
* タグ
* おすすめ理由
* 「試す」ボタン

---

## S-17. Mission Detail

### 表示内容

* タイトル
* 企業名
* Mission概要
* どんな人におすすめか
* 所要時間
* 得られること
* 進め方
* 企業紹介
* 開始ボタン

### CTA

* このMissionを試す
* 保存

---

## S-18. Mission Trial Screen

### 目的

簡易的な疑似体験

### 例

商品企画Missionなら

* 課題文
* インプット資料カード
* メモ欄
* 回答欄
* 保存
* 提出

### MVPでは

静的UI + 入力フォームだけでもよい

---

## S-19. Reflection

### 体験後に必ず出す

### 質問

* 楽しかったですか？
* もっとやってみたいですか？
* 自分に合っていると感じましたか？
* 難しかったですか？
* 一人作業 / チーム作業どちらが合っていた？

### UI

* 5段階評価
* テキスト一言感想

---

## S-20. Updated Result

### 表示内容

* 「体験を反映して、あなたのキャリア地図を更新しました」
* 更新された価値観
* 前回との差分
* 次におすすめするMission
* 気になる企業

---

## S-21. Career Passport

### 目的

経験の蓄積画面

### 表示要素

* 完了Mission数
* 職種別経験
* 得意傾向
* 満足度傾向
* 実績カード

### 実績カード例

* 商品企画 Mission
* 自己満足度 4.8
* 継続意欲 5.0
* 完了日
* メモ

---

## S-22. Company Reveal / Company Match

### 目的

気になる企業との接続

### 表示内容

* あなたが高い満足度を示したMissionを提供した企業
* なぜ合いそうか
* 企業文化
* インターンを見る
* 興味ありを送る

---

## S-23. Student Profile

### 表示内容

* 名前
* 学年
* 自己紹介
* 価値観サマリ
* Passport概要
* 設定
* 通知

---

# 7. 企業側 画面仕様

---

## C-01. Company Login

### 要素

* メールアドレス
* パスワード
* ログイン
* デモ企業で入る

---

## C-02. Company Onboarding

### 入力項目

* 企業名
* 業界
* 所在地
* 企業紹介
* 採用職種
* アイコン / ロゴ

### CTA

* ダッシュボードへ

---

## C-03. Company Dashboard

### 表示したいKPI

* 公開中Mission数
* 試行数
* 完了数
* 興味あり数
* スカウト候補数

### セクション

* 今日のサマリ
* 人気Mission
* 最近の学生
* 価値観別の反応

---

## C-04. Mission List

### 表示内容

* Missionタイトル
* 状態
* 参加者数
* 完了率
* 興味あり率
* 編集

---

## C-05. Create Mission

### 作成フォーム

* Mission名
* 職種カテゴリ
* 概要
* 所要時間
* 難易度
* 個人 / チーム
* 課題本文
* 提出物
* おすすめしたい人物像

### CTA

* 下書き保存
* 公開する

---

## C-06. Mission Analytics

### 分析内容

* 閲覧数
* 開始数
* 完了率
* 平均満足度
* 価値観別反応
* 学年別反応

### 可視化例

* 棒グラフ
* 円グラフ
* ヒートマップ風カード

---

## C-07. Student List

### 表示内容

* 名前
* 学年
* 興味職種
* 完了Mission数
* 興味度
* ステータス

### フィルタ

* 学年
* Mission
* 興味度
* 価値観傾向

---

## C-08. Student Detail

### 表示内容

* 基本情報
* 価値観サマリ
* 完了Mission
* 成果物サマリ
* 振り返り
* 興味あり度
* スカウトボタン

---

## C-09. Company Profile / Billing Mock

### MVPでは簡易でOK

* 企業情報
* プラン（モック）
* 設定

---

# 8. デザイン指針

---

## トーン

* 親しみやすい
* 未来感がある
* 難しすぎない
* キャリア×実験のイメージ

## カラー

* ベース：ホワイト
* メイン：ブルー or パープル系
* アクセント：ミント / オレンジ
* 成功：グリーン
* 注意：イエロー

## フォント

* 読みやすいサンセリフ
* 見出しは太め
* 本文は軽め

## コンポーネント

* カード
* ボタン
* タブ
* 進捗バー
* モーダル
* 評価チップ
* バッジ

---

# 9. モックデータ

---

## 9-1. 学生モックデータ

```json
{
  "id": "stu_001",
  "name": "佐藤 美咲",
  "schoolYear": "大学3年",
  "faculty": "経済学部",
  "interests": ["商品企画", "マーケティング", "人事"],
  "preferenceScores": {
    "money_security": 62,
    "work_life": 71,
    "people_culture": 84,
    "growth": 79,
    "autonomy": 58,
    "meaning": 73
  },
  "completedMissions": 3,
  "passportSummary": {
    "planning": 4.8,
    "analysis": 3.1,
    "teamwork": 4.5
  }
}
```

---

## 9-2. Missionモックデータ

```json
[
  {
    "id": "mis_001",
    "title": "新商品のSNS企画を考える",
    "company": "株式会社Lumo",
    "category": "商品企画",
    "duration": "20分",
    "difficulty": "初級",
    "style": "チーム向き",
    "tags": ["企画", "マーケ", "アイデア"],
    "summary": "20代向け商品のSNS企画を3案考えるミッションです。",
    "recommendedFor": ["アイデアを考えるのが好き", "人の反応を想像するのが好き"]
  },
  {
    "id": "mis_002",
    "title": "売上データから課題を見つける",
    "company": "DataNest株式会社",
    "category": "データ分析",
    "duration": "25分",
    "difficulty": "中級",
    "style": "個人向き",
    "tags": ["分析", "データ", "改善"],
    "summary": "簡単な売上表から改善点を考えるミッションです。",
    "recommendedFor": ["数字を見るのが好き", "仮説を立てるのが好き"]
  },
  {
    "id": "mis_003",
    "title": "学生向けイベントの集客施策を考える",
    "company": "Bridge Works",
    "category": "マーケティング",
    "duration": "15分",
    "difficulty": "初級",
    "style": "個人/チーム両方",
    "tags": ["集客", "企画", "マーケ"],
    "summary": "イベントの参加者を増やすための施策を考えるミッションです。",
    "recommendedFor": ["企画が好き", "人に届ける仕事に興味がある"]
  }
]
```

---

## 9-3. 企業モックデータ

```json
[
  {
    "id": "com_001",
    "name": "株式会社Lumo",
    "industry": "消費財",
    "location": "東京",
    "description": "若年層向けライフスタイルブランドを展開する企業。",
    "openMissions": 2,
    "trialCount": 124,
    "interestCount": 26
  },
  {
    "id": "com_002",
    "name": "DataNest株式会社",
    "industry": "IT / データ",
    "location": "大阪",
    "description": "企業向けにデータ活用支援を行うSaaS企業。",
    "openMissions": 1,
    "trialCount": 85,
    "interestCount": 18
  }
]
```

---

## 9-4. 企業側 学生一覧モック

```json
[
  {
    "id": "stu_001",
    "name": "佐藤 美咲",
    "schoolYear": "大学3年",
    "missionCompleted": 3,
    "interestLevel": "高",
    "fitTags": ["企画", "チーム志向", "成長重視"],
    "status": "スカウト候補"
  },
  {
    "id": "stu_002",
    "name": "田中 健太",
    "schoolYear": "大学4年",
    "missionCompleted": 2,
    "interestLevel": "中",
    "fitTags": ["分析", "個人作業", "自由度重視"],
    "status": "フォロー中"
  }
]
```

---

# 10. エンジニア向け実装メモ

---

## フロント想定

* 学生側：モバイルアプリ風UI
* 企業側：Webダッシュボード風UI

## 技術的に簡略化してよい部分

* 認証：ダミー
* A/B分析：固定ロジック
* 推薦：if文ベースでもOK
* Mission体験：フォーム入力のみでOK
* Passport：ローカルstateでもOK

## 簡易ロジック例

* A/B回答から各価値観スコアを加算
* Missionカテゴリと満足度でおすすめ更新
* 完了MissionをPassportに追加

---

# 11. Figma Make用プロンプト

以下は**そのままFigma Makeに渡しやすい文章**です。

---

## Figma Make Prompt（統合版）

**Prompt:**

Create a polished product mockup and UI flow for a hackathon MVP called **“Career Compass Trial”**, a career exploration app for students and a dashboard for companies.

### Product concept

This is not a traditional job search app.
It helps students discover suitable careers through:

1. **A/B preference choices**
2. **short job trial missions**
3. **reflection and updated career insights**
4. **career passport accumulation**
5. **connection to companies**

The key concept is:
**“From diagnosing careers to experimenting with careers.”**

---

### Design goals

* Friendly, modern, bright, trustworthy
* Student side should feel mobile-first and easy to start
* Company side should feel like a clean dashboard
* Use mock data
* Optimize onboarding to reduce drop-off
* Keep the experience intuitive and visually clear
* Use cards, progress bars, simple charts, and clear CTAs

---

### Style

* Clean startup product UI
* White background with blue/purple primary color
* Accent colors like mint and orange
* Rounded cards, soft shadows, friendly illustrations
* Modern sans-serif typography
* Clear section spacing and hierarchy

---

### Deliverables

Design the following screens.

---

## Student Side Screens (mobile app style)

### 1. Splash screen

* App logo
* Product name: Career Compass Trial
* Tagline: “診断する就活から、実験する就活へ。”
* Buttons: “はじめる” and “企業の方はこちら”

### 2. Onboarding screen 1

Title: “仕事を選ぶ前に、少し試してみよう”
Description: Students can try short job experiences before choosing companies.

### 3. Onboarding screen 2

Title: “A/B選択で、自分の価値観が見えてくる”
Description: Simple A/B choices reveal what students value.

### 4. Onboarding screen 3

Title: “体験結果が、あなたのキャリアの地図になる”
Description: Completed trials build a Career Passport.

### 5. Role selection

* Student
* Company

### 6. Student sign-up / login

* Email
* Password
* Continue with Google
* Guest option

### 7. Basic profile setup

* Name
* School year
* Faculty
* Interests
* Progress bar

### 8. A/B intro screen

Title: “まずは5問だけ”
Subtitle: “あなたが何を大切にしたいか、選択から見つけます”
Show estimated time: 1 minute.

### 9. A/B question screen

Show a question like:
“どちらの働き方が今の自分に近いですか？”
Two option cards:
A: higher salary, more autonomy, solo work
B: more teamwork, more learning support, balanced work style
Include progress bar and back button.

### 10. Preference result screen

Show 6 value categories:

* お金・安定
* 働きやすさ
* 人・雰囲気
* 成長
* 自由度
* やりがい

Use a radar chart or bar chart.
Show summary text:
“あなたは今のところ『人・雰囲気』『成長』を重視する傾向があります。”
CTA: “おすすめの仕事を試す”

### 11. Student home

Sections:

* 今日のおすすめ
* 次に試すMission
* あなたの価値観
* 最近の体験
* Career Passport
  Bottom navigation:
  Home / Explore / Passport / Companies / Profile

### 12. Explore missions

Mission cards with:

* Title
* Company name
* Category
* Duration
* Difficulty
* Tags
* Recommended reason
* CTA: “試す”

Use mock missions like:

* 新商品のSNS企画を考える
* 売上データから課題を見つける
* 学生向けイベントの集客施策を考える

### 13. Mission detail

Show:

* Mission overview
* Company info
* What you will do
* Recommended for
* Duration
* Skills gained
  CTA: “このMissionを試す”

### 14. Mission trial screen

Show:

* Problem statement
* Reference cards
* Text input for answer
* Save and submit buttons

### 15. Reflection screen

Ask:

* Was it enjoyable?
* Do you want to do more like this?
* Did it fit you?
* Was it difficult?
* Did you prefer solo or team style?
  Use rating chips and a short comment box.

### 16. Updated result screen

Show:

* “体験を反映して、あなたのキャリア地図を更新しました”
* Updated value chart
* Previous vs current comparison
* Next recommended mission

### 17. Career Passport

Show:

* Completed mission count
* Skill trend
* Satisfaction trend
* Experience cards
* Small badges or stats

### 18. Company match / reveal

Show:

* Companies behind the missions the student enjoyed
* Why they may be a fit
* CTA: “企業を見る”, “興味ありを送る”

### 19. Student profile

* Personal info
* Value summary
* Passport summary
* Settings

---

## Company Side Screens (desktop dashboard style)

### 20. Company login

* Email
* Password
* Demo login

### 21. Company onboarding

* Company name
* Industry
* Location
* Description
* Hiring roles
* Logo upload

### 22. Company dashboard

Show KPI cards:

* Active missions
* Trial starts
* Completion count
* Interested students
* Scout candidates

Also show:

* Popular missions
* Recent students
* Quick analytics

### 23. Mission list

A table or card list with:

* Mission title
* Status
* Participants
* Completion rate
* Interest rate
* Edit action

### 24. Create mission

Fields:

* Mission name
* Category
* Duration
* Difficulty
* Individual or team
* Mission prompt
* Submission type
* Recommended student type
  Buttons:
* Save draft
* Publish

### 25. Mission analytics

Show charts for:

* Views
* Starts
* Completion
* Average satisfaction
* Value-type response segments
* Year segment distribution

### 26. Student list

Table with:

* Name
* School year
* Missions completed
* Interest level
* Fit tags
* Status

### 27. Student detail

Show:

* Student profile
* Value summary
* Completed missions
* Reflection excerpts
* Fit tags
* CTA: “スカウト候補に追加”

### 28. Company profile/settings

Basic company settings and mock billing area.

---

### Mock data to reflect in the UI

Student example:

* Name: 佐藤 美咲
* School year: 大学3年
* Faculty: 経済学部
* Interests: 商品企画, マーケティング, 人事
* Top values: 人・雰囲気, 成長, 働きやすさ

Mission examples:

1. 新商品のSNS企画を考える / 株式会社Lumo / 20分 / 初級
2. 売上データから課題を見つける / DataNest株式会社 / 25分 / 中級
3. 学生向けイベントの集客施策を考える / Bridge Works / 15分 / 初級

Company examples:

* 株式会社Lumo / 消費財 / 東京
* DataNest株式会社 / IT・データ / 大阪

---

### Important UX notes

* Make onboarding smooth and short
* Student flow should feel low-friction
* Highlight progress and achievements
* Make “next action” obvious on every screen
* Make company side more data-oriented
* Make the app feel real, but clearly based on mock data for a hackathon MVP

---

# 12. さらに実務向けに短くした「超短縮版プロンプト」

もしFigma Makeに短く入れたいならこれです。

---

## 超短縮版 Figma Make Prompt

**Career Compass Trial** というハッカソン向けMVPのUIを作ってください。
学生向けモバイルUIと企業向けWebダッシュボードUIの両方をデザインしてください。
コンセプトは「診断する就活から、実験する就活へ」。

学生は、

* A/B選択で価値観の仮説を作る
* 短い仕事体験Missionを試す
* 振り返りで価値観を更新する
* Career Passportに経験を蓄積する
* 気になる企業とつながる

企業は、

* Missionを作る
* 学生の体験数や反応を見る
* 興味度の高い学生を見る
* Mission分析を行う

必要な画面:

* Splash
* Onboarding 3枚
* Role selection
* Student login
* Student profile setup
* A/B intro
* A/B question
* Preference result
* Student home
* Mission explore
* Mission detail
* Mission trial
* Reflection
* Updated result
* Career Passport
* Company reveal
* Company login
* Company onboarding
* Company dashboard
* Mission list
* Create mission
* Mission analytics
* Student list
* Student detail

デザインは、白ベースでブルー/パープルを主色にしたモダンで親しみやすいUI。
カード型、進捗バー、簡単なチャート、丸みのあるコンポーネントを使用してください。
モックデータを使ってリアルな見た目にしてください。

---

必要なら次に、

1. **このままFigma Makeに入れやすいように英語だけの完全版**
2. **エンジニア向けに画面遷移図つきの仕様書**
3. **実装優先順位つきの開発チケット形式**
   に変換できます。

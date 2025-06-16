# 電子図面表示システム  
- [KMD00xJW] 50-picture-search  

## 概要  
- 品番入力された画像ファイルを表示  

## 開発環境  
- Node.js v18.12.1  
- nvm-windows 1.1.10  

## npmパッケージ  
- ejs@3.1.10  
- express@4.19.2  
- image-size@^2.0.2  
- log4js@^6.9.1  
- serve-favicon@2.5.0  
- winser@1.0.3

## サービス開始手順  
- npm run install-service
- npm run uninstall-service

## メンバー  
- y.watanabe  

## プロジェクト構成  
~~~
./
│  .gitignore                                  # ソース管理除外対象
│  config.js                                   # webアプリケーション設定ファイル (git管理外)
│  package.json                                # パッケージ管理ファイル
│  README.md                                   # このファイル
│  server.js                                   # メインとなるサーバー起動ファイル
│  
├─ public                                     # ☆クライアントに公開するモジュール群
│  ├─ css
│  │      style-basic.css                     # 共通で使用するスタイルシート
│  │      style-index.css                     # メインのスタイルシート
│  │
│  ├─ imsges                                 # クライアントに提供するファイル群
│  │
│  └─ manuals                                # クライアントに提供する電子図面群
│  
├─ tools                                      
│  └─ TIFF2JPEG                              # tiffファイルをjpegファイルに変換するツール
│          Program.cs                          # ソースファイル
│  
└─ views                                      # ☆EJSテンプレートエンジン群
            _footer.ejs                         # フッター
            _header.ejs                         # ヘッダー
            _myfunctions.ejs                    # 関数
            index.ejs                           # 本体
        
~~~

## アセンブリ情報  

- 著作権： © 2025 koken-kogyo CO,LTD.

// Expressインスタンスを生成
const express = require("express");
const app = express();

const favicon = require("serve-favicon");
const path = require("path");
const fs = require("fs");

// image-size: 画像の幅や高さを取得するのに特化した軽量ライブラリ
const { imageSizeFromFile } = require("image-size/fromFile");

const https = require("https");
const options = {
  key:  fs.readFileSync("./servercert/server.key"),
  cert: fs.readFileSync("./servercert/server.crt")
};
const server = https.createServer(options,app);

// User定義
const { PORT, log4jsConfig } = require("./config.js");

// log4jsロガー設定
const log4js = require("log4js");
log4js.configure(log4jsConfig);

// テンプレートエンジンの設定
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/static", express.static("./public"));
app.use(favicon(`${__dirname}/public/images/favicon.ico`));

// Top Page
app.get('/', (req, res) => {
    res.render("index.ejs", {req, title: "図面検索"});
});

// ファイル検索 API
app.get("/search/:hmcd", async function (req, res) {
    const hmcd = req.params.hmcd;
    try {
        // 画像フォルダから入力品番のファイル名一覧を取得
        const files = fs.readdirSync(`./public/manuals`);
        const targets = files.filter(fn => fn.indexOf(hmcd)!==-1);
        // 結果判定
        if ( targets.length == 0 ) {
            const logger = log4js.getLogger("warn");
            logger.warn(`/search/${hmcd} - なし`);
            res.status(299).end(); // 検索結果なし
        } else {
            //　検索結果をログに記録
            const logger = log4js.getLogger("info");
            let msg = "/search/" + hmcd;
            msg += (targets.length > 1) ? ` - ${targets.length}件` : "";
            logger.info(msg);
            // 検索結果ファイルの画像サイズを取得
            const results = [];
            for (const value of targets) {
                const dimensions = await imageSizeFromFile(`./public/manuals/${value}`);
                results.push({
                    "fileName": value,
                    "width": dimensions.width,
                    "height": dimensions.height
                });
            }
            // 検索結果を返却
            res.status(200).end(JSON.stringify(results));
        }
    } catch (err) {
        const logger = log4js.getLogger("e");
        logger.error("ファイルの検索で異常が発生しました:" + `${err}`);
        res.status(500).send(`ファイルの検索で異常が発生しました．:${err}`);
    }
});

// サーバーを起動
server.listen(PORT, () => {console.log(`Koken Manuals Search listen on Port:${PORT}`)});
